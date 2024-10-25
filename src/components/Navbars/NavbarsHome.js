import React, { useState } from "react";
import { Redirect } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@mui/styles";
import {
  Toolbar,
  AppBar,
  Button,
  Grid,
  Hidden,
  IconButton,
} from "@mui/material";
import FormatListBulleted from "@mui/icons-material/FormatListBulleted";
// core components
import Header from "./HeaderCreateAccount.js";

import logoMobil from "assets/img/LogotipoFondoTransparente_Konexion.png";

import { headerStyle } from "components/headerStyle.js";

const useStyles = makeStyles(headerStyle);

export default function NavbarsHome(props) {
  const classes = useStyles();
  const [sentHome, setsubmitHome] = useState(false);

  const submitHome = () => {
    setsubmitHome(true);
  };

  if (sentHome) {
    return <Redirect from="/" to="/" />;
  }

  return (
    <Toolbar className={classes.toolbarMobil}>
      <Hidden smDown implementation="css">
        <Header />
      </Hidden>
      <Hidden mdUp implementation="css">
        <AppBar className={classes.appBarPage}>
          <Toolbar>
            <Grid container>
              <Grid item xs={12}>
                {/*<span className={classes.nameLogoMobil}>AUTOCLICKEAA</span>*/}
                <Button onClick={submitHome}>
                  <img
                    src={logoMobil}
                    alt="validate"
                    style={{
                      width: 90,
                      marginTop: 8,
                      objectFit: "contain",
                    }}
                  />
                </Button>

                <span style={{ float: "right" }}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={props.handleDrawerToggle}
                  >
                    {/*<span className={classes.titleFiltro}>Filtros</span>*/}
                    <FormatListBulleted className={classes.iconMovilRight} />
                  </IconButton>
                </span>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Hidden>
    </Toolbar>
  );
}
