// routes/currency.routes.js

const express = require("express");
const router = express.Router();
const CurrencyController = require("../controllers/currency.controller");
const validarToken = require("../utils/authMiddleware");

// Rutas CRUD
router.get("/list", CurrencyController.findAll);
router.post("/", validarToken, CurrencyController.create);
router.put("/:id", validarToken, CurrencyController.update);
router.delete("/:id", validarToken, CurrencyController.delete);

module.exports = router;
