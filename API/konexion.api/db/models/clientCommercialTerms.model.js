const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const ClientCommercialTerms = sequelize.define(
  "client_commercial_terms",
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
      type: DataTypes.STRING(50),
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING(100),
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "created_at",
      defaultValue: sequelize.fn("now"),
    },
  },
  {
    tableName: "client_commercial_terms", // Especifica el alias de la tabla
    timestamps: false, // Desactiva las columnas de control de tiempo
  }
);

module.exports = ClientCommercialTerms;
