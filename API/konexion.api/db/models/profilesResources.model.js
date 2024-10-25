const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const ProfilesResources = sequelize.define(
  "profiles_resources",
  {
    id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    profileId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "profile_id",
    },
    resourceId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "resource_id",
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
    tableName: "profiles_resources", // Especifica el alias de la tabla
    timestamps: false, // Desactiva las columnas de control de tiempo
  }
);

module.exports = ProfilesResources;

// MODEL

const BACKENDUSERROLES_TABLE = require("./backendUserRoles.model");
const RESOURCES_TABLE = require("./resources.model");

ProfilesResources.belongsTo(BACKENDUSERROLES_TABLE, {
  foreignKey: "profileId",
  as: "profile",
});
ProfilesResources.belongsTo(RESOURCES_TABLE, {
  foreignKey: "resourceId",
  as: "resource",
});
