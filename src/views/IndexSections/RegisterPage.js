import React, { useState, useContext, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { UrlServicesContext } from "components/UrlServicesContext";
import debounce from "lodash.debounce";

// reactstrap components
import { makeStyles } from "@mui/styles";
import { Button } from "reactstrap";
import { ArrowBackIos, MailOutline, Phone } from "@mui/icons-material";
import axios from "axios";
import { Grid, TextField, Alert, Snackbar, Slide } from "@mui/material";

import {
  TitleTextPage,
  purpleColor,
  ParagraphTextPage,
  cardBodyStyle,
  CircularProgressTheme,
} from "components/cardBodyStyle";

import LoadPrefixes from "components/Services/LoadPrefixes";
import PasswordRecovery from "../Dialog/PasswordRecovery";

import logoBlanco from "assets/img/LogotipoKonexionScopBlanco.png";
import backgroundImge from "assets/img/Fondoazuliniciodeesion.png";

const useStyles = makeStyles(cardBodyStyle);

export default function Login(props) {
  const classes = useStyles();

  const [loaderLogin, setLoaderLogin] = useState(false);
  const [passwordRecovery, setpasswordRecovery] = useState(false);
  const [viewLogin, setViewLogin] = useState(false);
  const [alert, setAlert] = React.useState({
    openAlert: false,
    errorAlert: "error",
    mensaje: "",
  });

  const [values, setValues] = useState({
    names: "",
    lastNames: "",
    email: "",
    documentId: "",
    phone: "",
    prefix: "",
    prefixData: null,
    errorNames: false,
    errorLastNames: false,
    errorEmail: false,
    errorDocumentId: false,
    errorPhone: false,
    errorPrefix: false,
  });

  const { urlServices } = useContext(UrlServicesContext);

  const handleChange = useCallback(
    debounce((prop, value) => {
      setValues((prevValues) => ({
        ...prevValues,
        [prop]: value,
        errorNames: false,
        errorLastNames: false,
        errorDocumentId: false,
        errorEmail: false,
        errorPhone: false,
      }));

      setAlert((prevAlert) => ({
        ...prevAlert,
        openAlert: false,
      }));
    }, 10),
    []
  );

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ openAlert: false });
  };

  const handlesViewLogin = () => {
    setViewLogin(true);
  };

  const handleClosePasswordRecovery = () => {
    setpasswordRecovery(false);
  };

  const changePrefix = (data) => {
    setValues({
      ...values,
      prefix: data !== null ? data : null,
      prefixData: data !== null ? data : null,
      errorPrefix: false,
    });

    setAlert({
      ...alert,
      openAlert: false,
    });
  };

  if (viewLogin) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Grid
      container
      sx={{
        color: "#FFFFFF",
        p: "3% 8%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        backgroundImage: `
        linear-gradient(to top, rgba(0, 132, 182, 0.9), rgba(0, 132, 182, 0)),
        url(${backgroundImge})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid item xs={12} md={12} sx={{ mt: 2 }}>
        <ArrowBackIos
          sx={{ cursor: "pointer", color: "inherit" }}
          onClick={handlesViewLogin}
        />{" "}
        <img src={logoBlanco} style={{ objectFit: "cover", width: 200 }} />
      </Grid>
      <Grid item xs={12} md={12} sx={{ mt: "-4%" }}>
        <TitleTextPage style={{ fontSize: 22, color: "inherit" }}>
          Crear cuenta
        </TitleTextPage>
      </Grid>
      <Grid item xs={12} md={12} sx={{ mt: "-8%" }}>
        <ParagraphTextPage style={{ fontSize: 14, color: "inherit" }}>
          ¿Ya tienes una cuenta?{" "}
          <b
            style={{ color: "#29ACE2", cursor: "pointer" }}
            onClick={handlesViewLogin}
          >
            Iniciar sesión
          </b>
        </ParagraphTextPage>
      </Grid>
      <Grid item xs={12} md={12} sx={{ mt: "-12%" }}>
        <Grid container spacing={2} sx={{ p: "0 5%" }}>
          <Grid item xs={12} md={6} sx={{ p: "0 3%" }}>
            <TextField
              label="Nombre"
              id="outlined-basic"
              variant="outlined"
              value={values.names}
              onChange={(event) => handleChange("names", event.target.value)}
              error={values.errorNames}
              type="text"
              autoComplete="off"
              margin="dense"
              fullWidth
              placeholder="Ingresar..."
              required
              InputLabelProps={{
                style: { color: "#FFFFFF" },
              }}
              InputProps={{
                style: { color: "#FFFFFF" }, // Cambiar el color del texto
                sx: {
                  padding: { md: "3px 10px" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF", // Cambiar el color del borde
                    borderRadius: 5,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF", // Cambiar el color del borde al pasar el ratón
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF", // Cambiar el color del borde al estar enfocado
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ p: "0 3%" }}>
            <TextField
              label="Apellido"
              id="outlined-basic"
              variant="outlined"
              value={values.lastNames}
              onChange={(event) =>
                handleChange("lastNames", event.target.value)
              }
              error={values.errorLastNames}
              type="text"
              autoComplete="off"
              margin="dense"
              fullWidth
              placeholder="Ingresar..."
              required
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              InputProps={{
                style: { color: "#FFFFFF" }, // Cambiar el color del texto
                sx: {
                  padding: { md: "3px 10px" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF", // Cambiar el color del borde
                    borderRadius: 5,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF", // Cambiar el color del borde al pasar el ratón
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF", // Cambiar el color del borde al estar enfocado
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ p: "0 3%" }}>
            <TextField
              label="Documento ID"
              value={values.documentId}
              error={values.errorDocumentId}
              onChange={(event) =>
                handleChange("documentId", event.target.value)
              }
              fullWidth
              margin="dense"
              variant="outlined"
              autoComplete="off"
              inputProps={{
                maxLength: 13,
              }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              placeholder="Ingresar..."
              required
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              InputProps={{
                style: { color: "#FFFFFF" }, // Cambiar el color del texto
                sx: {
                  padding: { md: "3px 10px" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF", // Cambiar el color del borde
                    borderRadius: 5,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF", // Cambiar el color del borde al pasar el ratón
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF", // Cambiar el color del borde al estar enfocado
                  },
                },
              }}
              type="number"
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ p: "0 3%" }}>
            <TextField
              label=" Correo electrónico"
              id="outlined-basic"
              variant="outlined"
              value={values.email}
              onChange={(event) => handleChange("email", event.target.value)}
              error={values.errorEmail}
              type="email"
              autoComplete="off"
              margin="dense"
              fullWidth
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              InputProps={{
                endAdornment: (
                  <MailOutline
                    fontSize="small"
                    className={classes.iconInput}
                    sx={{ color: "#ffffff" }} // Color del icono
                  />
                ),
                sx: {
                  padding: { md: "3px 10px" },
                  color: "#FFFFFF", // Cambiar el color del texto
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF", // Cambiar el color del borde
                    borderRadius: 5,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF", // Cambiar el color del borde al pasar el ratón
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF", // Cambiar el color del borde al estar enfocado
                  },
                  "& input": {
                    color: "#FFFFFF", // Cambiar el color del texto
                  },
                },
              }}
              placeholder="Ingresar..."
              required
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <LoadPrefixes
              value={values.prefixData}
              refresh={changePrefix}
              error={values.errorPrefix}
            />
          </Grid>
          <Grid item xs={6} md={3} sx={{ pr: "3%" }}>
            <TextField
              label="Teléfono"
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => {
                const value = e.target.value;

                // Permitir el valor vacío o un número que no comience con '0'
                if (value === "" || (value.length > 0 && value[0] !== "0")) {
                  handleChange("phone", e.target.value); // Actualiza el valor
                }
              }}
              inputProps={{
                style: {
                  textAlign: "left",
                },
                maxLength: 13,
              }}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
              }}
              value={values.phone}
              autoComplete="off"
              margin="dense"
              error={values.errorPhone}
              fullWidth
              placeholder="958732826"
              helperText="Sin cero (0) en el inicio."
              type="number"
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              InputProps={{
                endAdornment: (
                  <Phone
                    fontSize="small"
                    className={classes.iconInput}
                    position="end"
                    sx={{ color: "#ffffff" }}
                  ></Phone>
                ),
                sx: {
                  padding: { md: "0 10px" },
                  color: "#FFFFFF", // Cambiar el color del texto
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF", // Cambiar el color del borde
                    borderRadius: 5,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF", // Cambiar el color del borde al pasar el ratón
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FFFFFF", // Cambiar el color del borde al estar enfocado
                  },
                  "& input": {
                    color: "#FFFFFF", // Cambiar el color del texto
                  },
                },
              }}
              FormHelperTextProps={{
                style: { color: "#FFFFFF" }, // Cambiar el color del helperText
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ p: "0 3%" }}>
            <center>
              {loaderLogin ? (
                <CircularProgressTheme style={{ marginTop: 40 }} />
              ) : (
                <Button
                  color="info"
                  size="lg"
                  style={{
                    marginTop: 15,
                    background: purpleColor,
                    color: "#ffffff",
                    letterSpacing: ".011em",
                    fontFamily: "sans-serif",
                    fontSize: 12,
                    padding: "15px 0",
                    width: "60%",
                    borderRadius: 10,
                  }}
                  //onClick={submitFormLogin()}
                  type="submit"
                >
                  <b>Crear cuenta</b>
                </Button>
              )}
            </center>
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
              severity="error"
              elevation={6}
              variant="filled"
            >
              {alert.mensaje_error}
            </Alert>
          </Slide>
        </Snackbar>
      )}

      {passwordRecovery && (
        <PasswordRecovery
          open={passwordRecovery}
          exit={handleClosePasswordRecovery}
        />
      )}
    </Grid>
  );
}
