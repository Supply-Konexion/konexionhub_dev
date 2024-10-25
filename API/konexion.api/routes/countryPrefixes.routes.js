// routes/countryPrefixes.routes.js

const express = require("express");
const router = express.Router();
const CountryPrefixes = require("../controllers/countryPrefixes.controller");
const validarToken = require("../utils/authMiddleware");

// Rutas CRUD
router.get("/list", CountryPrefixes.findAll);
router.post("/", validarToken, CountryPrefixes.create);
router.put("/:id", validarToken, CountryPrefixes.update);
router.delete("/:id", validarToken, CountryPrefixes.delete);
// Define las demás rutas CRUD aquí

module.exports = router;
