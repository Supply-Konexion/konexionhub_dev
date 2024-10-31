import React, { Fragment, useState, useContext } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";

//import { Redirect } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import { Grid, DialogActions, DialogContent, Dialog } from "@mui/material";

import img from "assets/img/undraw_towing_6yy4.png";

import {
  cardBodyStyle,
  ButtonExit,
  ButtonStyle0,
} from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function PopupLogout(props) {
  const classes = useStyles();

  const [open] = useState(props.open);
  const [returnLogin, setReturnLogin] = React.useState(false);

  const { LogoutAuth } = useContext(UrlServicesContext);

  const handleClose = () => {
    props.exit();
  };

  const handleLogout = () => {
    setTimeout(() => {
      LogoutAuth();
      localStorage.clear();
      setReturnLogin(true);
    }, 200);
  };

  /*if (returnLogin) {
    return <Redirect to="/" />;
  }*/

  if (returnLogin) {
    window.location.href = "/";
  }

  return (
    <Fragment>
      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{
          sx: {
            borderRadius: 6,
          },
        }}
      >
        <DialogContent dividers>
          <Grid container className={classes.root}>
            <Grid item xs={12} sm={12}>
              <center>
                <img
                  src={img}
                  alt="validate"
                  style={{
                    width: 150,
                  }}
                />
                <div className={classes.titleCardFilter}>
                  ¿Desea cerrar sesión?
                </div>
                <br></br>
                <ButtonStyle0 onClick={handleLogout} style={{ marginTop: 15 }}>
                  Cerrar sesión
                </ButtonStyle0>
              </center>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonExit onClick={handleClose}>Cerrar</ButtonExit>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
