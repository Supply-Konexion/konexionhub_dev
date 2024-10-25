/*eslint-disable*/
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import classNames from "classnames";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { FormatListBulleted, Home } from "@mui/icons-material";
import Button from "@material-ui/core/Button";

//import Header from "components/Navbars/HeaderCreateAccount.js";
import Filter from "components/services/FilterHomeMechanicsCompleto";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function SidebarFilterMechanics(props) {
  const classes = useStyles();
  const [sentHome, setsubmitHome] = useState(false);
  const [sentlogin, setsubmitLogin] = useState(false);

  const submitHome = () => {
    setsubmitHome(true);
  };

  const submitFilter = (pro) => {
    props.filterSendRefresh(pro);
  };

  if (sentHome) {
    return <Redirect from="/" to="/" />;
  }

  const submitLogin = () => {
    setsubmitLogin(true);
  };

  if (sentlogin) {
    return <Redirect from="/login" to="/login" />;
  }

  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.sidebarWrapper}>
            {/* <Header />*/}
            <div className={classes.itemText3}>
              <ButtonGroup
                aria-label="outlined primary button group"
                className={classes.buttomGroup}
              >
                <Button
                  className={classes.buttonLeft}
                  onClick={submitHome}
                  size="large"
                >
                  <Home className={classes.iconButtom} />
                  <div className={classes.titleButtom}>Inicio</div>
                </Button>
                <Button className={classes.buttonRight} onClick={submitLogin}>
                  Ingresar
                </Button>
              </ButtonGroup>
              <FormatListBulleted style={{ verticalAlign: "middle" }} />{" "}
              Filtros:
            </div>
            <Filter filterSend={submitFilter} />
          </div>
        </Drawer>
      </Hidden>

      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
        >
          <div className={classes.sidebarWrapperHome}>
            <div className={classes.itemText2}>
              <FormatListBulleted style={{ verticalAlign: "middle" }} />{" "}
              Filtros:
            </div>
            <Filter filterSend={submitFilter} />
          </div>
          <div className={classes.backgroundHome} />
        </Drawer>
      </Hidden>
    </div>
  );
}
