// config.js

const Sequelize = require("sequelize");
const { config } = require("../config/config");

const sequelize = new Sequelize(config.DBNAME, config.DBUSER, config.DBPASS, {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Esto desactivará los mensajes de log de Sequelize
});

// Autenticación a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la BD establecida correctamente.");
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });

module.exports = sequelize;
