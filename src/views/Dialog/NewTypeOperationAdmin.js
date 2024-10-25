import React, { Fragment, useState, useContext } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import axios from "axios";
import {
  FormControl,
  Slide,
  Snackbar,
  TextField,
  Grid,
  DialogActions,
  DialogContent,
  Alert,
  Dialog,
} from "@mui/material";

import {
  cardBodyStyle,
  ButtonStyle0,
  ButtonExit,
} from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function NewTypeOperationAdmin(props) {
  const classes = useStyles();

  const [openAlert, setOpenAlert] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [openAlertSuccess, setopenAlertSuccess] = useState(false);
  const [mensaje_success, setmensaje_success] = useState("");
  const [returnLogin, setReturnLogin] = React.useState(false);
  const [error, setError] = useState(false);
  const [mensageSystem, setMensageSystem] = useState("");

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  const [values, setValues] = useState({
    name: "",
    errorName: false,
  });

  const handleChange = (prop) => (event) => {
    setopenAlertSuccess(false);

    setValues({
      ...values,
      [prop]: event.target.value,
      errorName: false,
    });
    setOpenAlert(false);
  };

  const handleCloseDialog = (pro) => (event) => {
    props.exit();
  };

  const submitForm = (e) => {
    e.preventDefault();
    setError(false);
    setopenAlertSuccess(false);

    if (values.name.length === 0) {
      setValues({ ...values, errorName: true });
      setMensaje('El campo "Nombre" es obligatorio.');
      setOpenAlert(true);
      setErrorAlert("error");
    } else {
      const dataValue = {
        name: values.name,
      };

      axios
        .post(`${urlServices}type-operation`, dataValue, {
          headers: {
            Authorization: "Bearer " + keyAuthorization,
          },
        })
        .then((response) => {
          setopenAlertSuccess(true);
          setmensaje_success(response.data.message);
          props.callBackRefresh();

          setValues({
            name: "",
          });
        })
        .catch((e) => {
          if (e.response.status === 401) {
            setMensageSystem(
              "La sesión ha expirado, vuelva a iniciar sesión ..."
            );
            setError(true);

            setTimeout(() => {
              localStorage.clear();
              setReturnLogin(true);
            }, 4000);
          } else if (e.response.status === 500) {
            setMensageSystem("Error en la consulta con sel servidor.");
            setError(true);
          }
        });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      <Dialog
        fullWidth
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
          <Fragment>
            <Grid container spacing={1} className={classes.containerProfile}>
              <Grid item xs={12} sm={12}>
                {error ? <Alert severity="error">{mensageSystem}</Alert> : ""}
                <div className={classes.titleCardFilter}>
                  Nuevo tipo de operación
                </div>
                <div className={classes.lineBottom}></div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl style={{ width: "100%", marginTop: 15 }}>
                  <TextField
                    name="name"
                    value={values.name}
                    error={values.errorName}
                    onChange={handleChange("name")}
                    fullWidth
                    required
                    inputProps={{
                      style: {
                        textAlign: "center",
                      },
                      maxLength: 25,
                    }}
                    label="Nombre"
                    margin="dense"
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <br></br>
                <center>
                  <ButtonStyle0 type="submit" onClick={submitForm}>
                    Guardar
                  </ButtonStyle0>
                </center>
              </Grid>
              <Grid item xs={12} sm={12}>
                <center>
                  {openAlertSuccess ? (
                    <Alert severity="success">{mensaje_success}</Alert>
                  ) : (
                    ""
                  )}
                </center>
              </Grid>
            </Grid>
            <Snackbar
              open={openAlert}
              autoHideDuration={6000}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              onClose={handleClose}
            >
              <Slide direction="up" in={openAlert} mountOnEnter unmountOnExit>
                <Alert
                  onClose={handleClose}
                  severity={errorAlert === "error" ? "error" : "success"}
                  elevation={6}
                  variant="filled"
                >
                  {mensaje}
                </Alert>
              </Slide>
            </Snackbar>
          </Fragment>
        </DialogContent>
        <DialogActions>
          <ButtonExit onClick={handleCloseDialog(true)}>Cerrar</ButtonExit>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
