// routes/currency.routes.js

const express = require("express");
const router = express.Router();
const TalamoChinaconexionServiceRequests = require("../controllers/talamoChinaconexionServiceRequests.controller");
const validarToken = require("../utils/authMiddleware");

// Rutas CRUD
router.get("/list", TalamoChinaconexionServiceRequests.findAll);
router.post("/", validarToken, TalamoChinaconexionServiceRequests.create);
router.put("/:id", validarToken, TalamoChinaconexionServiceRequests.update);
router.delete("/:id", validarToken, TalamoChinaconexionServiceRequests.delete);

module.exports = router;
