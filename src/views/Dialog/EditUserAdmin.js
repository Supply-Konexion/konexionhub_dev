import React, { Fragment, useState, useContext, useCallback } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";
import debounce from "lodash.debounce";

import { makeStyles } from "@mui/styles";
import axios from "axios";
import { MailOutline, PersonOutline } from "@mui/icons-material";
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

import LoadGender from "components/Services/LoadGender";

import {
  cardBodyStyle,
  ButtonStyle0,
  ButtonExit,
} from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function EditUserAdmin(props) {
  const classes = useStyles();

  const [openAlertSuccess, setopenAlertSuccess] = useState(false);
  const [mensaje_success, setmensaje_success] = useState("");
  const [returnLogin, setReturnLogin] = React.useState(false);
  const [error, setError] = useState(false);
  const [mensageSystem, setMensageSystem] = useState("");
  const [alert, setAlert] = React.useState({
    openAlert: false,
    errorAlert: "error",
    mensaje: "",
  });

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  const [values, setValues] = useState({
    name: props.id.row.name,
    lastName: props.id.row.lastName,
    document_id: props.id.row.documentId,
    email: props.id.row.email,
    emailValue: props.id.row.email,
    gender: props.id.row.genderId,
    genderData: { id: props.id.row.genderId, name: props.id.row.gender?.name },
    phone: props.id.row.phone,
    errorName: false,
    errorLastName: false,
    errorEmail: false,
    errorDocument: false,
    errorGender: false,
    errorPhone: false,
  });

  const handleChange = useCallback(
    debounce((prop, value) => {
      setValues((prevValues) => ({
        ...prevValues,
        [prop]: value,
        errorName: false,
        errorLastName: false,
        errorEmail: false,
        errorDocument: false,
        errorPhone: false,
      }));

      setAlert((prevAlert) => ({
        ...prevAlert,
        openAlert: false,
      }));
    }, 10),
    []
  );
  const handleCloseDialog = (pro) => (event) => {
    props.exit();
  };

  const submitForm = (e) => {
    e.preventDefault();
    setError(false);
    setopenAlertSuccess(false);

    if (values.name.length === 0) {
      setValues({ ...values, errorName: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar un nombre",
      });
    } else if (values.lastName.length === 0) {
      setValues({ ...values, errorLastName: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar un Apellido",
      });
    } else if (values.document_id.length === 0) {
      setValues({ ...values, errorDocument: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar un documento de identificación",
      });
    } else if (values.email.length === 0) {
      setValues({ ...values, errorEmail: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar un correo electrónico",
      });
    } else if (values.gender === "") {
      setValues({ ...values, errorGender: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Seleccione un Género",
      });
    } else if (values.phone === "") {
      setValues({ ...values, errorPhone: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar un teléfono",
      });
    } else {
      const dataValue = {
        documentId: values.document_id,
        name: values.name,
        lastName: values.lastName,
        allNames: values.name + " " + values.lastName,
        genderId: values.gender,
        phone: values.phone,
      };

      if (values.emailValue !== values.email.toLowerCase().trim()) {
        dataValue.email = values.email.toLowerCase().trim();
      }

      axios
        .put(`${urlServices}users/${props.id.row.id}`, dataValue, {
          headers: {
            Authorization: "Bearer " + keyAuthorization,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setopenAlertSuccess(true);
            setmensaje_success(response.data.message);
            props.callBackRefresh();

            /*localStorage.setItem(
              "allname",
              values.name + " " + values.lastName
            );*/
          }
        })
        .catch((e) => {
          if (e.response.status === 409) {
            setValues({ ...values, errorEmail: true });
            setMensageSystem("Correo electrónico ya registrado.");
            setError(true);
          } else if (e.response.status === 401) {
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

  const changeGender = (data) => {
    setValues({
      ...values,
      gender: data !== null ? data.id : "",
      genderData: data !== null ? data : "",
      errorGender: false,
    });

    setAlert({
      ...alert,
      openAlert: false,
    });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ openAlert: false });
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
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12}>
                    {error && <Alert severity="error">{mensageSystem}</Alert>}
                    <div className={classes.titleCardFilter}>
                      Editar usuario
                    </div>
                    <div className={classes.lineBottom}></div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl style={{ width: "100%" }}>
                      <TextField
                        name="name"
                        value={values.name}
                        error={values.errorName}
                        onChange={(event) =>
                          handleChange("name", event.target.value)
                        }
                        fullWidth
                        required
                        size="small"
                        label="Nombres"
                        margin="dense"
                        autoComplete="off"
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <PersonOutline
                              fontSize="small"
                              className={classes.iconInput}
                              position="end"
                            ></PersonOutline>
                          ),
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl style={{ width: "100%" }}>
                      <TextField
                        name="lastName"
                        value={values.lastName}
                        error={values.errorLastName}
                        onChange={(event) =>
                          handleChange("lastName", event.target.value)
                        }
                        fullWidth
                        required
                        size="small"
                        label="Apellidos"
                        margin="dense"
                        autoComplete="off"
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <PersonOutline
                              fontSize="small"
                              className={classes.iconInput}
                              position="end"
                            ></PersonOutline>
                          ),
                        }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl style={{ width: "100%" }}>
                      <TextField
                        name="document_id"
                        value={values.document_id}
                        error={values.errorDocument}
                        onChange={(event) =>
                          handleChange("document_id", event.target.value)
                        }
                        fullWidth
                        required
                        size="small"
                        label="Documento"
                        margin="dense"
                        variant="outlined"
                        autoComplete="off"
                        inputProps={{
                          style: {
                            textAlign: "center",
                          },
                          maxLength: 13,
                        }}
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                        }}
                        helperText="Cédula, RUC o pasaporte."
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="off"
                      name="email"
                      value={values.email}
                      onChange={(event) =>
                        handleChange("email", event.target.value)
                      }
                      label="Email"
                      size="small"
                      error={values.errorEmail}
                      InputProps={{
                        endAdornment: (
                          <MailOutline
                            fontSize="small"
                            className={classes.iconInput}
                            position="end"
                          ></MailOutline>
                        ),
                      }}
                      fullWidth
                      margin="dense"
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <LoadGender
                      value={values.genderData}
                      refresh={changeGender}
                      error={values.errorGender}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl style={{ width: "100%" }}>
                      <TextField
                        name="phone"
                        value={values.phone}
                        error={values.errorPhone}
                        onChange={(event) =>
                          handleChange("phone", event.target.value)
                        }
                        fullWidth
                        required
                        size="small"
                        label="Teléfono"
                        margin="dense"
                        autoComplete="off"
                        variant="outlined"
                        inputProps={{ maxLength: 14 }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <br></br>
                    <center>
                      <ButtonStyle0 type="submit" onClick={submitForm}>
                        Editar {props.title}
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
              </Grid>
            </Grid>
            {alert.openAlert && (
              <Snackbar
                open={true}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={handleCloseAlert}
              >
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                  <Alert
                    onClose={handleCloseAlert}
                    severity={
                      alert.errorAlert === "error" ? "error" : "success"
                    }
                    elevation={6}
                    variant="filled"
                  >
                    {alert.mensaje}
                  </Alert>
                </Slide>
              </Snackbar>
            )}
          </Fragment>
        </DialogContent>
        <DialogActions>
          <ButtonExit onClick={handleCloseDialog(true)}>Cerrar</ButtonExit>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
