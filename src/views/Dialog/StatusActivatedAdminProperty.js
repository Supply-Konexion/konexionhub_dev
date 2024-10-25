import React, { Fragment, useState, useContext } from "react";
import { UrlServicesContext } from "../../components/UrlServicesContext";
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
import Moment from "moment";

import noDataImg from "assets/img/undraw_House_searching_re_stk8.png";

import {
  cardBodyStyle,
  ButtonStyle0,
  ButtonExit,
} from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function StatusActivatedAdminProperty(props) {
  const classes = useStyles();

  const [error, setError] = useState(false);
  const [mensaje_error, setMensaje_error] = useState("");
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [disabled, setdisabled] = useState(false);
  const [returnLogin, setReturnLogin] = React.useState(false);

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  const handleCloseDialog = (pro) => (event) => {
    props.exit();
  };

  // Obtener la fecha actual y calcular la fecha de fin
  const startDate = Moment().format("YYYY-MM-DD");
  const endDate = Moment().add(1, "month").format("YYYY-MM-DD"); // Un mes después

  const handleChangeSubmit = (event) => {
    const data = {
      status: 1,
    };

    axios
      .put(`${urlServices}publications/${props.id.id}`, data, {
        headers: {
          Authorization: "Bearer " + keyAuthorization,
        },
      })
      .then((response) => {
        submitNotificationTransaction();
        submitActivatedTransaction();
        setdisabled(true);
        props.callBackRefresh();
        setOpenAlertSuccess(true);
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

  const submitNotificationTransaction = () => {
    const value = {
      data: props.id,
    };

    axios
      .post(`${urlServices}users/sendtoemailuser`, value, {
        headers: {
          Authorization: `Bearer ${keyAuthorization}`,
        },
      })
      .then((response) => {})
      .catch((error) => {});
  };

  const submitActivatedTransaction = () => {
    const value = {
      transactionStatus: 1,
      startDate: startDate,
      endDate: endDate,
    };

    axios
      .put(
        `${urlServices}publications-plans/${props.id.publicationsPlans[0].id}`,
        value,
        {
          headers: {
            Authorization: `Bearer ${keyAuthorization}`,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {});
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
        <DialogContent dividers className={classes.styleDialogContent}>
          <Grid container spacing={1} className={classes.containerProfile}>
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                paddingTop: 30,
                display:
                  props.id.publicationsPlans.length === 0 ? "block" : "none",
              }}
            >
              <Alert severity="warning">
                El usuario debe solicitar la publicación de su propiedad para
                poder realizar el pago correspondiente.
              </Alert>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sx={{
                paddingTop: 30,
                display:
                  props.id.publicationsPlans.length === 0 ? "none" : "block",
              }}
            >
              <center>
                <img src={noDataImg} alt="noimage" style={{ width: 180 }} />
                <div className={classes.titleCardFilter}>
                  ¿Desea activar esta publicación para el usuario?
                </div>
                <Alert severity="info">
                  Se habilitará la publicación y en el módulo de pago se
                  reflejará como estado PAGADO. Fecha de inicio{" "}
                  <b>{startDate}</b> y fecha fin <b>{endDate}</b> de la
                  suscripción.
                </Alert>
                <br></br>
                <ButtonStyle0 onClick={handleChangeSubmit} disabled={disabled}>
                  Activar
                </ButtonStyle0>
              </center>
            </Grid>
          </Grid>
          <br></br>
          <center>
            {error ? <Alert severity="error">{mensaje_error}</Alert> : ""}
            {openAlertSuccess ? (
              <Alert severity="success">
                Publicación activada. Enviado correo electrónico de notificación
                al usuario.
              </Alert>
            ) : (
              ""
            )}
          </center>
        </DialogContent>
        <DialogActions>
          <ButtonExit onClick={handleCloseDialog(true)}>Cerrar</ButtonExit>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
