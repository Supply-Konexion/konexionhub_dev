// controllers/backendUserRoles.controller.js

const BackendUserRoles = require("../db/models/backendUserRoles.model");

exports.findAll = async (req, res) => {
  try {
    const backendUserRoles = await BackendUserRoles.findAll(); // Consulta todos
    res.status(200).json(backendUserRoles); // Devuelve el listado como respuesta
  } catch (error) {
    res.status(500).json({ message: error.message }); // Maneja el error si ocurre
  }
};

exports.create = async (req, res) => {
  try {
    const backendUserRoles = await BackendUserRoles.create(req.body);

    res.status(201).json({
      message: "Creado exitosamente",
      backendUserRoles: backendUserRoles,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al crear", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id; // Obtener el ID
    const data = req.body; // Obtener los datos actualizados

    // Actualizar con el ID dado y los nuevos datos
    const [updatedRowsCount, updatedData] = await BackendUserRoles.update(
      data,
      {
        where: { id: id },
        returning: true, // Devuelve los registros actualizados
      }
    );

    // Verificar si se encontró y actualizó
    if (updatedRowsCount === 0) {
      // Si no se encontró
      return res.status(404).json({ message: "El registro no se encontró" });
    }

    // Si se actualizó correctamente, devolver los detalles actualizado
    res.status(200).json({
      message: "Actualizado exitosamente",
      backendUserRoles: updatedData[0],
    });
  } catch (error) {
    // Si se produce algún error durante la actualización, devolver un mensaje de error con los detalles
    res.status(500).json({
      message: "Error al actualizar",
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id; // Obtener el ID

    // Intentar eliminar por su ID
    const deletedRowCount = await BackendUserRoles.destroy({
      where: { id: id },
    });

    // Verificar si se encontró y eliminó
    if (deletedRowCount === 0) {
      // Si no se encontró, enviar un mensaje de error
      return res.status(404).json({ message: "EL registro no se encontró" });
    }

    // Si se eliminó correctamente, devolver un mensaje de éxito
    res.status(200).json({ message: "Eliminado exitosamente" });
  } catch (error) {
    // Si se produce algún error durante la eliminación, devolver un mensaje de error con los detalles
    res
      .status(500)
      .json({ message: "Error al eliminar", error: error.message });
  }
};

exports.findByProfile = async (req, res) => {
  try {
    const id = req.params.id; // Obtener el ID

    const { count, rows } = await BackendUserRoles.findAndCountAll({
      where: { id: id },
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
    // Si se produce algún error
    res.status(500).json({
      message: "Error de busqueda",
      error: error.message,
    });
  }
};
