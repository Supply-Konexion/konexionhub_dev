const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Modules = sequelize.define(
  "modules",
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
      type: DataTypes.STRING(45),
    },
    iconName: {
      allowNull: true,
      type: DataTypes.STRING(25),
      field: "icon_name",
    },
    cssName: {
      allowNull: true,
      type: DataTypes.STRING(25),
      field: "css_name",
    },
    nOrder: {
      allowNull: false,
      type: DataTypes.TINYINT,
      field: "n_order",
      defaultValue: 0,
    },
    status: {
      allowNull: false,
      type: DataTypes.TINYINT,
      defaultValue: 1,
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
    },
  },
  {
    tableName: "modules", // Especifica el alias de la tabla
    timestamps: false, // Desactiva las columnas de control de tiempo
  }
);

module.exports = Modules;

// MODEL
const  RESOURCES_TABLE  = require("./resources.model");

Modules.hasMany(RESOURCES_TABLE, { as: 'resources', foreignKey: 'moduleId' });
