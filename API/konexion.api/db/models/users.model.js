const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const User = sequelize.define(
  "users",
  {
    id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    email: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    activationCode: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "activation_code",
    },
    persistCode: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "persist_code",
    },
    resetPasswordCode: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "reset_password_code",
    },
    permissions: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    isActivated: {
      allowNull: false,
      type: DataTypes.TINYINT,
      field: "is_activated",
      defaultValue: 0,
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
    username: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    surname: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "deleted_at",
    },
    lastSeen: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "last_seen",
    },
    isGuest: {
      allowNull: false,
      type: DataTypes.TINYINT,
      field: "is_guest",
      defaultValue: 0,
    },
    isSuperuser: {
      allowNull: false,
      type: DataTypes.TINYINT,
      field: "is_superuser",
      defaultValue: 0,
    },
    activeCurrencyCode: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "active_currency_code",
    },
    coordinatorId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "coordinator_id",
    },
    companyName: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "company_name",
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
    city: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    country: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    addressDescription: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "address_description",
    },
    phone: {
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
    extension: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    financingDays: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "financing_days",
    },
    backendUserId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "backend_user_id",
    },
    orderDate: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "order_date",
    },
    classification: {
      allowNull: true,
      type: DataTypes.STRING(150),
    },
    legalRepresentative: {
      allowNull: true,
      type: DataTypes.STRING(150),
      field: "legal_representative",
    },
    mapLocation: {
      allowNull: true,
      type: DataTypes.STRING(250),
      field: "map_location",
    },
    latitude: {
      allowNull: true,
      type: DataTypes.DOUBLE,
    },
    longitude: {
      allowNull: true,
      type: DataTypes.DOUBLE,
    },
    virtualMeetingDate: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "virtual_meeting_date",
    },
    virtualMeetingLink: {
      allowNull: true,
      type: DataTypes.STRING(255),
      field: "virtual_meeting_link",
    },
    presentialMeetingDate: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "presential_meeting_date",
    },
    riskAnalysisDate: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "risk_analysis_date",
    },
    presentialAudienceDate: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "presential_audience_date",
    },
    otherMeetingsDate: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "other_meetings_date",
    },
    otherMeetingsDescription: {
      allowNull: true,
      type: DataTypes.STRING(255),
      field: "other_meetings_description",
    },
    paymentMethod: {
      allowNull: true,
      type: DataTypes.STRING(255),
      field: "payment_method",
    },
  },
  {
    tableName: "users", // Especifica el alias de la tabla
    timestamps: false, // Desactiva las columnas de control de tiempo
  }
);

module.exports = User;
