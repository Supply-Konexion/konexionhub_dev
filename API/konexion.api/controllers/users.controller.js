// controllers/user.controller.js

const bcrypt = require("bcryptjs");
const saltRounds = 10; // Define el número de rondas de hashing

const User = require("../db/models/users.model");

exports.findAll = async (req, res) => {
  try {
    // Buscar todos los usuarios según las condiciones definidas
    const users = await User.findAll();

    // Devolver el listado de usuarios como respuesta
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error al buscar usuarios:", error); // Registrar el error en la consola
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      id,
      firstName,
      lastName,
      email,
      city,
      country,
      password,
      documentNumber,
      phone,
    } = req.backendUsers;

    // Validar los campos necesarios
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    // Construir el objeto del nuevo usuario
    const newUser = {
      name: firstName,
      email,
      password,
      username: firstName,
      surname: lastName,
      documentNumber,
      city,
      country,
      phone,
      backendUserId: id,
    };

    // Crear el usuario
    const user = await User.create(newUser);

    req.user = user;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el usuario", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const userId = req.params.id; // Obtener el ID del usuario de los parámetros de la solicitud
    const userData = req.body; // Obtener los datos actualizados del usuario de los datos de la solicitud

    // Agregar la fecha y hora actuales a los datos actualizados
    userData.updatedAt = new Date();

    if (req.body.password && typeof req.body.password === "string") {
      // Generar el hash de la contraseña
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      userData.password = hashedPassword;
    }

    // Actualizar el usuario con el ID dado y los nuevos datos
    const [updatedRowsCount, updatedUsers] = await User.update(userData, {
      where: { id: userId },
      returning: true, // Devuelve los registros actualizados
    });

    // Verificar si se encontró y actualizó el usuario
    if (updatedRowsCount === 0) {
      // Si no se encontró el usuario, enviar un mensaje de error
      return res.status(404).json({ message: "El usuario no se encontró" });
    }

    // Si se actualizó correctamente, devolver los detalles del usuario actualizado
    res.status(200).json({
      message: "Usuario actualizado exitosamente",
      user: updatedUsers[0],
    });
  } catch (error) {
    // console.log(error.message);
    // Si se produce algún error durante la actualización, devolver un mensaje de error con los detalles
    res.status(500).json({
      message: "Error al actualizar el usuario",
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const userId = req.params.id; // Obtener el ID del usuario de los parámetros de la solicitud

    // Intentar eliminar el usuario por su ID
    const deletedRowCount = await User.destroy({
      where: { id: userId },
    });

    // Verificar si se encontró y eliminó el usuario
    if (deletedRowCount === 0) {
      // Si no se encontró el usuario, enviar un mensaje de error
      return res.status(404).json({ message: "El usuario no se encontró" });
    }

    // Si se eliminó correctamente, devolver un mensaje de éxito
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    // Si se produce algún error durante la eliminación, devolver un mensaje de error con los detalles
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: error.message });
  }
};
