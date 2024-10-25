const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const BackendUserRoles = sequelize.define(
  "backend_user_roles",
  {
    id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(191),
    },
    code: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    permissions: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    isSystem: {
      allowNull: false,
      type: DataTypes.TINYINT,
      field: "is_system",
      defaultValue: 0,
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
    tableName: "backend_user_roles", // Especifica el alias de la tabla
    timestamps: false, // Desactiva las columnas de control de tiempo
  }
);

module.exports = BackendUserRoles;
