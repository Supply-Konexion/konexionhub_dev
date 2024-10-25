// controllers/modules.controller.js

const { Op } = require("sequelize");
const Modules = require("../db/models/modules.model");
const Resources = require("../db/models/resources.model");

exports.findAll = async (req, res) => {
  try {
    const modules = await Modules.findAll({
      include: [
        {
          model: Resources,
          as: "resources", // Asigna un alias al modelo
          where: {
            status: {
              [Op.ne]: 0,
            },
          },
          required: false, // Usa left join para incluir módulos sin recursos
        },
      ],
    });
    res.status(200).json(modules); // Devuelve el listado
  } catch (error) {
    res.status(500).json({ message: error.message }); // Maneja el error si ocurre
  }
};

exports.create = async (req, res) => {
  try {
    const modules = await Modules.create(req.body);

    res
      .status(201)
      .json({ message: "Módulo creado exitosamente", modules: modules });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el módulo", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id; // Obtener el ID
    const data = req.body; // Obtener los datos actualizados

    // Actualizar con el ID dado y los nuevos datos
    const [updatedRowsCount, updatedData] = await Modules.update(data, {
      where: { id: id },
      returning: true, // Devuelve los registros actualizados
    });

    // Verificar si se encontró y actualizó
    if (updatedRowsCount === 0) {
      // Si no se encontró
      return res.status(404).json({ message: "El módulo no se encontró" });
    }

    // Si se actualizó correctamente, devolver los detalles actualizado
    res.status(200).json({
      message: "Módulo actualizado exitosamente",
      modules: updatedData[0],
    });
  } catch (error) {
    // Si se produce algún error durante la actualización, devolver un mensaje de error con los detalles
    res.status(500).json({
      message: "Error al actualizar el módulo",
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id; // Obtener el ID

    // Intentar eliminar por su ID
    const deletedRowCount = await Modules.destroy({
      where: { id: id },
    });

    // Verificar si se encontró y eliminó
    if (deletedRowCount === 0) {
      // Si no se encontró, enviar un mensaje de error
      return res.status(404).json({ message: "EL módulo no se encontró" });
    }

    // Si se eliminó correctamente, devolver un mensaje de éxito
    res.status(200).json({ message: "Módulo eliminado exitosamente" });
  } catch (error) {
    // Si se produce algún error durante la eliminación, devolver un mensaje de error con los detalles
    res
      .status(500)
      .json({ message: "Error al eliminar el módulo", error: error.message });
  }
};