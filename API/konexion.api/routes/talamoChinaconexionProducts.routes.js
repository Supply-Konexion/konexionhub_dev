// routes/talamoChinaconexionProducts.routes.js

const express = require("express");
const router = express.Router();
const TalamoChinaconexionProductsController = require("../controllers/talamoChinaconexionProducts.controller");
const validarToken = require("../utils/authMiddleware");

// Rutas CRUD
router.get("/list", TalamoChinaconexionProductsController.findAll);
router.get("/list-page", TalamoChinaconexionProductsController.findAllPage);
router.post("/", validarToken, TalamoChinaconexionProductsController.create);
router.put("/:id", validarToken, TalamoChinaconexionProductsController.update);
router.delete(
  "/:id",
  validarToken,
  TalamoChinaconexionProductsController.delete
);

module.exports = router;
