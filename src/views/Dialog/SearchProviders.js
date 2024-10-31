import React, { Fragment, useState, useEffect, useContext } from "react";
import { UrlServicesContext } from "../../components/UrlServicesContext";
import { Navigate } from "react-router-dom";

import {
  Storefront,
  Phone,
  ErrorOutline,
  TaskAlt,
  WarningAmber,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  Alert,
  Card,
  //CardActionArea,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import axios from "axios";

import noData from "assets/img/undraw_Notify_re_65on.png";
import logo from "assets/img/undraw_cabin_hkfr.png";
import loaderGif from "assets/img/loading.gif";

import {
  cardBodyStyle,
  ButtonStyle0,
  TitleTextPage,
  ParagraphTextPage,
  ButtonExit,
} from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function SearchProviders(props) {
  const classes = useStyles();

  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [mensageSystem, setMensageSystem] = useState("");
  const [rowsResponse, setRowsResponse] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [rows, setRows] = useState([]);
  const [returnLogin, setReturnLogin] = React.useState(false);

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  const handleCloseDialog = (pro) => (event) => {
    props.exit();
  };

  useEffect(() => {
    RefreshTable(props.search);
  }, [props.search]);

  const RefreshTable = async (value) => {
    setLoader(true);

    const data = {
      search: value,
    };

    try {
      const response = await axios.post(
        `${urlServices}talamo-chinaconexion-providers/search/product`,
        data,
        {
          headers: {
            Authorization: "Bearer " + keyAuthorization,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setRows(response.data.resultados);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setNotFound(true);
      }
      if (error.response?.status === 401) {
        setMensageSystem("La sesión ha expirado, vuelva a iniciar sesión ...");
        setError(true);
        setTimeout(() => {
          localStorage.clear();
          setReturnLogin(true);
        }, 4000);
      } else if (error.response?.status === 500) {
        setRows([]);
        setMensageSystem("Error en la consulta con el servidor.");
        setError(true);
      }
    } finally {
      setLoader(false);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      const truncatedText = text.substring(0, maxLength);
      return (
        <>
          <span style={{ textTransform: "lowercase" }}>{truncatedText}</span>
          <span style={{ fontWeight: "bold", fontSize: 12, color: "#BDBEC0" }}>
            {" "}
            [...]
          </span>
        </>
      );
    } else {
      return <span style={{ textTransform: "lowercase" }}>{text}</span>;
    }
  };

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      <Dialog
        fullWidth
        maxWidth="md"
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
            <Grid item xs={12} md={12}>
              <center>
                {error ? <Alert severity="error">{mensageSystem}</Alert> : ""}
              </center>
            </Grid>
            {notFound ? (
              <>
                <Grid item xs={12} md={12}>
                  <center>
                    <img
                      src={noData}
                      style={{ width: 200, margin: "3px 0 15px 0" }}
                    />
                    <br></br>
                    <ParagraphTextPage style={{ fontSize: 16 }}>
                      <b>OOPS!</b> <br></br> Al parecer el dato que ingresaste
                      no hay resultados.<br></br> Contáctanos y te ayudaremos en
                      tu búsqueda de proveedores.
                    </ParagraphTextPage>
                  </center>
                </Grid>
                <Grid item xs={12} md={6} sx={{ mt: 2.2 }}>
                  <center>
                    <ButtonExit onClick={handleCloseDialog(true)}>
                      Nueva busqueda
                    </ButtonExit>
                  </center>
                </Grid>
                <Grid item xs={12} md={6} sx={{ mt: 3 }}>
                  <center>
                    <ButtonStyle0
                      component="a" // Esto convierte el botón en un enlace
                      href="https://api.whatsapp.com/send/?phone=593963070045&text&type=phone_number&app_absent=0"
                      target="_blank" // Abre en una nueva pestaña
                      rel="noopener noreferrer" // Seguridad para prevenir vulnerabilidades
                      style={{ width: 250 }}
                      endIcon={<Phone />}
                    >
                      Contactar un operador
                    </ButtonStyle0>
                  </center>
                </Grid>
              </>
            ) : (
              <>
                {rows.length > 0 ? (
                  <>
                    <Grid item xs={12} md={12}>
                      <TitleTextPage style={{ fontSize: 22, marginBottom: 15 }}>
                        <Storefront sx={{ fontSize: 24, color: "#29ACE2" }} />{" "}
                        Hay {rows.length} proveedores a tu disposición:
                      </TitleTextPage>
                    </Grid>
                    {rows.map((row) => (
                      <Grid item xs={12} md={4} sx={{ p: 1 }}>
                        <Card
                          variant="outlined"
                          sx={{
                            position: "relative",
                            transition: "transform 0.2s ease-out",
                            "&:hover": {
                              transform: "scale(1.02)",
                            },
                            border: "1px solid #BDBEC0",
                            height: 320,
                          }}
                          key={row.id} // Asegúrate de usar una clave única
                        >
                          {/*<CardActionArea>*/}
                          <center>
                            <CardMedia
                              component="img"
                              style={{ width: 70 }}
                              image={logo}
                            />
                          </center>
                          <CardContent>
                            <Grid container>
                              <Grid item xs={12} sm={12}>
                                <TitleTextPage
                                  style={{
                                    fontSize: 13,
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {row.name}
                                </TitleTextPage>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                sx={{
                                  mt: 2,
                                }}
                              >
                                <ParagraphTextPage style={{ fontSize: 12 }}>
                                  <Box>
                                    <b>Línea: </b>{" "}
                                    {truncateText(row.mainProducts, 150)}
                                  </Box>
                                  <br></br>
                                  <Box
                                    sx={{
                                      width: "100%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      bottom: 0,
                                    }}
                                  >
                                    <b style={{ marginRight: 5 }}>
                                      Nivel de riesgo{" "}
                                    </b>
                                    {row.ranking === 0 || row.ranking <= 25 ? (
                                      <Alert
                                        severity="success"
                                        icon={<TaskAlt fontSize="small" />} // Cambia el tamaño del icono
                                        sx={{
                                          fontSize: 12,
                                          fontWeight: "bold",
                                        }}
                                      >
                                        BAJO
                                      </Alert>
                                    ) : row.ranking <= 50 ? (
                                      <Alert
                                        severity="warning"
                                        icon={<WarningAmber fontSize="small" />} // Cambia el tamaño del icono
                                        sx={{
                                          fontSize: 12,
                                          fontWeight: "bold",
                                        }}
                                      >
                                        MEDIO
                                      </Alert>
                                    ) : row.ranking > 50 ? (
                                      <Alert
                                        severity="error"
                                        icon={<ErrorOutline fontSize="small" />} // Cambia el tamaño del icono
                                        sx={{
                                          fontSize: 12,
                                          fontWeight: "bold",
                                        }}
                                      >
                                        ALTO
                                      </Alert>
                                    ) : null}
                                  </Box>
                                </ParagraphTextPage>
                              </Grid>
                            </Grid>
                          </CardContent>
                          {/*</CardActionArea>*/}
                        </Card>
                      </Grid>
                    ))}
                  </>
                ) : (
                  <Grid item xs={12} sm={12}>
                    <center>
                      <img
                        alt="loaderGif"
                        src={loaderGif}
                        style={{ width: 60, margin: "8% 0 1% 0" }}
                      />
                      <br></br>
                      <TitleTextPage style={{ fontSize: 12 }}>
                        Cargando...
                      </TitleTextPage>
                    </center>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{ display: notFound ? "none" : "block", float: "right" }}
        >
          <ButtonExit onClick={handleCloseDialog(true)}>Cerrar</ButtonExit>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
