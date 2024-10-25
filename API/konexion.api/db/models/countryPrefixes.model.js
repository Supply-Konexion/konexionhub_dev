const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const CountryPrefixes = sequelize.define(
  "country_prefixes",
  {
    id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    code: {
      allowNull: false,
      type: DataTypes.STRING(3),
    },
    countrie: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    prefix: {
      allowNull: false,
      type: DataTypes.STRING(5),
    },
  },
  {
    tableName: "country_prefixes", // Especifica el alias de la tabla
    timestamps: false, // Desactiva las columnas de control de tiempo
  }
);

module.exports = CountryPrefixes;
