// controllers/talamoChinaconexionProviders.controller.js
const { Op } = require("sequelize");

const TalamoChinaconexionProviders = require("../db/models/talamoChinaconexionProviders.model");

exports.findAll = async (req, res) => {
  try {
    const talamoChinaconexionProviders =
      await TalamoChinaconexionProviders.findAll(); // Consulta todos
    res.status(200).json(talamoChinaconexionProviders); // Devuelve el listado como respuesta
  } catch (error) {
    res.status(500).json({ message: error.message }); // Maneja el error si ocurre
  }
};

exports.create = async (req, res) => {
  try {
    const talamoChinaconexionProviders =
      await TalamoChinaconexionProviders.create(req.body);

    res.status(201).json({
      message: "Creado exitosamente",
      talamoChinaconexionProviders: talamoChinaconexionProviders,
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
    const [updatedRowsCount, updatedData] =
      await TalamoChinaconexionProviders.update(data, {
        where: { id: id },
        returning: true, // Devuelve los registros actualizados
      });

    // Verificar si se encontró y actualizó
    if (updatedRowsCount === 0) {
      // Si no se encontró
      return res.status(404).json({ message: "El registro no se encontró" });
    }

    // Si se actualizó correctamente, devolver los detalles actualizado
    res.status(200).json({
      message: "Actualizado exitosamente",
      talamoChinaconexionProviders: updatedData[0],
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
    const deletedRowCount = await TalamoChinaconexionProviders.destroy({
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

exports.searchProductoText = async (req, res) => {
  try {
    // Extraer el texto de búsqueda del cuerpo de la solicitud
    const { search } = req.body;

    // Realizar la búsqueda en la base de datos
    const resultados = await TalamoChinaconexionProviders.findAll({
      where: {
        mainProducts: {
          [Op.like]: `%${search}%`, // Búsqueda parcial
        },
      },
    });

    // Comprobar si se encontraron resultados
    const total = resultados.length;
    if (resultados.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos." });
    }

    // Enviar los resultados encontrados
    res.status(200).json({
      message: "Resultados encontrados",
      total: total, // Total de resultados
      resultados,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error en la búsqueda", error: error.message });
  }
};
