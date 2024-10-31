import React, { useState, useContext, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { UrlServicesContext } from "components/UrlServicesContext";
import debounce from "lodash.debounce";

// reactstrap components
import { makeStyles } from "@mui/styles";
import GoogleLogin from "react-google-login";
import { Visibility, VisibilityOff, Google } from "@mui/icons-material";
import axios from "axios";
import {
  Grid,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Alert,
  Snackbar,
  Slide,
  Box,
  Button,
} from "@mui/material";

import {
  ParagraphTextPage,
  cardBodyStyle,
  CircularProgressTheme,
  ButtonStyle0,
} from "components/cardBodyStyle";

import PasswordRecovery from "../Dialog/PasswordRecovery";

import logoBlanco from "assets/img/LogotipoKonexionScopBlanco.png";

const useStyles = makeStyles(cardBodyStyle);

export default function Login(props) {
  const classes = useStyles();

  const [loaderLogin, setLoaderLogin] = useState(false);
  const [passwordRecovery, setpasswordRecovery] = useState(false);
  const [viewRegister, setViewRegister] = useState(false);
  const [alert, setAlert] = React.useState({
    openAlert: false,
    errorAlert: "error",
    mensaje: "",
    loggedIn: localStorage.getItem("Session") === null ? false : true,
  });

  const [values, setValues] = useState({
    mail: "",
    password: "",
    newPassword: "",
    userspass: "",
    showPassword: false,
    errorMail: false,
    errorPassword: false,
  });

  const { urlServices, LoginAuth, keyLoginGoogle } =
    useContext(UrlServicesContext);

  const handleChange = useCallback(
    debounce((prop, value) => {
      setValues((prevValues) => ({
        ...prevValues,
        [prop]: value,
        errorMail: false,
        errorPassword: false,
      }));

      setAlert((prevAlert) => ({
        ...prevAlert,
        openAlert: false,
      }));
    }, 10),
    []
  );

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // VALIDAMOS SI EL PARAMETRO ES UN EMAIL
    return emailRegex.test(email);
  };

  const submitFormLogin = () => (event) => {
    event.preventDefault();

    if (values.mail.length === 0) {
      setValues({
        ...values,
        errorMail: true,
      });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "El campo Correo electrónico es obligatorio.",
      });
    } else if (values.password.length === 0) {
      setValues({
        ...values,
        errorPassword: true,
      });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "El campo contraseña es obligatorio.",
      });
    } else {
      setLoaderLogin(true);

      const input = values.mail.trim();

      const data = {
        email: isValidEmail(input) ? input : null,
        login: isValidEmail(input) ? null : input,
        password: values.password,
      };

      LoginServices(data);
    }
  };

  const LoginServices = (data) => {
    axios
      .post(`${urlServices}backend-users/login`, data)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.backendUser.status === "0") {
            setLoaderLogin(false);
            setAlert({
              ...alert,
              openAlert: true,
              errorAlert: "error",
              mensaje: "Usuario deshabilitado del sistema.",
            });
          } else {
            LoginAuth(response.data); // SAVE SESSION
            setTimeout(() => {
              redirectProgile(response.data.backendUser.roleId);
            }, 1000);
          }
        }
      })
      .catch((e) => {
        if (e.response.status === 500) {
          setLoaderLogin(false);
          setAlert({
            ...alert,
            openAlert: true,
            errorAlert: "error",
            mensaje: "Error de conexión, intente más tarde.",
          });
        } else if (e.response.status === 404) {
          setLoaderLogin(false);
          setValues({
            ...values,
            errorMail: true,
          });
          setAlert({
            ...alert,
            openAlert: true,
            errorAlert: "error",
            mensaje: e.response.data.message,
          });
        } else if (e.response.status === 401) {
          setLoaderLogin(false);
          setValues({
            ...values,
            errorPassword: true,
          });
          setAlert({
            ...alert,
            openAlert: true,
            errorAlert: "error",
            mensaje: e.response.data.message,
          });
        }
      });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ openAlert: false });
  };

  const handleOpenPasswordRecovery = () => {
    setpasswordRecovery(true);
  };

  const handlesViewRegister = () => {
    setViewRegister(true);
  };

  const handleClosePasswordRecovery = () => {
    setpasswordRecovery(false);
  };

  const redirectProgile = (profile) => {
    localStorage.setItem("controller", "/account");
    localStorage.setItem(
      "controllerRouter",
      `/account/${profile !== 99 ? `dashboard-customer` : `dashboard`}`
    );

    setAlert({ ...alert, loggedIn: true });
  };

  const responseGoogle = (dataGoogle) => {
    if (dataGoogle.profileObj) {
      setLoaderLogin(true);

      setValues({
        ...values,
        mail: dataGoogle.profileObj.email,
        password: "123456789",
      });

      const data = {
        email: dataGoogle.profileObj.email,
        password: 99,
      };

      LoginServices(data);
    }
  };

  if (alert.loggedIn) {
    return (
      <Navigate
        from={localStorage.getItem("controller")}
        to={localStorage.getItem("controllerRouter")}
      />
    );
  }

  if (viewRegister) {
    return <Navigate to={"/register"} />;
  }

  return (
    <Grid container sx={{ color: "#FFFFFF" }}>
      <Grid item xs={12} md={12} sx={{ margin: "12% 0" }}>
        <center>
          <img src={logoBlanco} style={{ objectFit: "cover", width: 250 }} />
        </center>
      </Grid>
      <Grid item xs={12} md={12} sx={{ marginBottom: "10%" }}>
        <ParagraphTextPage
          style={{
            fontSize: 16,
            color: "inherit",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Huānyíng - 欢迎 - Bienvenido
        </ParagraphTextPage>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        sx={{ marginBottom: "10%", textAlign: "center" }}
      >
        <ParagraphTextPage style={{ fontSize: 14, color: "inherit" }}>
          ¿Aún no tienes una cuenta?{" "}
          <b
            style={{ color: "#29ACE2", cursor: "pointer" }}
            onClick={handlesViewRegister}
          >
            Crear una cuenta
          </b>
        </ParagraphTextPage>
      </Grid>
      <Grid item xs={12} md={12}>
        <form onSubmit={submitFormLogin()}>
          <TextField
            id="outlined-basic"
            label="Correo electrónico"
            variant="outlined"
            value={values.mail}
            onChange={(event) => handleChange("mail", event.target.value)}
            error={values.errorMail}
            type="email"
            autoComplete="off"
            margin="dense"
            fullWidth
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
          <FormControl variant="outlined" fullWidth sx={{ m: "10% 0 4% 0" }}>
            <InputLabel
              htmlFor="outlined-adornment-password"
              sx={{
                color: "#FFFFFF",
                "&.Mui-focused": { color: "#FFFFFF" }, // Mantener color blanco al enfocar
              }}
            >
              Contraseña
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              error={values.errorPassword}
              onChange={(event) => handleChange("password", event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? (
                      <Visibility
                        fontSize="small"
                        className={classes.iconInput}
                        sx={{
                          color: "#FFFFFF",
                        }}
                      />
                    ) : (
                      <VisibilityOff
                        fontSize="small"
                        className={classes.iconInput}
                        sx={{
                          color: "#FFFFFF",
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={80}
              label="Contraseña"
              sx={{
                padding: { md: "3px 25px" },
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
                color: "#FFFFFF", // Cambiar el color del texto
                "& .MuiInputLabel-root": {
                  color: "#FFFFFF", // Cambiar el color de la etiqueta
                },
                "& .MuiInputBase-input": {
                  color: "#FFFFFF", // Cambiar el color del texto dentro del input
                },
              }}
            />
          </FormControl>
          <Grid container>
            <Grid item xs={12} md={12}>
              <a onClick={handleOpenPasswordRecovery}>
                <ParagraphTextPage
                  style={{
                    fontSize: 12,
                  }}
                  className={classes.btnPasswordRecovery}
                >
                  ¿Olvidaste tu Contraseña?
                </ParagraphTextPage>
              </a>
            </Grid>
            <Grid item xs={12} md={6}>
              <center>
                <GoogleLogin
                  clientId={keyLoginGoogle}
                  // buttonText="Iniciar sesión con google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                  render={(renderProps) => (
                    <Box
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      //disabled={true}
                      className={classes.btnGoogle}
                      sx={{
                        marginTop: 5,
                        color: "#FFFFFF",
                      }}
                    >
                      <Grid container>
                        <Grid item xs={4} md={4}>
                          <Google
                            sx={{
                              float: "right",
                              color: "#FFFFFF",
                              fontSize: 32,
                            }}
                          />
                        </Grid>
                        <Grid item xs={8} md={8}>
                          Iniciar sesión <br></br>
                          con Google
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                />
              </center>
            </Grid>
            <Grid item xs={12} md={6}>
              <center>
                {loaderLogin ? (
                  <CircularProgressTheme style={{ marginTop: 40 }} />
                ) : (
                  <ButtonStyle0
                    onClick={submitFormLogin()}
                    type="submit"
                    style={{ marginTop: 40 }}
                  >
                    Iniciar sesión
                  </ButtonStyle0>
                )}
              </center>
            </Grid>
          </Grid>
        </form>
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
              severity={alert.errorAlert === "error" ? "error" : "success"}
              elevation={6}
              variant="filled"
            >
              {alert.mensaje}
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
