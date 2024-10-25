// controllers/profilesResources.controller.js

const ProfilesResources = require("../db/models/profilesResources.model");
const BackendUserRoles = require("../db/models/backendUserRoles.model");
const Resources = require("../db/models/resources.model");
const Modules = require("../db/models/modules.model");
const BackendUsers = require("../db/models/backendUsers.model");

exports.findAll = async (req, res) => {
  try {
    const profilesResources = await ProfilesResources.findAll(); // Consulta todos
    res.status(200).json(profilesResources); // Devuelve el listado como respuesta
  } catch (error) {
    res.status(500).json({ message: error.message }); // Maneja el error si ocurre
  }
};

exports.create = async (req, res) => {
  try {
    const profilesResources = await ProfilesResources.create(req.body);

    res.status(201).json({
      message: "Perfil creado exitosamente",
      profilesResources: profilesResources,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el perfil", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id; // Obtener el ID
    const data = req.body; // Obtener los datos actualizados

    // Actualizar con el ID dado y los nuevos datos
    const [updatedRowsCount, updatedData] = await ProfilesResources.update(
      data,
      {
        where: { id: id },
        returning: true, // Devuelve los registros actualizados
      }
    );

    // Verificar si se encontró y actualizó
    if (updatedRowsCount === 0) {
      // Si no se encontró
      return res.status(404).json({ message: "El perfil no se encontró" });
    }

    // Si se actualizó correctamente, devolver los detalles actualizado
    res.status(200).json({
      message: "Perfil actualizado exitosamente",
      profilesResources: updatedData[0],
    });
  } catch (error) {
    // Si se produce algún error durante la actualización, devolver un mensaje de error con los detalles
    res.status(500).json({
      message: "Error al actualizar el perfil",
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id; // Obtener el ID

    // Intentar eliminar por su ID
    const deletedRowCount = await ProfilesResources.destroy({
      where: { id: id },
    });

    // Verificar si se encontró y eliminó
    if (deletedRowCount === 0) {
      // Si no se encontró, enviar un mensaje de error
      return res.status(404).json({ message: "EL perfil no se encontró" });
    }

    // Si se eliminó correctamente, devolver un mensaje de éxito
    res.status(200).json({ message: "Perfil eliminado exitosamente" });
  } catch (error) {
    // Si se produce algún error durante la eliminación, devolver un mensaje de error con los detalles
    res
      .status(500)
      .json({ message: "Error al eliminar el perfil", error: error.message });
  }
};

exports.findByProfile = async (req, res) => {
  try {
    const { userId } = req; // Extraer el userId de la solicitud

    // Buscar el usuario en la base de datos
    const user = await BackendUsers.findOne({ where: { id: userId } });

    // Verificar si el usuario existe
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const { roleId } = user;

    const { count, rows } = await ProfilesResources.findAndCountAll({
      include: [
        {
          model: BackendUserRoles,
          as: "profile", // Aquí especifica el alias
        },
        {
          model: Resources,
          as: "resource", // Aquí especifica el alias
          include: [
            {
              model: Modules,
              as: "modules",
            },
          ],
        },
      ],
      where: { profileId: roleId, status: 1 },
    });

    // Verificar si se encontró y actualizó
    if (count === 0) {
      // Si no se encontró
      return res.status(404).json({ message: "El perfil no se encontró" });
    }

    // Si se encontro resultados
    res.status(200).json({
      message: "Datos encontrados exitosamente",
      rows: rows,
      count: count,
    });
  } catch (error) {
    console.log(error.message);
    // Si se produce algún error
    res.status(500).json({
      message: "Error de busqueda",
      error: error.message,
    });
  }
};
