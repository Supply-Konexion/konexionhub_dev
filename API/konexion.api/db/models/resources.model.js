const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Resources = sequelize.define(
  "resources",
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
    path: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    iconName: {
      allowNull: true,
      type: DataTypes.STRING(25),
      field: "icon_name",
    },
    nOrder: {
      allowNull: false,
      type: DataTypes.TINYINT,
      field: "n_order",
      defaultValue: 0,
    },
    moduleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "module_id",
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
    tableName: "resources", // Especifica el alias de la tabla
    timestamps: false, // Desactiva las columnas de control de tiempo
  }
);

module.exports = Resources;

// MODEL
const  MODULES_TABLE  = require("./modules.model");

Resources.belongsTo(MODULES_TABLE, { as: 'modules', foreignKey: 'moduleId' });
