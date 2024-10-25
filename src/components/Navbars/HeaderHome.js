import React, { Fragment } from "react";

// core components
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { KeyboardArrowUp } from "@mui/icons-material";
import {
  Zoom,
  Fab,
  useScrollTrigger,
  CssBaseline,
  Grid,
  Toolbar,
} from "@mui/material";

import logoPalanka from "assets/img/LogotipoFondoTransparente_Konexion.png";

import {
  headerStyle,
  AppBarStyle,
} from "components/headerStyle.js";

const useStyles = makeStyles(headerStyle);

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        className={classes.rootScrollTop}
      >
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function HeaderHome(props) {
  const classes = useStyles();

  return (
    <Fragment>
      <CssBaseline />
      <AppBarStyle>
        <Toolbar>
          <Grid container>
            <Grid item xs={4} md={4}>
              <img
                src={logoPalanka}
                alt="logoheader"
                style={{ width: 70, marginLeft: "10%" }}
              />              
            </Grid>
          </Grid>
        </Toolbar>
      </AppBarStyle>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab
          className={classes.scrollTop}
          size="small"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </Fragment>
  );
}
