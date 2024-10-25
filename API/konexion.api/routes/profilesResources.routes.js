// routes/profilesResources.routes.js

const express = require("express");
const router = express.Router();
const ProfilesResourcesController = require("../controllers/profilesResources.controller");
const validarToken = require("../utils/authMiddleware");

// Rutas CRUD
router.get("/list", validarToken, ProfilesResourcesController.findAll);
router.post("/", validarToken, ProfilesResourcesController.create);
router.put("/:id", validarToken, ProfilesResourcesController.update);
router.delete("/:id", validarToken, ProfilesResourcesController.delete);
router.get(
  "/profile",
  validarToken,
  ProfilesResourcesController.findByProfile
);
// Define las demás rutas CRUD aquí

module.exports = router;
