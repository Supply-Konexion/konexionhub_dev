const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const TalamoChinaconexionServiceRequests = sequelize.define(
  "talamo_chinaconexion_service_requests",
  {
    id: {
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    backendUserId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "backend_user_id",
    },
    clientId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "client_id",
    },
    requestableType: {
      allowNull: true,
      type: DataTypes.STRING(50),
      field: "requestable_type",
    },
    requestableId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "requestable_id",
    },
    service: {
      allowNull: false,
      type: DataTypes.STRING(191),
    },
    statusOld: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "status_old",
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
    statusComment: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: "status_comment",
    },
    feedback: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    serviceData: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: "service_data",
    },
    startDate: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "start_date",
    },
    estimatedEndDate: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "estimated_end_date",
    },
    endDate: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "end_date",
    },
    totalDays: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "total_days",
      defaultValue: 0,
    },
    totalDaysDelayed: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "total_days_delayed",
      defaultValue: 0,
    },
    sellerId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "seller_id",
    },
    phase: {
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    total: {
      allowNull: true,
      type: DataTypes.DOUBLE,
    },
    serviceName: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: "service_name",
    },
    statusId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "status_id",
    },
  },
  {
    tableName: "talamo_chinaconexion_service_requests", // Especifica el alias de la tabla
    timestamps: false, // Desactiva las columnas de control de tiempo
  }
);

module.exports = TalamoChinaconexionServiceRequests;
