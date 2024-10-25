const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const TalamoChinaconexionProviders = sequelize.define(
  "talamo_chinaconexion_providers",
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
    nameNative: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "name_native",
    },
    documentNumber: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "document_number",
    },
    contactDetailsEn: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: "contact_details_en",
    },
    contactNameNative: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "contact_name_native",
    },
    legalRepresentativeNative: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "legal_representative_native",
    },
    address: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    phoneFax: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "phone_fax",
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    web: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    province: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    mainProducts: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: "main_products",
    },
    commercialTerms: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "commercial_terms",
    },
    deliveryAddress: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "delivery_address",
    },
    currency: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    country: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    line: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    providerType: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "provider_type",
    },
    classification: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    isFactoryOwner: {
      allowNull: true,
      type: DataTypes.TINYINT,
      field: "is_factory_owner",
    },
    details: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    type: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    officeAddress: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "office_address",
    },
    mainFactoryAddress: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "main_factory_address",
    },
    hasCatalog: {
      allowNull: true,
      type: DataTypes.TINYINT,
      field: "has_catalog",
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
    employeeCount: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "employee_count",
    },
    terms: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    backendUserId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "backend_user_id",
    },
    questionary: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    userId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "user_id",
    },
    mapLocation: {
      allowNull: true,
      type: DataTypes.STRING(250),
      field: "map_location",
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
    rating: {
      allowNull: true,
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    latitude: {
      allowNull: true,
      type: DataTypes.DOUBLE,
    },
    longitude: {
      allowNull: true,
      type: DataTypes.DOUBLE,
    },
    paymentTerms: {
      allowNull: true,
      type: DataTypes.STRING(500),
      field: "payment_terms",
    },
    portOrigin: {
      allowNull: true,
      type: DataTypes.STRING(500),
      field: "port_origin",
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
    presentialAudienceDate: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "presential_audience_date",
    },
    riskAnalysisDate: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "risk_analysis_date",
    },
    presentialMeetingDate: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "presential_meeting_date",
    },
    standNumber: {
      allowNull: true,
      type: DataTypes.STRING(255),
      field: "stand_number",
    },
    batchImportId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "batch_import_id",
    },
    ranking: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    alternativeEmails: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: "alternative_emails",
    },
    riskDetails: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: "risk_details",
    },
    legal_representative: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "legal_representative",
    },
  },
  {
    tableName: "talamo_chinaconexion_providers", // Especifica el alias de la tabla
    timestamps: false, // Desactiva las columnas de control de tiempo
  }
);

module.exports = TalamoChinaconexionProviders;
