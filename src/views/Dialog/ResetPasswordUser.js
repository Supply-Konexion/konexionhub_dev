import React, { Fragment, useState, useContext } from "react";
import { Navigate } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  Alert,
} from "@mui/material";
import axios from "axios";
import { UrlServicesContext } from "../../components/UrlServicesContext";

import {
  cardBodyStyle,
  ButtonStyle0,
  ButtonExit,
} from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function ResetPasswordUser(props) {
  const classes = useStyles();

  const [error, setError] = useState(false);
  const [mensaje_error, setMensaje_error] = useState("");
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [mensaje_success, setMensaje_success] = useState("");
  const [disabled, setdisabled] = useState(false);
  const [returnLogin, setReturnLogin] = React.useState(false);

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  const handleCloseDialog = (pro) => (event) => {
    props.exit();
  };

  const handleChangeSubmit = (event) => {
    const data = {
      email: props.id.row.email,
    };

    axios
      .post(`${urlServices}users/resetpassword`, data, {
        headers: {
          Authorization: "Bearer " + keyAuthorization,
        },
      })
      .then((response) => {
        setdisabled(true);
        setOpenAlertSuccess(true);
        setMensaje_success("Correo electrónico enviado.");
      })
      .catch((e) => {
        if (e.response.status === 401) {
          setMensaje_error(
            "La sesión ha expirado, vuelva a iniciar sesión ..."
          );
          setError(true);

          setTimeout(() => {
            localStorage.clear();
            setReturnLogin(true);
          }, 4000);
        } else if (e.response.status === 500) {
          setMensaje_error("Error en la consulta con sel servidor.");
          setError(true);
        }
      });
  };

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={handleCloseDialog(true)}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        keepMounted
        scroll="body"
        PaperProps={{
          sx: {
            borderRadius: 6,
          },
        }}
      >
        <DialogContent dividers>
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} style={{ paddingTop: 50 }}>
                <center>
                  <div className={classes.titleCardFilter}>
                    ¿Desea generar una contraseña temporal a este registro?
                    <center>
                      <b style={{ fontSize: 12 }}>
                        {" "}
                        (Se enviará un correo electrónico con la contraseña
                        temporal)
                      </b>
                    </center>
                  </div>
                  <br></br>
                  <ButtonStyle0
                    onClick={handleChangeSubmit}
                    disabled={disabled}
                  >
                    Enviar
                  </ButtonStyle0>
                </center>
              </Grid>
            </Grid>
            <br></br>
            <center>
              {error ? <Alert severity="error">{mensaje_error}</Alert> : ""}
              {openAlertSuccess ? (
                <Alert severity="success">{mensaje_success}</Alert>
              ) : (
                ""
              )}
            </center>
          </form>
        </DialogContent>
        <DialogActions>
          <ButtonExit onClick={handleCloseDialog(true)}>Cerrar</ButtonExit>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
