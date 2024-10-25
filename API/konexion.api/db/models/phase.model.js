const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Phase = sequelize.define(
  "phase",
  {
    id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    idName: {
      allowNull: false,
      type: DataTypes.STRING(50),
      field: "id_name",
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "created_at",
      defaultValue: sequelize.fn("now"),
    },
  },
  {
    tableName: "phase", // Especifica el alias de la tabla
    timestamps: false, // Desactiva las columnas de control de tiempo
  }
);

module.exports = Phase;
