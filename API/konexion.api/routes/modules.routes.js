// routes/modules.routes.js

const express = require("express");
const router = express.Router();
const ModulesController = require("../controllers/modules.controller");
const validarToken = require("../utils/authMiddleware");

// Rutas CRUD
router.get("/list", validarToken, ModulesController.findAll);
router.post("/", validarToken, ModulesController.create);
router.put("/:id", validarToken, ModulesController.update);
router.delete("/:id", validarToken, ModulesController.delete);
// Define las demás rutas CRUD aquí

module.exports = router;
