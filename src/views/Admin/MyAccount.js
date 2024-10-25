import React, { Fragment, useState, useContext, useEffect } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import axios from "axios";
//import Resizer from "react-image-file-resizer";
import {
  CircularProgress,
  Backdrop,
  Grid,
  Slide,
  Snackbar,
  Alert,
  TextField,
  Divider,
  OutlinedInput,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Password,
  AccountCircle,
  ResetTv,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Moment from "moment";

import { cardBodyStyle, ButtonStyle0 } from "components/cardBodyStyle";

import img from "assets/img/undraw_hombre.png";

const useStyles = makeStyles(cardBodyStyle);

/*const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      15,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });*/

export default function MyAccount(props) {
  const classes = useStyles();

  const [returnLogin, setReturnLogin] = React.useState(false);
  const [openBackdrop, setoOpenBackdrop] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [error, setError] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [mensageSystem, setMensageSystem] = useState("");

  const { urlServices, UserAuth, UpdateUserAuth } =
    useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  const [values, setValues] = useState({
    name: "",
    lastName: "",
    email: "",
    documentId: "",
    picture: "",
    password: "",
    prefix: "",
    pictureBase64: "",
    showPassword: false,
    errorName: false,
    errorLastName: false,
    errorDocumentId: false,
    errorEmail: false,
  });

  useEffect(() => {
    if (UserAuth.id !== undefined) {
      setValues({
        ...values,
        name: UserAuth.firstName,
        lastName: UserAuth.lastName,
        allname: UserAuth.firstName + " " + UserAuth.lastName,
        documentId: UserAuth.documentId,
        email: UserAuth.email,
        avatar: null,
      });
    }
  }, [UserAuth.id]);

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
      errorName: false,
      errorLastName: false,
      errorDocumentId: false,
      errorEmail: false,
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitForm = (e) => {
    e.preventDefault();
    setErrorAlert("");
    setError(false);

    if (values.name === "") {
      setValues({ ...values, errorName: true });
      setMensaje('El campo "Nombre" es obligatorio.');
      setOpenAlert(true);
      setErrorAlert("error");
      setoOpenBackdrop(false);
    } else if (values.lastName === "") {
      setValues({ ...values, errorLastName: true });
      setMensaje('El campo "Apellidos" es obligatorio.');
      setOpenAlert(true);
      setErrorAlert("error");
      setoOpenBackdrop(false);
    } else if (values.documentId === "") {
      setValues({ ...values, errorDocumentId: true });
      setMensaje('El campo "Documento" es obligatorio.');
      setOpenAlert(true);
      setErrorAlert("error");
      setoOpenBackdrop(false);
    } else {
      setoOpenBackdrop(true);

      const dataValue = {
        firstName: values.name,
        lastName: values.lastName,
        documentNumber: values.documentId,
        email: UserAuth.email,
      };

      if (values.pictureBase64 !== "") {
        dataValue.avatar = values.pictureBase64;
      }

      if (values.password !== "") {
        dataValue.password = values.password;
      }

      axios
        .put(`${urlServices}backend-users/${UserAuth.id}`, dataValue, {
          headers: {
            Authorization: "Bearer " + keyAuthorization,
          },
        })
        .then(
          (response) => {
            setoOpenBackdrop(false);
            setErrorAlert("success");
            setMensaje("Datos guardados con éxito.");
            setOpenAlert(true);

            UpdateUserAuth({
              allname: values.name + " " + values.lastName,
              firstName: values.name,
              lastName: values.lastName,
              documentId: values.documentId,
              avatar: null,
            });
          },
          (error) => {
            console.log(error);
            setErrorAlert("error");
            setMensaje("Error al registrar los datos.");
            setOpenAlert(true);
            setoOpenBackdrop(false);
          }
        )
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

  /*const uploadSingleFile = async (e) => {
    let image = "",
      outfile = "";

    // Single file
    if (Number(e.file.size) > 30000) {
      // SI ES MAYOR A 500KB LE BAJAMOS EL PESO
      image = await resizeFile(e.file);
      // const newFile = dataURIToBlob(image);
      outfile = image;
    } else {
      outfile = e.base64;
    }
    setValues({ ...values, pictureBase64: outfile });

    // Multiples files
    // if (e.length > 0 && e.length <= 1) {
    //   if (Number(e[0].file.size) > 500000) {
    //     // SI ES MAYOR A 500KB LE BAJAMOS EL PESO
    //     image = await resizeFile(e[0].file)
    //     // const newFile = dataURIToBlob(image);
    //     outfile = image
    //   } else {
    //     outfile = e[0].base64
    //   }
    //   setValues({ ...values, pictureBase64: outfile })
    // }
  };*/

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      <div className={classes.cardTopBlack}></div>
      <Grid
        container
        spacing={3}
        sx={{
          marginTop: "-100px",
          padding: { xs: "0px 20px 0 30px", sm: "0px 80px" },
        }}
      >
        <Grid item xs={12} sm={12}>
          {error ? <Alert severity="error">{mensageSystem}</Alert> : ""}
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={1} className={classes.containerProfile}>
            <Grid item xs={12} sm={12}>
              <center>
                <img
                  alt="avatar"
                  src={values.pictureBase64 || values.picture || img}
                  className={classes.imgUserProfile}
                />
              </center>
            </Grid>
            {/*<Grid item xs={12} sm={6} style={{ paddingTop: 70 }}>
              <label
                className={classes.buttonSubmit2}
                style={{
                  width: 117,
                  padding: 1,
                  textAlign: "center",
                  borderRadius: 0,
                }}
              >
                <FileBase64
                  type="file"
                  multiple={false}
                  onDone={uploadSingleFile}
                />
                <i className="fa fa-cloud-upload"></i>&nbsp;&nbsp;
                {values.picture || values.pictureBase64
                  ? "Cambiar imagen"
                  : "Seleccionar imagen"}
              </label>
            </Grid>*/}
            <Grid item xs={12} sm={12}>
              <AccountCircle className={classes.iconFilter} />{" "}
              <span className={classes.cardTitleBlack} style={{ fontSize: 16 }}>
                Mi perfil
              </span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                value={values.name}
                error={values.errorName}
                onChange={handleChange("name")}
                fullWidth
                required
                label="Nombres"
                margin="dense"
                autoComplete="off"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                value={values.lastName}
                error={values.errorLastName}
                onChange={handleChange("lastName")}
                fullWidth
                required
                label="Apellidos"
                margin="dense"
                autoComplete="off"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                value={values.email}
                error={values.errorEmail}
                onChange={handleChange("email")}
                fullWidth
                required
                label="Correo electrónico"
                margin="dense"
                autoComplete="off"
                disabled
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="documentId"
                value={values.documentId}
                error={values.errorDocumentId}
                onChange={handleChange("documentId")}
                fullWidth
                required
                label="Nro. de documento"
                margin="dense"
                variant="outlined"
                autoComplete="off"
                inputProps={{
                  style: {
                    textAlign: "left",
                  },
                  maxLength: 13,
                }}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                size="small"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Grid container spacing={1} className={classes.containerProfile}>
            <Grid item xs={12} sm={12}>
              <Password className={classes.iconFilter} />{" "}
              <span className={classes.cardTitleBlack} style={{ fontSize: 16 }}>
                Cambiar contraseña
              </span>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Contraseña
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  error={values.errorPassword}
                  onChange={handleChange("password")}
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
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Divider sx={{ margin: "20px 0" }} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <ResetTv className={classes.iconFilter} />{" "}
              <span className={classes.cardTitleBlack} style={{ fontSize: 16 }}>
                Registro de acceso
              </span>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ fontSize: 14 }}>
              <span style={{ fontWeight: "400" }}>Ultimo acceso:</span>
              <br></br>
              <span style={{ fontSize: 12 }}>
                {UserAuth.lastLogin !== ""
                  ? Moment(UserAuth.lastLogin).format("MMM. DD, YYYY, h:mmA")
                  : "----------"}
              </span>
            </Grid>
            <Grid item xs={12} sm={12} sx={{ fontSize: 14 }}>
              <span style={{ fontWeight: "400" }}>Fecha de registro:</span>
              <br></br>
              <span style={{ fontSize: 12 }}>
                {Moment(UserAuth.createdAt).format("MMM. DD, YYYY, h:mmA")}
              </span>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br></br>
      <center>
        <ButtonStyle0
          type="submit"
          onClick={submitForm}
          style={{ margin: "20px 0 30px 0" }}
        >
          Actualizar
        </ButtonStyle0>
      </center>

      <Backdrop
        style={{ zIndex: "9999", color: "#FFFFFF" }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
  );
}
