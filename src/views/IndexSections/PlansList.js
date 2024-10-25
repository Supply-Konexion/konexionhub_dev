import React, { useState, useContext, useEffect } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@mui/styles";
// core components
import {
  CheckCircle,
  Verified,
  Close,
  Receipt,
  LocationOn,
  HomeWork,
  Loyalty,
} from "@mui/icons-material";
import axios from "axios";
import { Grid, CardActions, CardContent, Alert, Card } from "@mui/material";
// reactstrap components
import { Button } from "reactstrap";
//import Moment from "moment";

import loaderGif from "assets/img/loading.gif";

import {
  cardBodyStyle,
  TitleTextPage,
  ParagraphTextPage,
  blackColor,
  ButtonExit,
} from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function PlansList(props) {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [mensageSystem, setMensageSystem] = useState("");
  const [returnLogin, setReturnLogin] = React.useState(false);
  const [hideList, setHideList] = React.useState(false);
  const [selectPlanView, setSelectPlanView] = React.useState();
  const [successInsert, setSuccessInsert] = React.useState(false);

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  useEffect(() => {
    RefreshTable();
  }, []);

  const RefreshTable = () => {
    axios
      .get(`${urlServices}plans/listAll`, {
        headers: {
          Authorization: "Bearer " + keyAuthorization,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setRows(response.data);
          setLoader(false);
        }
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
          setRows([]);
          setMensageSystem("Error en la consulta con sel servidor.");
          setError(true);
        }
      });
  };

  const selectPlan = (data) => () => {
    let url = "";

    const imageMain = props.id.row.images.find(
      (image) => parseInt(image.main) === 1
    );

    if (imageMain) {
      // Obtener el nombre y la extensión de la imagen
      const [baseName, extension] = imageMain.images
        .split(".")
        .reduce(
          ([base, ext], part, index, arr) =>
            index === arr.length - 1
              ? [base, part]
              : [`${base}${base ? "." : ""}${part}`, ext],
          ["", ""]
        );

      // Construir el nuevo nombre de la imagen
      const newImageName = `${baseName}_600x400.${extension}`;
      url = `${urlServices}documents/images_properties/600x400/${newImageName}`;
    }

    // Obtener la fecha actual y calcular la fecha de fin
    //const startDate = Moment().format("YYYY-MM-DD");
    //const endDate = Moment().add(1, "month").format("YYYY-MM-DD"); // Un mes después

    const sendData = {
      publicationsId: props.id.row.id,
      plansId: data.id,
      userId: props.id.row.userId,
      // startDate: startDate,
      // endDate: endDate,
    };

    setHideList(true);
    setSelectPlanView([
      { ...data, image: url, valueSend: sendData, publications: props.id.row },
    ]);
  };

  const submitTransaction = () => () => {
    setLoader(true);

    axios
      .post(`${urlServices}publications-plans`, selectPlanView[0].valueSend, {
        headers: {
          Authorization: `Bearer ${keyAuthorization}`,
        },
      })
      .then((response) => {
        sendEmailData(response.data.publicationsPlans);
      })
      .catch((error) => handleTransactionError(error));
  };

  const handleTransactionError = (error) => {
    setLoader(false);
    const { status } = error.response || {};

    if (status === 401) {
      setMensageSystem("La sesión ha expirado, vuelva a iniciar sesión...");
      setError(true);
      setTimeout(() => {
        localStorage.clear();
        setReturnLogin(true);
      }, 4000);
    } else if (status === 500) {
      setMensageSystem("Error en la consulta con el servidor.");
      setError(true);
    } else {
      setMensageSystem("Ocurrió un error inesperado.");
      setError(true);
    }
  };

  const sendEmailData = (data) => {
    const values = {
      planName: selectPlanView[0].name,
      planPrice: selectPlanView[0].price,
      userId: data.userId,
      publicationsId: data.publicationsId,
    };

    axios
      .post(`${urlServices}users/sendtoemailadmin`, values, {
        headers: {
          Authorization: `Bearer ${keyAuthorization}`,
        },
      })
      .then((response) => {
        setSuccessInsert(true);
        props.callBackRefresh();
      })
      .catch((error) => handleEmailError(error))
      .finally(() => setLoader(false));
  };

  const handleEmailError = (error) => {
    setMensageSystem("Error en la consulta con el servidor.");
    setError(true);
  };

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        {error ? <Alert severity="error">{mensageSystem}</Alert> : ""}
        {loader ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <center>
                <img
                  alt="loaderGif"
                  src={loaderGif}
                  style={{ width: 60, margin: "20% 0" }}
                />
              </center>
            </Grid>
          </Grid>
        ) : successInsert ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <img
              src={selectPlanView[0].image}
              alt="image1"
              style={{
                width: 150,
                objectFit: "cover",
                marginBottom: 20,
                marginTop: 50,
                zIndex: 9999,
              }}
            />
            <ParagraphTextPage style={{ fontSize: 22 }}>
              ¡Confirmación enviada a un asesor!
            </ParagraphTextPage>
            <Alert severity="info" sx={{ fontSize: 14 }}>
              Un asesor se pondrá en contacto contigo a la brevedad. ¡Gracias
              por elegirnos!
            </Alert>
          </div>
        ) : (
          <Grid container>
            <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: 2 }}>
              <b className={classes.cardTitleBlack} style={{ fontSize: 18 }}>
                Selecciona el plan con el que quieres publicar
              </b>
              <ParagraphTextPage style={{ fontSize: 14, margin: "5px 0" }}>
                Para publicar el inmueble debe seleccionar un plan o puede
                guardar y seleccionarlo luego.
              </ParagraphTextPage>
            </Grid>
            {hideList ? (
              <Grid item xs={12} sm={12} md={12}>
                <Grid container>
                  <Grid item xs={12} sm={6} md={6} sx={{ marginBottom: 2 }}>
                    <TitleTextPage style={{ fontSize: 22, marginTop: 40 }}>
                      Publicación
                    </TitleTextPage>
                    <center>
                      <img
                        src={selectPlanView[0].image}
                        alt="foto1"
                        style={{ width: 300, margin: "30px 0" }}
                      />
                      <Grid container>
                        <Grid item xs={4} sm={4}>
                          <Loyalty
                            sx={{
                              fontSize: 12,
                              color: "#1d1d1b",
                            }}
                          />{" "}
                          <b style={{ fontSize: 10 }}>
                            {selectPlanView[0].publications.typeOperation?.name}
                          </b>
                        </Grid>
                        <Grid item xs={4} sm={4}>
                          <HomeWork
                            sx={{
                              fontSize: 12,
                              marginRight: 1,
                              color: "#1d1d1b",
                            }}
                          />
                          <b style={{ fontSize: 10 }}>
                            {selectPlanView[0].publications.typeProperty?.name}
                          </b>
                        </Grid>
                        <Grid item xs={4} sm={4}>
                          <LocationOn
                            sx={{
                              fontSize: 12,
                              color: "#1d1d1b",
                            }}
                          />{" "}
                          <b style={{ fontSize: 10 }}>
                            {selectPlanView[0].publications.cities?.name}
                          </b>
                        </Grid>
                      </Grid>
                    </center>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} sx={{ marginBottom: 2 }}>
                    <Card
                      sx={{
                        maxWidth: 345,
                        background: "rgb(249, 250, 251)",
                        height: 380,
                        margin: "2px 0",
                        paddingBottom: 50,
                      }}
                    >
                      <CardContent style={{ textAlign: "left" }}>
                        <TitleTextPage style={{ fontSize: 24 }}>
                          <Receipt sx={{ fontSize: 26 }} /> Confirmar
                          transacción
                        </TitleTextPage>
                        <ParagraphTextPage
                          style={{ fontSize: 14, margin: "40px 0" }}
                        >
                          Plan seleccionado:
                        </ParagraphTextPage>
                        <TitleTextPage style={{ fontSize: 22 }}>
                          {selectPlanView[0].name}
                          <span style={{ float: "right" }}>
                            ${selectPlanView[0].price}
                          </span>
                        </TitleTextPage>
                        <Alert severity="info">
                          Una vez que confirmes la transacción, un asesor se
                          pondrá en contacto contigo.
                        </Alert>
                        <div style={{ marginTop: 50, width: "100%" }}>
                          <center>
                            <ButtonExit
                              startIcon={<Close />}
                              onClick={() => setHideList(false)}
                            >
                              Regresar
                            </ButtonExit>
                            <Button
                              className="btn-round"
                              color="info"
                              size="small"
                              style={{
                                background: "#000000",
                                color: "#ffffff",
                                letterSpacing: ".011em",
                                fontFamily: "sans-serif",
                              }}
                              onClick={submitTransaction()}
                            >
                              <b>Confirmar</b>
                            </Button>
                          </center>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              rows
                .filter((plan) => plan.status === 1)
                .map((data) => (
                  <>
                    <Grid item xs={12} md={4} sx={{ padding: 1 }}>
                      <center>
                        <Card
                          sx={{
                            maxWidth: 345,
                            background: "rgb(249, 250, 251)",
                            height: 380,
                            margin: "2px 0",
                            paddingBottom: 50,
                          }}
                        >
                          <CardContent style={{ textAlign: "left" }}>
                            <TitleTextPage style={{ fontSize: 22 }}>
                              {data.name}
                              <span style={{ float: "right" }}>
                                {" "}
                                ${data.price}
                              </span>
                            </TitleTextPage>
                            {data.itemsPlan.map((dataItems) => (
                              <>
                                <ParagraphTextPage
                                  style={{ fontSize: 12, margin: "10px 0" }}
                                >
                                  <CheckCircle
                                    sx={{
                                      color: "rgb(16, 185, 129)",
                                      fontSize: 22,
                                    }}
                                  />{" "}
                                  {dataItems.name}
                                </ParagraphTextPage>
                              </>
                            ))}
                            {data.highlight === 1 ? (
                              <Grid item xs={12} md={12}>
                                <center>
                                  <ParagraphTextPage
                                    style={{ fontSize: 16, margin: "15px 0" }}
                                  >
                                    <Verified sx={{ color: blackColor }} />
                                    &nbsp;&nbsp; El más elegido por los clientes
                                  </ParagraphTextPage>
                                </center>
                              </Grid>
                            ) : (
                              ""
                            )}
                          </CardContent>
                          <CardActions>
                            <Grid container>
                              <Grid item xs={12} md={12}>
                                <center>
                                  <Button
                                    className="btn-round"
                                    color="info"
                                    size="small"
                                    style={{
                                      background: "#000000",
                                      color: "#ffffff",
                                      letterSpacing: ".011em",
                                      fontFamily: "sans-serif",
                                    }}
                                    onClick={selectPlan(data)}
                                  >
                                    <b>Elegir</b>
                                  </Button>
                                </center>
                              </Grid>
                            </Grid>
                          </CardActions>
                        </Card>
                      </center>
                    </Grid>
                  </>
                ))
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
