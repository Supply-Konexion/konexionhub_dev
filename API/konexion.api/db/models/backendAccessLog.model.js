const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const BackendAccessLog = sequelize.define(
  "backend_access_log",
  {
    id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      // ID BACKEND_USERS
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "user_id",
    },
    ipAddress: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "ip_address",
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "created_at",
      defaultValue: sequelize.fn("now"),
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "updated_at",
      defaultValue: sequelize.fn("now"),
    },
  },
  {
    tableName: "backend_access_log", // Especifica el alias de la tabla
    timestamps: false, // Desactiva las columnas de control de tiempo
  }
);

module.exports = BackendAccessLog;
