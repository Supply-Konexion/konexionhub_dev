// routes/backendUserRoles.routes.js

const express = require("express");
const router = express.Router();
const BackendUserRolesController = require("../controllers/backendUserRoles.controller");
const validarToken = require("../utils/authMiddleware");

// Rutas CRUD
router.get("/list", BackendUserRolesController.findAll);
router.post("/", validarToken, BackendUserRolesController.create);
router.put("/:id", validarToken, BackendUserRolesController.update);
router.delete("/:id", validarToken, BackendUserRolesController.delete);
router.get(
    "/profile/:id",
    validarToken,
    BackendUserRolesController.findByProfile
  );

module.exports = router;
