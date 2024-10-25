const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Currency = sequelize.define(
  "currency",
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
      type: DataTypes.STRING(10),
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "created_at",
      defaultValue: sequelize.fn("now"),
    },
  },
  {
    tableName: "currency", // Especifica el alias de la tabla
    timestamps: false, // Desactiva las columnas de control de tiempo
  }
);

module.exports = Currency;
