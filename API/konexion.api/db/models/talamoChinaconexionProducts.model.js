const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const TalamoChinaconexionProducts = sequelize.define(
  "talamo_chinaconexion_products",
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
      type: DataTypes.STRING(191),
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    status: {
      allowNull: true,
      type: DataTypes.STRING(10),
    },
    material: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    printType: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "print_type",
    },
    dimensions: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    terms: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    currency: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    notes: {
      allowNull: true,
      type: DataTypes.TEXT,
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
    exportBox: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "export_box",
    },
    line: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    subline: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    capacity: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    colors: {
      allowNull: true,
      type: DataTypes.STRING(191),
    },
    designQuantity: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "design_quantity",
    },
    unitBox: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "unit_box",
    },
    minPrice: {
      allowNull: true,
      type: DataTypes.DOUBLE,
      field: "min_price",
    },
    maxPrice: {
      allowNull: true,
      type: DataTypes.DOUBLE,
      field: "max_price",
    },
    priceDetails: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: "price_details",
    },
    exportBoxWidth: {
      allowNull: true,
      type: DataTypes.DOUBLE,
      field: "export_box_width",
    },
    exportBoxHeight: {
      allowNull: true,
      type: DataTypes.DOUBLE,
      field: "export_box_height",
    },
    exportBoxDepth: {
      allowNull: true,
      type: DataTypes.DOUBLE,
      field: "export_box_depth",
    },
    unitBoxWidth: {
      allowNull: true,
      type: DataTypes.DOUBLE,
      field: "unit_box_width",
    },
    unitBoxHeight: {
      allowNull: true,
      type: DataTypes.DOUBLE,
      field: "unit_box_height",
    },
    unitBoxDepth: {
      allowNull: true,
      type: DataTypes.DOUBLE,
      field: "unit_box_depth",
    },
    unitPerExportBox: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "unit_per_export_box",
    },
    unitWeight: {
      allowNull: true,
      type: DataTypes.DOUBLE,
      field: "unit_weight",
    },
    exportBoxRawWeight: {
      allowNull: true,
      type: DataTypes.DOUBLE,
      field: "export_box_raw_weight",
    },
    giftBoxRawWeight: {
      allowNull: true,
      type: DataTypes.DOUBLE,
      field: "gift_box_raw_weight",
    },
    unitWeightUnit: {
      allowNull: true,
      type: DataTypes.STRING(191),
      field: "unit_weight_unit",
    },
    providerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: "provider_id",
    },
    quantitiesPrices: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: "quantities_prices",
    },
    itemNumber: {
      allowNull: true,
      type: DataTypes.STRING(120),
      field: "item_number",
    },
    netWeightPerExportationBox: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "net_weight_per_exportation_box",
    },
    unitWeightPerProductWithPacking: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 4),
      field: "unit_weight_per_product_with_packing",
    },
    unitWeightPerProductWithoutPacking: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 4),
      field: "unit_weight_per_product_without_packing",
    },
    individualPackagingDetails: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: "individual_packaging_details",
    },
    backendUserId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "backend_user_id",
    },
    revisionDate: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "revision_date",
    },
    catalogUpdateDate: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "catalog_update_date",
    },
    serviceProductTypeDetail: {
      allowNull: true,
      type: DataTypes.STRING(255),
      field: "service_product_type_detail",
    },
    serviceGrossWeight: {
      allowNull: true,
      type: DataTypes.DOUBLE,
      field: "service_gross_weight",
    },
    serviceCbmTotal: {
      allowNull: true,
      type: DataTypes.DOUBLE,
      field: "service_cbm_total",
    },
    serviceLoadDimensions: {
      allowNull: true,
      type: DataTypes.STRING(255),
      field: "service_load_dimensions",
    },
    serviceIsDangerous: {
      allowNull: true,
      type: DataTypes.TINYINT,
      field: "service_is_dangerous",
    },
    serviceLoadDetails: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: "service_load_details",
    },
    serviceTrip: {
      allowNull: true,
      type: DataTypes.STRING(255),
      field: "service_trip",
    },
    servicePol: {
      allowNull: true,
      type: DataTypes.STRING(255),
      field: "service_pol",
    },
    servicePod: {
      allowNull: true,
      type: DataTypes.STRING(255),
      field: "service_pod",
    },
    serviceEtd: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "service_etd",
    },
    serviceEta: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "service_eta",
    },
    serviceRoute: {
      allowNull: true,
      type: DataTypes.STRING(255),
      field: "service_route",
    },
    serviceTransitDays: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "service_transit_days",
    },
    serviceFreeDaysAtDestination: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "service_free_days_at_destination",
    },
    serviceOfferValidUntil: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "service_offer_valid_until",
    },
    serviceType: {
      allowNull: true,
      type: DataTypes.STRING(255),
      field: "service_type",
    },
    serviceTransportCost: {
      allowNull: true,
      type: DataTypes.DOUBLE,
      field: "service_transport_cost",
    },
    serviceOriginCosts: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: "service_origin_costs",
    },
    serviceDestinationCosts: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: "service_destination_costs",
    },
    serviceOtherCosts: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: "service_other_costs",
    },
    serviceTotalCosts: {
      allowNull: true,
      type: DataTypes.DOUBLE,
      field: "service_total_costs",
    },
    serviceInsuranceServices: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: "service_insurance_services",
    },
    serviceCustomsBrokerServices: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: "service_customs_broker_services",
    },
    serviceLandTransportServices: {
      allowNull: true,
      type: DataTypes.TEXT,
      field: "service_land_transport_services",
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING(255),
      defaultValue: "product",
    },
    clientId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      field: "client_id",
    },
  },
  {
    tableName: "talamo_chinaconexion_products", // Especifica el alias de la tabla
    timestamps: false, // Desactiva las columnas de control de tiempo
  }
);

module.exports = TalamoChinaconexionProducts;
