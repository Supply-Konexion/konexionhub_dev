import React, { useState, useContext, useEffect, Fragment } from "react";
import { Navigate } from "react-router-dom";
import { UrlServicesContext } from "components/UrlServicesContext";

// @material-ui/core components
import { makeStyles } from "@mui/styles";
// core components
import NavbarAdmin from "components/Navbars/NavbarAdmin.js";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar.js";
import axios from "axios";
import { Typography, Card, CardContent, Grid } from "@mui/material";

import {
  appStyle,
  CircularProgressTheme,
} from "components/adminStyle.js";

/* #################### COMPONENTS ############################# */
import Dashboard from "views/Dashboard/DashboardCustomers.js";

/* ############################################################# */

import logo from "assets/img/LogotipoFondoTransparente_Konexion.png";

const useStyles = makeStyles(appStyle);

export default function Customers({ ...rest }) {
  const [rows, setRows] = useState([]);
  const [loader, setLoader] = useState(true);
  const [returnLogin, setReturnLogin] = React.useState(false);

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${urlServices}backend-user-roles/profile/${UserAuth.profile_id}`,
          {
            headers: {
              Authorization: "Bearer " + keyAuthorization,
            },
          }
        );

        console.log("ENTROOOO: ",response.data)
  
        setRows(response.data.rows);
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

  // styles
  const classes = useStyles();
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
  const urlLinksComponent = (data) => {
    localStorage.setItem("controllerRouter", "/customers" + data);
  };

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  /* #################### ROUTES ############################# */
  const urlLinks = (() => {
    const routes = {
     /* "/customers/datacompany": {
        component: <DataCompany />,
        name: "Datos de la empresa",
      },
      "/customers/myaccount": { component: <MyAccount />, name: "Tu perfil" },
      "/customers/documentscompanies": {
        component: <ViewsDocumentCompanyCustomers />,
        name: "Documentos",
      },*/
    };

    const currentRoute = localStorage.getItem("controllerRouter");

    if (routes[currentRoute]) {
      return [routes[currentRoute]];
    } else {
      return [{ component: <Dashboard />, name: "Dashboard" }];
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
                    src={logo}
                    alt="logo"
                    style={{ width: 150, marginBottom: 50 }}
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
            // image={image}
            handleDrawerToggle={handleDrawerToggle}
            open={mobileOpen}
            url={urlLinksComponent}
            {...rest}
          />
          <div className={classes.mainPanel} ref={mainPanel}>
            <NavbarAdmin
              routes={urlLinks[0].name}
              handleDrawerToggle={handleDrawerToggle}
              {...rest}
            />
            {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
            <div className={classes.content}>
              <div className={classes.container}>{urlLinks[0].component}</div>
            </div>
            <Footer />
          </div>
        </Fragment>
      )}
    </div>
  );
}
