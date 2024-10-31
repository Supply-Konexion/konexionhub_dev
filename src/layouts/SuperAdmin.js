import React, { useState, useContext, useEffect, Fragment } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UrlServicesContext } from "components/UrlServicesContext";

// @material-ui/core components
import { makeStyles } from "@mui/styles";
// core components
import NavbarAdmin from "components/Navbars/Navbar.js";
import Sidebar from "components/Sidebar/SidebarAdmin";
import axios from "axios";
import { Typography, Card, CardContent, Grid } from "@mui/material";

import { appStyle, CircularProgressTheme } from "components/adminStyle.js";

/* #################### COMPONENTS ############################# */
import Dashboard from "views/Dashboard/Dashboard.js";
import MyAccount from "views/Admin/MyAccount.js";
import ServicesPageAdmin from "views/Admin/ServicesPageAdmin.js";
import SupplierCustomer from "views/Admin/SupplierCustomer.js";
/* ############################################################# */

import logo from "assets/img/LogotipoKonexionScopBlanco.png";
import logoBlack from "assets/img/LogotipoFondoTransparente_Konexion.png";

const useStyles = makeStyles(appStyle);

export default function SuperAdmin({ ...rest }) {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [loader, setLoader] = useState(true);
  const [returnLogin, setReturnLogin] = React.useState(false);
  const [currentRoute, setCurrentRoute] = useState("/dashboard"); // Estado para la ruta actual

  const { urlServices, UserAuth } = useContext(UrlServicesContext);
  const location = useLocation(); // Hook para obtener la URL actual

  let keyAuthorization = UserAuth.Session;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${urlServices}profiles-resources/profile`,
          {
            headers: {
              Authorization: "Bearer " + keyAuthorization,
            },
          }
        );

        // Suponiendo que response.data.rows es tu array de datos
        const moduleMap = new Map();

        response.data.rows.forEach((row) => {
          let moduleId, moduleName, moduleIconName, moduleCssName, moduleOrder;

          if (row.resource.modules) {
            // Si el recurso tiene módulos, usar los detalles del módulo
            moduleId = row.resource.modules.id;
            moduleName = row.resource.modules.name;
            moduleIconName = row.resource.modules.iconName;
            moduleCssName = row.resource.modules.cssName;
            moduleOrder = row.resource.modules.nOrder;
          } else {
            // Si el recurso no tiene módulos, usar el id y nombre del recurso
            moduleId = row.resource.id;
            moduleName = row.resource.name;
            moduleIconName = null; // Asignar null o un valor predeterminado
            moduleCssName = null; // Asignar null o un valor predeterminado
            moduleOrder = row.resource.nOrder; // Asignar un valor predeterminado si es necesario
          }

          // Verificar si el módulo ya existe en el mapa
          if (!moduleMap.has(moduleId)) {
            // Si no existe, crear un nuevo módulo con recursos
            moduleMap.set(moduleId, {
              id: moduleId,
              name: moduleName,
              iconName: moduleIconName,
              cssName: moduleCssName,
              nOrder: moduleOrder,
              path: row.resource.path || "", // Usar el path del recurso si no tiene módulo
              resources: [], // Inicializar el array de recursos
            });
          }

          // Obtener el módulo actual del mapa
          const module = moduleMap.get(moduleId);

          // Agregar el recurso al módulo correspondiente
          if (row.resource.modules) {
            // Si el recurso tiene módulos, agregarlo a los recursos del módulo
            module.resources.push({
              id: row.resource.id,
              name: row.resource.name,
              path: row.resource.path,
            });
          }
        });

        // Convertir el mapa a un array
        const unifiedModules = Array.from(moduleMap.values());

        setRows(unifiedModules);
        const timer = setInterval(() => {
          setLoader(false);
        }, 1500);

        return () => {
          clearInterval(timer);
        };
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setTimeout(() => {
            localStorage.clear();
            setReturnLogin(true);
          }, 200);
        } else {
          setLoader(false);
          setRows([]);
        }
      }
    };

    fetchData();
  }, [urlServices, keyAuthorization, UserAuth.profile_id]);

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location.pathname]);

  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();

  const [alert] = React.useState({
    loggedIn: UserAuth.Session === null ? false : true,
  });

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!alert.loggedIn) {
    return <Navigate to="/" />;
  }

  // Función para actualizar la ruta actual
  const handleRouteChange = (route) => {
    setCurrentRoute("/account" + route);
  };

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  /* #################### ROUTES ############################# */
  const urlLinks = (() => {
    const routes = {
      "/account/dashboard-customer": {
        component: <Dashboard />,
        name: "Inicio",
      },
      "/account/myaccount": {
        component: <MyAccount />,
        name: "Tu perfil",
      },
      "/account/services": {
        component: <ServicesPageAdmin />,
        name: "Servicios",
      },
      "/account/supplier-customer": {
        component: <SupplierCustomer />,
        name: "Calificacion proveedores/clientes",
      },
      "/account/cost-optimization": {
        component: <ServicesPageAdmin />,
        name: "Servicios",
      },
      "/account/negotiation-purchasing": {
        component: <ServicesPageAdmin />,
        name: "Servicios",
      },
      "/account/product-quality": {
        component: <ServicesPageAdmin />,
        name: "Servicios",
      },
      "/account/logistics-management": {
        component: <ServicesPageAdmin />,
        name: "Servicios",
      },
    };

    if (routes[currentRoute]) {
      return [routes[currentRoute]];
    } else {
      return [{ component: <Dashboard />, name: "Inicio" }]; // Ruta por defecto
    }
  })();
  /* ########################################################### */

  return (
    <div className={classes.wrapper}>
      {loader ? (
        <Grid container>
          <Grid item xs={12} sm={12}>
            <center>
              <Card
                style={{
                  width: 400,
                  marginTop: 100,
                  padding: 20,
                  borderRadius: 15,
                }}
              >
                <CardContent>
                  <img
                    src={logoBlack}
                    alt="logo"
                    style={{ width: 140, marginBottom: 40 }}
                  />
                  <br></br>
                  <CircularProgressTheme />
                  <br></br>
                  <Typography variant="subtitle2" color="textSecondary">
                    CARGANDO DATOS ...
                  </Typography>
                </CardContent>
              </Card>
            </center>
          </Grid>
        </Grid>
      ) : (
        <Fragment>
          <Sidebar
            routes={rows}
            logo={logo}
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            url={handleRouteChange} // Pasamos la función para actualizar la ruta
            {...rest}
          />
          <div className={classes.mainPanel} ref={mainPanel}>
            <NavbarAdmin
              routes={urlLinks[0].name}
              handleDrawerToggle={handleDrawerToggle}
              {...rest}
            />
            <div className={classes.content}>
              <div className={classes.container}>{urlLinks[0].component}</div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}
