import React, { Fragment, useContext } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";

import { makeStyles } from "@mui/styles";
import {
  Grid,
  DialogActions,
  DialogContent,
  Dialog,
  Box,
  Alert,
  List,
  ListItem,
} from "@mui/material";
import {
  WhatsApp,
  Videocam,
  GasMeter,
  Campaign,
  Deck,
  EnergySavingsLeaf,
  FitnessCenter,
  LocalFlorist,
  HotTub,
  InvertColors,
  LineStyle,
  OutdoorGrill,
  Pets,
  Pool,
  RunCircle,
  Security,
  SettingsRemote,
  SolarPower,
  VerticalShades,
  WifiPassword,
  DirectionsWalk,
  SportsTennis,
  SportsSoccer,
  SportsEsports,
  LocalMovies,
  SelfImprovement,
  Water,
  BusinessCenter,
} from "@mui/icons-material";
// reactstrap components
import { Button } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "components/Styles/sliderProject_styles.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import {
  cardBodyStyle,
  TitleTextPage,
  ParagraphTextPage,
} from "components/cardBodyStyle";

const items = [
  { id: 1, icon: <Videocam />, label: "Seguridad" },
  { id: 2, icon: <GasMeter />, label: "Gas directo" },
  { id: 3, icon: <Campaign />, label: "Alarmas" },
  { id: 4, icon: <Deck />, label: "Área comunal" },
  { id: 5, icon: <EnergySavingsLeaf />, label: "Energía renovable" },
  { id: 6, icon: <FitnessCenter />, label: "Gimnasio" },
  { id: 7, icon: <LocalFlorist />, label: "Área verdes" },
  { id: 8, icon: <HotTub />, label: "Jacuzzi" },
  { id: 9, icon: <InvertColors />, label: "Agua fría y caliente" },
  { id: 10, icon: <LineStyle />, label: "Acabados de lujo" },
  { id: 11, icon: <OutdoorGrill />, label: "BBQ patio" },
  { id: 12, icon: <Pets />, label: "Pet friendly" },
  { id: 13, icon: <Pool />, label: "Piscina" },
  { id: 14, icon: <RunCircle />, label: "Salidas de emergencias" },
  { id: 15, icon: <Security />, label: "Guardia de seguridad" },
  { id: 16, icon: <SettingsRemote />, label: "Accesos remotos" },
  { id: 17, icon: <SolarPower />, label: "Paneles solares" },
  { id: 18, icon: <VerticalShades />, label: "Ascensores" },
  { id: 19, icon: <WifiPassword />, label: "Acceso a internet" },
  { id: 20, icon: <DirectionsWalk />, label: "Caminerías" },
  { id: 21, icon: <SportsTennis />, label: "Canchas de raquetas" },
  { id: 22, icon: <SportsSoccer />, label: "Canchas de futbol" },
  { id: 23, icon: <SportsEsports />, label: "Salon de juegos" },
  { id: 24, icon: <LocalMovies />, label: "Sala de cines" },
  { id: 25, icon: <SelfImprovement />, label: "Spa room" },
  { id: 26, icon: <Water />, label: "Lagos" },
  { id: 27, icon: <BusinessCenter />, label: "Coworking" },
];

const useStyles = makeStyles(cardBodyStyle);

export default function ViewRealEstateSingle(props) {
  const classes = useStyles();

  const { urlServices } = useContext(UrlServicesContext);

  const handleCloseDialog = (pro) => (event) => {
    props.exit();
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <Fragment>
      <Dialog
        fullWidth
        maxWidth="lg"
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
              <Grid item xs={12} sm={6}>
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="sliderProject"
                >
                  {props.id.row.images.map((data) => {
                    let urlImg = "";
                    // Obtener el nombre y la extensión de la imagen
                    const [baseName, extension] = data.images
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
                    urlImg = `${urlServices}documents/images_properties/600x400/${newImageName}`;
                    return (
                      <SwiperSlide>
                        <img
                          src={urlImg}
                          alt=""
                          style={{
                            objectFit: "cover",
                            width: 550,
                            height: 380,
                          }}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                <TitleTextPage style={{ fontSize: 16, marginTop: 15 }}>
                  Ubicación
                </TitleTextPage>
                <ParagraphTextPage style={{ fontSize: 14 }}>
                  {props.id.row.descriptionLocation}
                </ParagraphTextPage>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box component="div" sx={{ paddingLeft: 3 }}>
                  <Box
                    component="span"
                    sx={{ float: "right", marginTop: "-15px" }}
                  >
                    {!props.id.row.public ? (
                      <>
                        {props.id.row.status === 0 ||
                        props.id.row.status === 99 ||
                        props.id.row.status === 3 ? (
                          <Alert severity="error">
                            <b style={{ fontSize: 10 }}>PUBLICACIÓN INACTIVA</b>
                          </Alert>
                        ) : (
                          <Alert severity="success">
                            <b style={{ fontSize: 10 }}>PUBLICACIÓN ACTIVA</b>
                          </Alert>
                        )}
                      </>
                    ) : (
                      <Button
                        className="btn-round"
                        color="info"
                        size="sm"
                        style={{
                          background: "rgb(16, 185, 129)",
                          color: "#ffffff",
                          letterSpacing: ".011em",
                          fontFamily: "sans-serif",
                        }}
                        href={`https://wa.me/${props.id.user.phone}`}
                        target="_blank"
                      >
                        Contactar &nbsp;&nbsp;
                        <WhatsApp />
                      </Button>
                    )}
                  </Box>
                  <TitleTextPage
                    style={{ fontSize: 20, marginTop: 10, marginBottom: 25 }}
                  >
                    {props.id.row.typeProperty?.name}&nbsp;&nbsp;{" "}
                    {formatPrice(props.id.row.price)}{" "}
                    <span style={{ fontSize: 14 }}>USD</span>{" "}
                    <div className={classes.lineBottom}></div>
                  </TitleTextPage>
                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={3}>
                      <ParagraphTextPage
                        style={{ fontSize: 16, textAlign: "center" }}
                      >
                        <TitleTextPage style={{ fontSize: 12 }}>
                          Ciudad:
                        </TitleTextPage>{" "}
                        {props.id.row.cities?.name}
                      </ParagraphTextPage>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <ParagraphTextPage
                        style={{ fontSize: 16, textAlign: "center" }}
                      >
                        <TitleTextPage style={{ fontSize: 12 }}>
                          Área:
                        </TitleTextPage>{" "}
                        {props.id.row.details[0].area} m2
                      </ParagraphTextPage>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <ParagraphTextPage
                        style={{ fontSize: 16, textAlign: "center" }}
                      >
                        <TitleTextPage style={{ fontSize: 12 }}>
                          Antiguedad:
                        </TitleTextPage>{" "}
                        {props.id.row.details[0].age} años
                      </ParagraphTextPage>
                    </Grid>
                    {(props.id.row.details[0].alicuota !== 0 ||
                      props.id.row.details[0].alicuota !== "") && (
                      <Grid item xs={6} sm={3}>
                        <ParagraphTextPage
                          style={{ fontSize: 16, textAlign: "center" }}
                        >
                          <TitleTextPage style={{ fontSize: 12 }}>
                            Alícuota:
                          </TitleTextPage>{" "}
                          {formatPrice(props.id.row.details[0].alicuota)} USD
                        </ParagraphTextPage>
                      </Grid>
                    )}
                  </Grid>
                  <TitleTextPage style={{ fontSize: 16, marginTop: 10 }}>
                    Caracteristicas
                  </TitleTextPage>
                  <Grid container>
                    <Grid item xs={6} sm={3}>
                      <List dense={false}>
                        <ListItem sx={{ textAlign: "center" }}>
                          <ParagraphTextPage style={{ fontSize: 12 }}>
                            <b style={{ fontSize: 14 }}>
                              {props.id.row.details[0].bathrooms}
                            </b>
                            <br></br>Baños
                          </ParagraphTextPage>
                        </ListItem>
                        <ListItem sx={{ textAlign: "center" }}>
                          <ParagraphTextPage style={{ fontSize: 12 }}>
                            <b style={{ fontSize: 14 }}>
                              {props.id.row.details[0].rooms}
                            </b>
                            <br></br>Cuartos
                          </ParagraphTextPage>
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <List dense={false}>
                        <ListItem sx={{ textAlign: "center" }}>
                          <ParagraphTextPage style={{ fontSize: 12 }}>
                            <b style={{ fontSize: 14 }}>1</b>
                            <br></br>Sala
                          </ParagraphTextPage>
                        </ListItem>
                        <ListItem sx={{ textAlign: "center" }}>
                          <ParagraphTextPage style={{ fontSize: 12 }}>
                            <b style={{ fontSize: 14 }}>1</b>
                            <br></br>Cocina
                          </ParagraphTextPage>
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <List dense={false}>
                        <ListItem sx={{ textAlign: "center" }}>
                          <ParagraphTextPage style={{ fontSize: 12 }}>
                            <b style={{ fontSize: 14 }}>
                              {props.id.row.details[0].livingRoom}
                            </b>
                            <br></br>Sala de estar
                          </ParagraphTextPage>
                        </ListItem>
                        <ListItem sx={{ textAlign: "center" }}>
                          <ParagraphTextPage style={{ fontSize: 12 }}>
                            <b style={{ fontSize: 14 }}>
                              {props.id.row.details[0].serviceRoom}
                            </b>
                            <br></br>Cuarto servicio
                          </ParagraphTextPage>
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <List dense={false}>
                        <ListItem sx={{ textAlign: "center" }}>
                          <ParagraphTextPage style={{ fontSize: 12 }}>
                            <b style={{ fontSize: 14 }}>
                              {props.id.row.details[0].parking}
                            </b>
                            <br></br>Estacionamiento
                          </ParagraphTextPage>
                        </ListItem>
                        <ListItem sx={{ textAlign: "center" }}>
                          <ParagraphTextPage style={{ fontSize: 12 }}>
                            <b style={{ fontSize: 14 }}>
                              {props.id.row.details[0].warehouse}
                            </b>
                            <br></br>Bodega
                          </ParagraphTextPage>
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                  <TitleTextPage
                    style={{ fontSize: 16, marginTop: 1, marginBottom: 10 }}
                  >
                    Descripción
                  </TitleTextPage>
                  <Grid container>
                    <Grid xs={12} md={12} item>
                      <ParagraphTextPage style={{ fontSize: 14 }}>
                        {props.id.row.description}
                      </ParagraphTextPage>
                    </Grid>
                  </Grid>
                  <TitleTextPage
                    style={{ fontSize: 16, marginTop: 8, marginBottom: 10 }}
                  >
                    Servicios
                  </TitleTextPage>
                  <Grid container spacing={1}>
                    {items.map((item) => {
                      let viewService = props.id.row.services.includes(item.id);
                      return (
                        <>
                          {viewService && (
                            <Grid key={item.id} xs={6} md={2} item>
                              <center>
                                {item.icon}
                                <div
                                  style={{
                                    color: "#000",
                                    fontSize: 10,
                                  }}
                                >
                                  {item.label}
                                </div>
                              </center>
                            </Grid>
                          )}
                        </>
                      );
                    })}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Fragment>
        </DialogContent>
        <DialogActions>
          <Button
            className="btn-round"
            color="info"
            size="md"
            style={{
              background: "#000000",
              color: "#ffffff",
              letterSpacing: ".011em",
              fontFamily: "sans-serif",
              fontSize: 12,
              padding: "5px 20px",
            }}
            onClick={handleCloseDialog(true)}
          >
            Salir
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
