// routes/talamoChinaconexionProviders.routes.js

const express = require("express");
const router = express.Router();
const TalamoChinaconexionProvidersController = require("../controllers/talamoChinaconexionProviders.controller");
const validarToken = require("../utils/authMiddleware");

// Rutas CRUD
router.get("/list", TalamoChinaconexionProvidersController.findAll);
router.post("/", validarToken, TalamoChinaconexionProvidersController.create);
router.post(
  "/search/product",
 // validarToken,
  TalamoChinaconexionProvidersController.searchProductoText
);
router.put("/:id", validarToken, TalamoChinaconexionProvidersController.update);
router.delete(
  "/:id",
  validarToken,
  TalamoChinaconexionProvidersController.delete
);

module.exports = router;
