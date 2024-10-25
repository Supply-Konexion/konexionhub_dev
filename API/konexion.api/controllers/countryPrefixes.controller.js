// controllers/countryPrefixes.controller.js

const CountryPrefixes = require("../db/models/countryPrefixes.model");

exports.findAll = async (req, res) => {
  try {
    const countryPrefixes = await CountryPrefixes.findAll(); // Consulta todos

    res.status(200).json(countryPrefixes); // Devuelve el listado como respuesta
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message }); // Maneja el error si ocurre
  }
};

exports.create = async (req, res) => {
  try {
    const countryPrefixes = await CountryPrefixes.create(req.body);

    res.status(201).json({
      message: "Creado exitosamente",
      countryPrefixes: countryPrefixes,
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
    const [updatedRowsCount, updatedData] = await CountryPrefixes.update(data, {
      where: { id: id },
      returning: true, // Devuelve los registros actualizados
    });

    // Verificar si se encontró y actualizó
    if (updatedRowsCount === 0) {
      // Si no se encontró
      return res.status(404).json({ message: "No se encontró" });
    }

    // Si se actualizó correctamente, devolver los detalles actualizado
    res.status(200).json({
      message: "Actualizado exitosamente",
      countryPrefixes: updatedData[0],
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
    const deletedRowCount = await CountryPrefixes.destroy({
      where: { id: id },
    });

    // Verificar si se encontró y eliminó
    if (deletedRowCount === 0) {
      // Si no se encontró, enviar un mensaje de error
      return res.status(404).json({ message: "No se encontró" });
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
