// routes/phase.routes.js

const express = require("express");
const router = express.Router();
const PhaseController = require("../controllers/phase.controller");
const validarToken = require("../utils/authMiddleware");

// Rutas CRUD
router.get("/list", PhaseController.findAll);
router.post("/", validarToken, PhaseController.create);
router.put("/:id", validarToken, PhaseController.update);
router.delete("/:id", validarToken, PhaseController.delete);

module.exports = router;
