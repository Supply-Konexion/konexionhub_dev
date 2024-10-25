import React, { Fragment, useState, useEffect, useContext } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";

import { makeStyles } from "@mui/styles";
import {
  Dialpad,
  WatchLater,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import axios from "axios";
import {
  CircularProgress,
  Box,
  TextField,
  Grid,
  DialogActions,
  DialogContent,
  Dialog,
  Alert,
  OutlinedInput,
  InputLabel,
  FormControl,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";

import successImg from "assets/img/success.gif";

import {
  ButtonExit,
  cardBodyStyle,
  ButtonStyle0,
} from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function PasswordRecovery(props) {
  const classes = useStyles();
  const [mail, setMail] = useState("");
  const [code, setCode] = useState("");
  const [sendMail, setSendMail] = useState("");
  const [userId, setUserId] = useState("");
  const [repeatpassword, setRepeatpassword] = useState("");
  const [newpasswordvalue, setNewpasswordvalue] = useState("");
  const [newPassword, setNewPassword] = useState(false);
  const [codeValidate, setCodeValidate] = useState("");
  const [validateCode, setValidateCode] = useState(false);
  const [mensaje_error, setMensaje_error] = useState("");
  const [errorFieldMail, setErrorFieldMail] = useState(false);
  const [errorFieldCode, setErrorFieldCode] = useState(false);
  const [keyAuthorization, setKeyAuthorization] = useState("");
  const [errorFieldNewpassword, setErrorFieldNewpassword] = useState(false);
  const [errorFieldRepeatpassword, setErrorFieldRepeatpassword] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = React.useState("");
  const [mins, setMinutes] = useState(2);
  const [secs, setSeconds] = useState(0);

  const { urlServices } = useContext(UrlServicesContext);

  const handleCloseDialog = (pro) => (event) => {
    props.exit();
  };

  const [values, setValues] = useState({
    showPassword: "",
    showRepeatPassword: "",
  });

  useEffect(() => {
    if (validateCode) {
      let sampleInterval = setInterval(() => {
        if (secs > 0) {
          setSeconds(secs - 1);
        }
        if (secs === 0) {
          if (mins !== 0) {
            setMinutes(mins - 1);
            setSeconds(59);
          } else {
            setValidateCode(false);
            setCode("");
            setMail("");
            setMinutes(2);
            setSeconds(0);
          }
        }
      }, 1000);
      return () => {
        clearInterval(sampleInterval);
      };
    }
  });

  const handleChange = () => (event) => {
    setMensaje_error("");
    setErrorFieldMail(false);
    setMail(event.target.value);
  };

  const handleChangeCode = () => (event) => {
    setMensaje_error("");
    setErrorFieldCode(false);
    setCode(event.target.value);
  };

  const handleChangeNewPassword = () => (event) => {
    setMensaje_error("");
    setErrorFieldNewpassword(false);
    setNewpasswordvalue(event.target.value);
  };

  const handleChangeRepeatPassword = () => (event) => {
    setMensaje_error("");
    setErrorFieldRepeatpassword(false);
    setRepeatpassword(event.target.value);
  };

  const emailForm = (e) => {
    e.preventDefault();

    setErrorFieldMail(false);
    setMensaje_error("");
    setError(false);

    if (mail.length === 0) {
      setMensaje_error("El campo es obligatorio!");
      setErrorFieldMail(true);
    } else {
      setLoading(true);

      const data2 = {
        email: mail.toLowerCase(),
      };

      axios
        .post(`${urlServices}users/recovery`, data2)
        .then((response2) => {
          setCodeValidate(response2.data.code);
          setUserId(response2.data.user);
          setKeyAuthorization(response2.data.token);
          setValidateCode(true);
          setLoading(false);
        })
        .catch((e) => {
          if (e.response === undefined) {
            setError(true);
            setMessageError("Error con el servidor.");
          } else if (e.response.status === 401) {
            setError(true);
            setMessageError(e.response.data.message);
            setLoading(false);
          } else if (e.response.status === 404) {
            setError(true);
            setMessageError("Correo electrónico no registrado.");
            setLoading(false);
          }
        });
    }
  };

  const codeForm = (e) => () => {
    setErrorFieldCode(false);
    setMensaje_error("");

    if (code.length === 0) {
      setMensaje_error("El campo es obligatorio!");
      setErrorFieldCode(true);
    } else if (codeValidate !== code) {
      setMensaje_error("El código ingresado es incorrecto.");
      setErrorFieldCode(true);
    } else {
      setNewPassword(true);
    }
  };

  const newPasswordForm = (e) => () => {
    setErrorFieldNewpassword(false);
    setErrorFieldRepeatpassword(false);
    setMensaje_error("");

    if (newpasswordvalue.length === 0) {
      setMensaje_error("El campo es obligatorio!");
      setErrorFieldNewpassword(true);
    } else if (repeatpassword.length === 0) {
      setMensaje_error("El campo es obligatorio!");
      setErrorFieldRepeatpassword(true);
    } else if (newpasswordvalue !== repeatpassword) {
      setMensaje_error("Las contraseñas ingresadas no son iguales");
      setErrorFieldNewpassword(true);
      setErrorFieldRepeatpassword(true);
    } else {
      setLoading(true);

      const data = {
        password: newpasswordvalue,
      };

      axios
        .put(`${urlServices}users/change-password/${userId}`, data, {
          headers: {
            Authorization: "Bearer " + keyAuthorization,
          },
        })
        .then((response) => {
          setSendMail(true);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e.response);
          if (e.response === undefined) {
            setError(true);
            setMessageError("Error con el servidor.");
          } else if (e.response.status === 401) {
            setError(true);
            setMessageError(e.response.data.message);
            setLoading(false);
          } else if (e.response.status === 404) {
            setError(true);
            setMessageError(e.response.data.message);
            setLoading(false);
          }
        });
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowRepeatPassword = () => {
    setValues({ ...values, showRepeatPassword: !values.showRepeatPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownRepeatPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <Dialog
        fullWidth
        maxWidth="sm"
        // onClose={handleCloseDialog(true)}
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
            <Grid item xs={12} sm={12}>
              {error ? <Alert severity="error">{messageError}</Alert> : ""}
            </Grid>
            <Grid item xs={12} sm={12}>
              <div className={classes.titleCardFilter}>
                Recuperación de contraseña
              </div>
              <div className={classes.lineBottom}></div>
              <br></br>
            </Grid>
            {sendMail ? (
              <Grid item xs={12} sm={12}>
                <center>
                  <img
                    src={successImg}
                    alt="successPassword"
                    style={{
                      width: "150px",
                    }}
                  />
                  <br></br>
                  <div className={classes.titleCard}>
                    Contraseña cambiada exitosamente.
                  </div>
                </center>
              </Grid>
            ) : !validateCode ? (
              <Grid item xs={12} sm={12}>
                <center>
                  <Box width={300}>
                    <TextField
                      name="mail"
                      value={mail}
                      error={errorFieldMail}
                      onChange={handleChange("mail")}
                      fullWidth
                      required
                      label="Correo electrónico"
                      helperText={mensaje_error}
                      margin="dense"
                      variant="outlined"
                      autoComplete="off"
                    />
                  </Box>
                  <br></br>
                  <div className={classes.wrapperButtonProgress}>
                    <ButtonStyle0 disabled={loading} onClick={emailForm}>
                      Enviar
                    </ButtonStyle0>
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </center>
              </Grid>
            ) : !newPassword ? (
              <Fragment>
                <Grid item xs={12} sm={12}>
                  <center>
                    <Dialpad style={{ fontSize: "42px" }} />
                    <Box width="75%">
                      <TextField
                        autoComplete="off"
                        name="code"
                        type="number"
                        value={code}
                        error={errorFieldCode}
                        onChange={handleChangeCode("code")}
                        required
                        label="Código de validación"
                        margin="dense"
                        size="small"
                        inputProps={{
                          style: { textAlign: "center", fontSize: 24 },
                          maxLength: 6,
                        }}
                        helperText={mensaje_error}
                        fullWidth
                      />
                    </Box>
                    <Alert severity="warning">
                      El código fue enviado a su correo electrónico, revise su
                      bandeja de recibidos o correos no deseados (SPAM).
                    </Alert>
                    <br></br>
                    <ButtonStyle0 onClick={codeForm()}>
                      Validar código
                    </ButtonStyle0>
                  </center>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <center>
                    <span className={classes.cardTitleDialog}>
                      <WatchLater
                        fontSize="small"
                        className={classes.iconTheme}
                      />{" "}
                      <small style={{ color: "black" }}>
                        {(mins < 10 ? "0" + mins : mins) +
                          ":" +
                          (secs < 10 ? "0" + secs : secs)}
                      </small>
                    </span>
                  </center>
                </Grid>
              </Fragment>
            ) : (
              <Grid item xs={12} sm={12}>
                <center>
                  <b>Ingrese su nueva contraseña</b>
                  <br></br>
                  <FormControl
                    variant="outlined"
                    sx={{ marginTop: 2, width: "75%" }}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Contraseña
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={newpasswordvalue}
                      error={errorFieldNewpassword}
                      onChange={handleChangeNewPassword()}
                      margin="dense"
                      size="small"
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
                              />
                            ) : (
                              <VisibilityOff
                                fontSize="small"
                                className={classes.iconInput}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={80}
                      label="Contraseña"
                    />
                    <FormHelperText>
                      {errorFieldNewpassword ? mensaje_error : ""}
                    </FormHelperText>
                  </FormControl>
                  <br></br>
                  <FormControl
                    variant="outlined"
                    sx={{ marginTop: 2, width: "75%" }}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Repetir contraseña
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showRepeatPassword ? "text" : "password"}
                      value={repeatpassword}
                      error={errorFieldRepeatpassword}
                      onChange={handleChangeRepeatPassword()}
                      margin="dense"
                      size="small"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowRepeatPassword}
                            onMouseDown={handleMouseDownRepeatPassword}
                            edge="end"
                          >
                            {values.showRepeatPassword ? (
                              <Visibility
                                fontSize="small"
                                className={classes.iconInput}
                              />
                            ) : (
                              <VisibilityOff
                                fontSize="small"
                                className={classes.iconInput}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={80}
                      label="Repetir contraseña"
                    />
                    <FormHelperText>
                      {errorFieldRepeatpassword ? mensaje_error : ""}
                    </FormHelperText>
                  </FormControl>
                  <br></br>
                  <br></br>
                  <div className={classes.wrapperButtonProgress}>
                    <ButtonStyle0
                      disabled={loading}
                      onClick={newPasswordForm()}
                    >
                      Guardar
                    </ButtonStyle0>
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </center>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonExit onClick={handleCloseDialog(true)}>Cerrar</ButtonExit>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
