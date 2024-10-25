// controllers/talamoChinaconexionProducts.controller.js

const TalamoChinaconexionProducts = require("../db/models/talamoChinaconexionProducts.model");

exports.findAll = async (req, res) => {
  try {
    const talamoChinaconexionProducts =
      await TalamoChinaconexionProducts.findAll(); // Consulta todos
    res.status(200).json(talamoChinaconexionProducts); // Devuelve el listado como respuesta
  } catch (error) {
    res.status(500).json({ message: error.message }); // Maneja el error si ocurre
  }
};

exports.findAllPage = async (req, res) => {
  const options = {
    // Puedes agregar atributos específicos o relaciones aquí
    // attributes: { exclude: ['password', 'recoveryToken', 'sessionToken'] },
    order: [["created_at", "DESC"]], // Ordenar por created_at en orden descendente
  };

  const { limit, page } = req.query;

  // Convertir a números y establecer valores predeterminados
  const limitNumber = parseInt(limit, 10) || 10; // 10 es el límite predeterminado
  const pageNumber = parseInt(page, 10) || 1; // 1 es la página predeterminada

  options.limit = limitNumber;
  options.offset = limitNumber * (pageNumber - 1);

  try {
    const result = await TalamoChinaconexionProducts.findAndCountAll(options);

    if (!result.count) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({
      total: result.count,
      page: pageNumber,
      limit: limitNumber,
      products: result.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Maneja el error si ocurre
  }
};

exports.create = async (req, res) => {
  try {
    const talamoChinaconexionProducts =
      await TalamoChinaconexionProducts.create(req.body);

    res.status(201).json({
      message: "Creado exitosamente",
      talamoChinaconexionProducts: talamoChinaconexionProducts,
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
      await TalamoChinaconexionProducts.update(data, {
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
      talamoChinaconexionProducts: updatedData[0],
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
    const deletedRowCount = await TalamoChinaconexionProducts.destroy({
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
