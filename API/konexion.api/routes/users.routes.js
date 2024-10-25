// routes/users.routes.js

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");
const validarToken = require("../utils/authMiddleware");

// Rutas CRUD
router.get("/list", UserController.findAll);
router.post("/", validarToken, UserController.create);
router.put("/:id", validarToken, UserController.update);
router.delete("/:id", validarToken, UserController.delete);

module.exports = router;
