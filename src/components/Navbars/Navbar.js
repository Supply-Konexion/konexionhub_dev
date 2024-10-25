import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import FormatListBulleted from "@mui/icons-material/FormatListBulleted";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import { AppBar, Hidden, IconButton, Toolbar, Grid } from "@mui/material";

import logoMobil from "assets/img/LogotipoFondoTransparente_Konexion.png";

import {
  headerStyle,
  AppBarStyle,
} from "components/headerStyle.js";

const useStyles = makeStyles(headerStyle);

export default function NavbarAdmin(props) {
  const classes = useStyles();

  const [sentHome, setsubmitHome] = useState(false);
  const submitHome = () => {
    setsubmitHome(true);
  };

  if (sentHome) {
    return <Navigate from="/" to="/" />;
  }

  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.flex}>
        {/* Here we create navbar brand, based on route name */}
        <div className={classes.title}>{props.routes}</div>
      </div>
      <Hidden smDown implementation="css">
        <AdminNavbarLinks />
      </Hidden>
      <Hidden mdUp implementation="css">
        <AppBarStyle>
          <Toolbar>
            <Grid container>
              <Grid item xs={12}>
                {/*<span className={classes.nameLogoMobil}>AUTOCLICKEAA</span>*/}
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={submitHome}
                >
                  <img
                    src={logoMobil}
                    alt="validate"
                    style={{
                      width: 90,
                      objectFit: "contain",
                    }}
                  />
                </IconButton>
                <span style={{ float: "right" }}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.handleDrawerToggle}
                  >
                    <FormatListBulleted className={classes.iconMovilRight} />
                  </IconButton>
                </span>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBarStyle>
      </Hidden>
    </Toolbar>
  );
}

NavbarAdmin.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};
