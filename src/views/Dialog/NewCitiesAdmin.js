import React, { Fragment, useState, useContext } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import axios from "axios";
import {
  Grid,
  DialogActions,
  DialogContent,
  FormControl,
  Slide,
  Snackbar,
  TextField,
  Alert,
  Dialog,
} from "@mui/material";

import LoadCountries from "components/Services/LoadCountries";
import LoadStates from "components/Services/LoadStates";

import {
  cardBodyStyle,
  ButtonStyle0,
  ButtonExit,
} from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function NewCitiesAdmin(props) {
  const classes = useStyles();

  const [openAlert, setOpenAlert] = useState(false);
  const [disabled, setDisabled] = useState(true);
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
    countriesData: "",
    countries: "",
    statesData: "",
    states: "",
    errorName: false,
    errorCountries: false,
  });

  const handleCloseDialog = (pro) => (event) => {
    props.exit();
  };

  const handleChange = (prop) => (event) => {
    setopenAlertSuccess(false);

    setValues({
      ...values,
      [prop]: event.target.value,
      errorName: false,
    });
    setOpenAlert(false);
  };

  const submitForm = (e) => {
    e.preventDefault();
    setErrorAlert("");
    setopenAlertSuccess(false);

    if (values.name.length === 0) {
      setValues({ ...values, errorName: true });
      setMensaje('El campo "Nombre" es obligatorio.');
      setOpenAlert(true);
      setErrorAlert("error");
    } else if (values.countries === "") {
      setValues({ ...values, errorCountries: true });
      setMensaje("Seleccione un país.");
      setOpenAlert(true);
      setErrorAlert("error");
    } else if (values.states === "") {
      setValues({ ...values, errorStates: true });
      setMensaje("Seleccione una provincia.");
      setOpenAlert(true);
      setErrorAlert("error");
    } else {
      const dataValue = {
        name: values.name,
        locationId: values.states,
        level: 3,
      };

      axios
        .post(`${urlServices}location/cities`, dataValue, {
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
            countriesData: "",
            countries: "",
            statesData: "",
            states: "",
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

  const changeCountries = (data) => {
    setValues({
      ...values,
      countries: data !== null ? data.id : "",
      countriesData: data !== null ? data : "",
      states: "",
      statesData: "",
      errorCountries: false,
    });

    setDisabled(data !== null ? false : true);
    setOpenAlert(false);
  };

  const changeStates = (data) => {
    setValues({
      ...values,
      states: data !== null ? data.id : "",
      statesData: data !== null ? data : "",
      errorStates: false,
    });

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
                <div className={classes.titleCardFilter}>Nueva Ciudad</div>
                <div className={classes.lineBottom}></div>
                <br></br>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl style={{ width: "100%" }}>
                  <TextField
                    name="name"
                    value={values.name}
                    error={values.errorName}
                    onChange={handleChange("name")}
                    fullWidth
                    required
                    label="Nombre"
                    margin="dense"
                    variant="outlined"
                    autoComplete="off"
                    size="small"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6} md={6}>
                <LoadCountries
                  value={values.countriesData}
                  refresh={changeCountries}
                  error={values.errorCountries}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <LoadStates
                  value={values.statesData}
                  refresh={changeStates}
                  disabled={disabled}
                  idCountries={values.countries}
                  error={values.errorStates}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <br></br>
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
