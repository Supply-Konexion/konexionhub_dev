const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const BackendUsers = sequelize.define(
  "backend_users",
  {
    id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    firstName: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "first_name",
    },
    lastName: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "last_name",
    },
    login: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(191),
    },
    activationCode: {
      type: DataTypes.STRING(191),
      allowNull: true,
      field: "activation_code",
    },
    persistCode: {
      type: DataTypes.STRING(191),
      allowNull: true,
      field: "persist_code",
    },
    resetPasswordCode: {
      type: DataTypes.STRING(191),
      allowNull: true,
      field: "reset_password_code",
    },
    permissions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    metadata: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActivated: {
      allowNull: false,
      type: DataTypes.TINYINT,
      field: "is_activated",
      defaultValue: 0,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "role_id",
    },
    activatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "activated_at",
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "last_login",
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
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "deleted_at",
    },
    isSuperuser: {
      type: DataTypes.TINYINT,
      allowNull: false,
      field: "is_superuser",
      defaultValue: 0,
    },
    city: {
      type: DataTypes.STRING(191),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(191),
      allowNull: true,
    },
    companyName: {
      type: DataTypes.STRING(191),
      allowNull: true,
      field: "company_name",
    },
    coordinatorId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "coordinator_id",
    },
    alternativeEmails: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: "alternative_emails",
    },
    documentNumber: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "document_number",
    },
    contact: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    phone: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    extension: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    mobile: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    skype: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    web: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "document_number",
    },
    currency: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    terms: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    type: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    line: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    position: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    industry: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    segment: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    brands: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    status: {
      allowNull: true,
      type: DataTypes.STRING(191),
      defaultValue: 1,
    },
    financingDays: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "financing_days",
    },
    fcmToken: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "fcm_token",
    },
  },
  {
    tableName: "backend_users", // Especifica el alias de la tabla
    timestamps: false, // Desactiva las columnas de control de tiempo
  }
);

module.exports = BackendUsers;

// MODEL
const BACKENDACCESSLOG_TABLE = require("./backendAccessLog.model");

BackendUsers.hasMany(BACKENDACCESSLOG_TABLE, {
  foreignKey: "userId",
  as: "logSystem",
});
