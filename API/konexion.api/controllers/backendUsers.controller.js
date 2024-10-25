// controllers/backendUsers.controller.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const saltRounds = 10; // Define el número de rondas de hashing
const { Sequelize } = require("sequelize");

const BackendUsers = require("../db/models/backendUsers.model");
const BackendAccessLog = require("../db/models/backendAccessLog.model");
const User = require("../db/models/users.model");

exports.findAll = async (req, res) => {
  try {
    const backendUsers = await BackendUsers.findAll();
    res.status(200).json(backendUsers); // Devuelve el listado como respuesta
  } catch (error) {
    res.status(500).json({ message: error.message }); // Maneja el error si ocurre
  }
};

exports.create = async (req, res, next) => {
  try {
    // Generar código de autenticación
    const randomString = randomstring.generate({
      length: 6,
      charset: "1234567890",
    });
    // Generar el hash de la contraseña
    const hashedPassword = await bcrypt.hash(randomString, saltRounds);

    // Agregar la contraseña hasheada al cuerpo de la solicitud
    req.body.password = hashedPassword;

    // Llamada a User.create() con el cuerpo de la solicitud actualizado
    const backendUsers = await BackendUsers.create(req.body);

    req.backendUsers = backendUsers;
    req.code = randomString;

    return next();
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el backEndUser.",
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const NOT_FOUND_MESSAGE = "El registro no se encontró.";
  const UPDATE_ERROR_MESSAGE = "Error al actualizar.";

  try {
    const id = req.params.id; // Obtener el ID
    const data = req.body; // Obtener los datos actualizados

    // Validar datos requeridos
    if (!data.email || !data.firstName || !data.lastName) {
      return res.status(400).json({ message: "Faltan datos requeridos." });
    }

    if (req.body.password && typeof req.body.password === "string") {
      // Generar el hash de la contraseña
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      data.password = hashedPassword;
    }

    // Agregar la fecha y hora actuales a los datos actualizados
    const currentTime = new Date();
    data.updatedAt = currentTime;

    // Actualizar BackendUsers
    const [updatedRowsCount, updatedData] = await BackendUsers.update(data, {
      where: { id },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: NOT_FOUND_MESSAGE });
    }

    // Actualizar User
    const dataUser = {
      name: data.firstName,
      username: data.firstName,
      surname: data.lastName,
      documentNumber: data.documentNumber,
      updatedAt: currentTime,
    };

    const [updatedRowsCountUser, updatedDataUser] = await User.update(
      dataUser,
      {
        where: { email: data.email },
        returning: true,
      }
    );

    if (updatedRowsCountUser === 0) {
      return res.status(404).json({ message: NOT_FOUND_MESSAGE });
    }

    // Respuesta exitosa
    res.status(200).json({
      message: "Registro actualizado exitosamente.",
      backendUsers: updatedData[0],
      user: updatedDataUser[0], // Incluir el usuario actualizado si es necesario
    });
  } catch (error) {
    res.status(500).json({
      message: UPDATE_ERROR_MESSAGE,
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id; // Obtener el ID

    // Intentar eliminar por su ID
    const deletedRowCount = await BackendUsers.destroy({
      where: { id: id },
    });

    // Verificar si se encontró y eliminó
    if (deletedRowCount === 0) {
      // Si no se encontró, enviar un mensaje de error
      return res.status(404).json({ message: "El registro no se encontró" });
    }

    // Si se eliminó correctamente, devolver un mensaje de éxito
    res.status(200).json({ message: "Registro eliminado exitosamente" });
  } catch (error) {
    // Si se produce algún error durante la eliminación, devolver un mensaje de error con los detalles
    res
      .status(500)
      .json({ message: "Error al eliminar", error: error.message });
  }
};

exports.auth = async (req, res) => {
  try {
    const { login, email, password } = req.body;

    if (email) {
      whereCondition = { email };
    } else {
      whereCondition = { login };
    }

    // Buscar el usuario por login o email
    const backendUser = await BackendUsers.findOne({
      include: [
        {
          model: BackendAccessLog,
          as: "logSystem", // Aquí especifica el alias
          limit: 1, // Limita los resultados a uno
          userId: Sequelize.literal(
            `(SELECT id FROM backend_users WHERE ${
              email ? `email = '${email}'` : `login = '${login}'`
            })`
          ),
          order: [["createdAt", "DESC"]], // Ordena por fecha de creación descendente para obtener el último registro
        },
      ],
      where: whereCondition,
    });

    // Verificar si el usuario existe
    if (!backendUser) {
      return res.status(404).json({ message: "Correo electrónico no existe!" });
    }

    // Verificar si la contraseña es correcta
    const isPasswordValid = await bcrypt.compare(
      password,
      backendUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "La contraseña es incorrecta" });
    }

    // Generar token de autenticación
    const token = jwt.sign({ userId: backendUser.id }, "secret_key", {
      expiresIn: "6h",
    });

    // Detectar la IP del cliente
    const ipAddress = req.headers["x-forwarded-for"] || req.ip;

    // Opcional: loguear el evento de inicio de sesión
    const userData = {
      userId: backendUser.id,
      ipAddress: ipAddress,
    };

    await BackendAccessLog.create(userData); // Descomentar para registrar el log

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      backendUser, // Cambiar a backendUser para consistencia
    });
  } catch (error) {
    console.error(error.message); // Registrar error en consola para depuración
    res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: error.message });
  }
};

exports.validateEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    let user = null; // Inicialización corregida

    if (email && typeof email === "string") {
      // Verifica si el correo electrónico es una cadena no vacía
      // Buscar el usuario por el correo electrónico
      user = await BackendUsers.findOne({ where: { email } });
    }

    // Verificar si el usuario existe
    if (!user) {
      return next();
    }

    res.status(409).json({ message: "Correo electrónico ya registrado." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al validar correo", error: error.message });
  }
};

exports.showData = async (req, res) => {
  res.status(200).json({
    message: "Registro exitosamente.",
    user: req.user,
    backendUser: req.backendUsers,
    code: req.code,
  });
};

exports.verificarToken = async (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res
      .status(401)
      .json({ mensaje: "Acceso denegado, token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, "secret_key");
    req.usuario = decoded; // Aquí tienes el ID del usuario

    const user = await BackendUsers.findOne({
      include: [
        {
          model: BackendAccessLog,
          as: "logSystem", // Aquí especifica el alias
          limit: 1, // Limita los resultados a uno
          userId: Sequelize.literal(
            `(SELECT id FROM backend_users WHERE id = '${req.usuario.userId}')`
          ),
          order: [["createdAt", "DESC"]], // Ordena por fecha de creación descendente para obtener el último registro
        },
      ],
      where: { id: req.usuario.userId },
    });

    res.status(200).json({
      backendUser: user,
    });
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido" });
  }
};
