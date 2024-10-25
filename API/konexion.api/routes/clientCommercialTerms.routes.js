// routes/clientCommercialTerms.routes.js

const express = require("express");
const router = express.Router();
const ClientCommercialTermsController = require("../controllers/clientCommercialTerms.controller");
const validarToken = require("../utils/authMiddleware");

// Rutas CRUD
router.get("/list", ClientCommercialTermsController.findAll);
router.post("/", validarToken, ClientCommercialTermsController.create);
router.put("/:id", validarToken, ClientCommercialTermsController.update);
router.delete("/:id", validarToken, ClientCommercialTermsController.delete);

module.exports = router;
