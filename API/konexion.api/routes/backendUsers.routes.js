// routes/backendUsers.routes.js

const express = require("express");
const router = express.Router();
const BackendUsersController = require("../controllers/backendUsers.controller");
const UsersController = require("../controllers/users.controller");
const validarToken = require("../utils/authMiddleware");

// Rutas CRUD
router.get("/list", BackendUsersController.findAll);
router.post(
  "/",
  validarToken,
  BackendUsersController.validateEmail,
  BackendUsersController.create,
  UsersController.create,
  BackendUsersController.showData
);
router.put("/:id", validarToken, BackendUsersController.update);
router.delete("/:id", validarToken, BackendUsersController.delete);
router.post("/login", BackendUsersController.auth);
router.post("/validate-token", BackendUsersController.verificarToken);
// Define las demás rutas CRUD aquí

module.exports = router;
