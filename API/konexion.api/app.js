// app.js

const { config } = require("./config/config");

// Establecer la zona horaria en Ecuador/Guayaquil
process.env.TZ = "America/Guayaquil";

// Importar
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { corsOptions } = require("./utils/allowCORs");
const handleCorsError = require("./utils/errorHandler");

// Crear una instancia de la aplicación Express
const app = express();

// Parsear solicitudes de tipo application/json
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Middleware de manejo de errores CORS
app.use(cors(corsOptions));
app.use(handleCorsError);

// Configurar Express para servir archivos estáticos desde la carpeta 'documents'
app.use("/documents", express.static("./documents"));

// Importar el enrutador
const routes = require("./routes/index");
const usersRoutes = require("./routes/users.routes");
const backendUsersRoutes = require("./routes/backendUsers.routes");
const backendUserRolesRoutes = require("./routes/backendUserRoles.routes");
const currencyRoutes = require("./routes/currency.routes");
const clientCommercialTermsRoutes = require("./routes/clientCommercialTerms.routes");
const talamoChinaconexionProvidersRoutes = require("./routes/talamoChinaconexionProviders.routes");
const phaseRoutes = require("./routes/phase.routes");
const talamoChinaconexionServiceRequestsRoutes = require("./routes/talamoChinaconexionServiceRequests.routes");
const talamoChinaconexionProductsRoutes = require("./routes/talamoChinaconexionProducts.routes");
const countryPrefixesRoutes = require("./routes/countryPrefixes.routes");
const modulesRoutes = require("./routes/modules.routes");
const profilesResourcesRoutes = require("./routes/profilesResources.routes");

// Usar el enrutador para manejar las rutas
app.use("/", routes);
app.use("/users", usersRoutes);
app.use("/backend-users", backendUsersRoutes);
app.use("/backend-user-roles", backendUserRolesRoutes);
app.use("/currency", currencyRoutes);
app.use("/client-commercial-terms", clientCommercialTermsRoutes);
app.use("/talamo-chinaconexion-providers", talamoChinaconexionProvidersRoutes);
app.use("/phase", phaseRoutes);
app.use(
  "/talamo-chinaconexion-service-requests",
  talamoChinaconexionServiceRequestsRoutes
);
app.use("/talamo-chinaconexion-products", talamoChinaconexionProductsRoutes);
app.use("/country-prefixes", countryPrefixesRoutes);
app.use("/modules", modulesRoutes);
app.use("/profiles-resources", profilesResourcesRoutes);

// Escuchar en el puerto 3001
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
