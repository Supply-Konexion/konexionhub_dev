import React, { useEffect, useContext } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { useLocation, Navigate } from "react-router-dom";

// core components
import YouTube from "react-youtube";
import axios from "axios";
import {
  Apartment,
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
  VerticalShades,
  SelfImprovement,
  LocalMovies,
  SportsEsports,
  SportsSoccer,
  SportsTennis,
  DirectionsWalk,
  WifiPassword,
  SolarPower,
  Water,
  BusinessCenter,
  WhatsApp,
  ArrowRightAlt,
  Share,
  Search,
} from "@mui/icons-material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Alert,
  Box,
  Tab,
  List,
  ButtonBase,
  ImageListItem,
  Grid,
  ListItemText,
  ListItemAvatar,
  ListItem,
  Card,
  CardHeader,
  Fade,
  Menu,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import queryString from "query-string";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "components/Styles/sliderProject_styles.css";
// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";

// sections for this page/view
import MapPublic from "views/Maps/MapPublic.js";
import Footer from "components/Footer/Footer.js";
import loaderGif from "assets/img/loading.gif";

import {
  TitleTextPage,
  ParagraphTextPage,
  blackColor,
} from "components/cardBodyStyle";

import ViewImageProject from "views/Dialog/ViewImageProject";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

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

export default function SingleProjectPage(props) {
  const [value, setValue] = React.useState("1");
  const [loader, setLoader] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [return404, setReturn404] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const { urlServices, urlWeb } = useContext(UrlServicesContext);

  const location = useLocation();
  const params = queryString.parse(location.search);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchInfoAll = async () => {
      try {
        const response = await axios.get(
          `${urlServices}project-post/simplePage/slug/${params.page}`
        );

        if (response.status === 200) {
          const data = response.data.data;
          const transformedData = {
            ...data,
            images: parseJsonArray(data.images),
            headerImage: parseJsonArray(data.headerImage),
            services: parseJsonArray(data.services),
            planos: parseJsonArray(data.planos),
            ltLgLocation: JSON.parse(data.ltLgLocation),
          };

          console.log("entro:", transformedData);

          setRows(transformedData);
          setLoader(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setReturn404(true);
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchInfoAll();
    document.body.classList.add("index-page");
    // Cleanup function to remove the class
    return () => {
      document.body.classList.remove("index-page");
    };
  }, [params.page]);

  // Función para parsear cadenas JSON y asegurar que sean arrays
  const parseJsonArray = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return [];
    }
  };

  const opts = {
    height: "400",
    width: "570",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0, // 0 para desactivar el autoplay
    },
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleCopy = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (return404) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      {loader ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <center>
              <img
                alt="loaderGif"
                src={loaderGif}
                style={{ width: 60, margin: "300px 0 5px 0" }}
              />
              <TitleTextPage style={{ fontSize: 24 }}>
                Cargando datos del proyecto...
              </TitleTextPage>
            </center>
          </Grid>
        </Grid>
      ) : (
        <div className="wrapper">
          <div
            style={{
              position: "relative", // Establece posición relativa para el div contenedor
              width: "100%",
              height: 350,
              overflow: "hidden", // Para asegurarse de que la imagen no se desborde
            }}
          >
            <div
              style={{
                position: "absolute", // Establece posición absoluta para el div de superposición
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${urlServices}documents/images_project/${rows.headerImage[0].images})`, // Establece la imagen de fondo
                backgroundSize: "cover", // Ajusta la imagen de fondo para cubrir todo el div
                backgroundPosition: "center", // Centra la imagen de fondo
                zIndex: 0, // Asegúrate de que la imagen esté detrás de la superposición
              }}
            ></div>
            <div
              style={{
                position: "absolute", // Establece posición absoluta para el div de superposición
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.4)", // Fondo negro con transparencia
                zIndex: 1, // Asegúrate de que la superposición esté delante de la imagen
              }}
            ></div>
          </div>
          <Card
            sx={{
              width: 360,
              marginTop: "-70px",
              zIndex: "666",
              position: "absolute",
              marginLeft: 8,
            }}
          >
            <CardHeader
              avatar={
                <Apartment sx={{ width: 60, height: 60 }} aria-label="recipe" />
              }
              title={rows.constructora}
              titleTypographyProps={{ variant: "h6" }}
            />
          </Card>
          <div className="main">
            <Container style={{ padding: "70px 0", background: "#ffffff" }}>
              <div className="header-filter">
                <Row>
                  <Col
                    className="ml-auto mr-auto"
                    md="10"
                    xl="6"
                    style={{ padding: "40px 50px 0 0" }}
                  >
                    <TitleTextPage style={{ fontSize: 28 }}>
                      Proyecto{" "}
                      <span style={{ fontSize: 14, fontWeight: 600 }}>
                        (Descripción)
                      </span>
                    </TitleTextPage>
                    <br></br>
                    <br></br>
                    <ParagraphTextPage>{rows.description}</ParagraphTextPage>
                    <center>
                      <Button
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://wa.me/${rows.phone}`}
                        className="btn-round"
                        color="info"
                        size="lg"
                        style={{
                          marginTop: 40,
                          background: "rgb(16, 185, 129)",
                          color: "#ffffff",
                        }}
                      >
                        <b>
                          Contactar &nbsp;&nbsp;
                          <WhatsApp />
                        </b>
                      </Button>
                    </center>
                  </Col>
                  <Col
                    className="ml-auto mr-auto"
                    md="10"
                    xl="6"
                    style={{ paddingTop: 50 }}
                  >
                    <Button
                      className="btn-round"
                      color="info"
                      size="sm"
                      style={{
                        background: blackColor,
                        color: "#ffffff",
                        marginTop: "-100px",
                        float: "right",
                      }}
                      id="fade-button"
                      aria-controls={openMenu ? "fade-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenu ? "true" : undefined}
                      onClick={handleClick}
                    >
                      <b style={{ fontSize: 12 }}>
                        Compartir&nbsp;&nbsp; <Share />
                      </b>
                    </Button>
                    <Menu
                      id="fade-menu"
                      MenuListProps={{
                        "aria-labelledby": "fade-button",
                      }}
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleClose}
                      TransitionComponent={Fade}
                    >
                      <MenuItem
                        onClick={handleClose}
                        style={{
                          fontWeight: "bold",
                          padding: "5px 40px 5px 10px",
                        }}
                      >
                        <CopyToClipboard
                          text={`${urlWeb}project?page=${rows.slug}`}
                          onCopy={handleCopy}
                        >
                          <span
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <ArrowRightAlt />
                            &nbsp;Copiar link
                          </span>
                        </CopyToClipboard>
                      </MenuItem>

                      <MenuItem
                        onClick={handleClose}
                        style={{
                          padding: "5px 40px 5px 10px",
                        }}
                      >
                        <a
                          style={{ color: blackColor, fontWeight: "bold" }}
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`https://web.whatsapp.com/send?text=${encodeURIComponent(
                            `Hola, mira este proyecto ${urlWeb}project?page=${rows.slug}`
                          )}`}
                        >
                          <WhatsApp />
                          &nbsp;WhatsApp
                        </a>
                      </MenuItem>
                    </Menu>

                    <Box sx={{ width: "100%", typography: "body1" }}>
                      <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                          >
                            <Tab label="Galería de imágenes" value="1" />
                            {rows.linkYoutube !== "" && (
                              <Tab label="Video" value="2" />
                            )}
                          </TabList>
                        </Box>
                        <TabPanel value="1">
                          <Swiper
                            autoplay={{
                              delay: 5000,
                              disableOnInteraction: false,
                            }}
                            pagination={{
                              clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Navigation, Pagination]}
                            className="sliderProject"
                          >
                            {rows.images.map((image, i) => (
                              <SwiperSlide key={i}>
                                <ButtonBase
                                  focusRipple
                                  key={i}
                                  onClick={() => setOpen(true)}
                                >
                                  <ImageListItem key={i}>
                                    <img
                                      src={`${urlServices}documents/images_project/${image.images}`}
                                      alt={`imageSlider${i})`}
                                      loading="lazy"
                                      style={{
                                        width: 650,
                                        height: 340,
                                        objectFit: "cover",
                                      }}
                                    />
                                  </ImageListItem>
                                </ButtonBase>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                          <br></br>
                          <center>
                            <Button
                              onClick={() => setOpen(true)}
                              className="btn-round"
                              color="info"
                              size="sm"
                              style={{
                                background: blackColor,
                                color: "#ffffff",
                              }}
                            >
                              <b style={{ fontSize: 12 }}>
                                Ver imágenes &nbsp;&nbsp;
                                <Search />
                              </b>
                            </Button>
                          </center>
                        </TabPanel>
                        {rows.linkYoutube !== "" && (
                          <TabPanel value="2">
                            <YouTube videoId={rows.linkYoutube} opts={opts} />
                          </TabPanel>
                        )}
                      </TabContext>
                    </Box>
                  </Col>
                  <Col
                    className="ml-auto mr-auto"
                    md="12"
                    style={{ padding: "0px 50px 0 0" }}
                  >
                    <TitleTextPage style={{ fontSize: 28 }}>
                      Servicios y espacios
                    </TitleTextPage>
                    <br></br>
                    <br></br>
                    <Grid container>
                      {items
                        .filter((data) => rows.services.includes(data.id))
                        .map((item, i) => (
                          <Grid
                            key={i}
                            xs={6}
                            md={2}
                            item
                            sx={{
                              paddingTop: 1,
                              color: blackColor,
                            }}
                          >
                            <center>
                              {item.icon}
                              <div
                                style={{
                                  color: blackColor,
                                  fontSize: 10,
                                }}
                              >
                                {item.label}
                              </div>
                            </center>
                          </Grid>
                        ))}
                    </Grid>
                  </Col>
                  {rows.viewPlanos === 1 && (
                    <Col
                      className="ml-auto mr-auto"
                      md="12"
                      style={{ padding: "0 50px 0 0" }}
                    >
                      <TitleTextPage
                        style={{
                          fontSize: 28,
                          marginTop: 50,
                        }}
                      >
                        Unidades disponibles
                      </TitleTextPage>
                      <br></br>
                      <Box sx={{ width: "100%", typography: "body1" }}>
                        <TabContext value={value}>
                          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList
                              onChange={handleChange}
                              aria-label="lab API tabs example"
                            >
                              {rows.planos.map((_, i) => (
                                <Tab
                                  label={`Plano ${i + 1}`}
                                  value={`${i + 1}`}
                                />
                              ))}
                            </TabList>
                          </Box>
                          {rows.planos.map((data, i0) => (
                            <TabPanel value={`${i0 + 1}`} key={i0}>
                              <Grid
                                container
                                justifyContent="center"
                                spacing={4}
                              >
                                <Grid key={i0} md={5} item>
                                  <img
                                    src={`${urlServices}documents/images_project/${data.images}`}
                                    alt=""
                                    style={{ width: 350, height: 300 }}
                                  />
                                </Grid>
                                <Grid key={i0} md={7} item>
                                  <b
                                    style={{ color: blackColor, fontSize: 22 }}
                                  >
                                    {data.typeProperty.name} de {data.area} m2{" "}
                                    <span style={{ float: "right" }}>
                                      Precio: ${formatPrice(data.price)}
                                    </span>
                                  </b>
                                  <List dense={false}>
                                    <ListItem>
                                      <ListItemAvatar>
                                        <ArrowRightAlt
                                          sx={{ color: blackColor }}
                                        />
                                      </ListItemAvatar>
                                      <ListItemText
                                        primary={`Habitaciones ${data.rooms}`}
                                        // secondary="Secondary text"
                                        sx={{ color: blackColor }}
                                      />
                                    </ListItem>
                                    <ListItem>
                                      <ListItemAvatar>
                                        <ArrowRightAlt
                                          sx={{ color: blackColor }}
                                        />
                                      </ListItemAvatar>
                                      <ListItemText
                                        primary={`Baños ${data.bathrooms}${
                                          data.halfBathrooms !== 0 &&
                                          data.halfBathrooms !== ""
                                            ? ` - Medio baño ${data.halfBathrooms}`
                                            : ""
                                        }`}
                                        // secondary="Secondary text"
                                        sx={{ color: blackColor }}
                                      />
                                    </ListItem>
                                    <ListItem>
                                      <ListItemAvatar>
                                        <ArrowRightAlt
                                          sx={{ color: blackColor }}
                                        />
                                      </ListItemAvatar>
                                      <ListItemText
                                        primary={`Sala - Comedor - Cocina${
                                          data.livingRoom !== 0 &&
                                          data.livingRoom !== ""
                                            ? ` - Sala de estar ${data.livingRoom}`
                                            : ""
                                        }`}
                                        // secondary="Secondary text"
                                        sx={{ color: blackColor }}
                                      />
                                    </ListItem>
                                    <ListItem>
                                      <ListItemAvatar>
                                        <ArrowRightAlt
                                          sx={{ color: blackColor }}
                                        />
                                      </ListItemAvatar>
                                      <ListItemText
                                        primary={`Parqueadero ${data.parking}${
                                          data.serviceRoom !== 0 &&
                                          data.serviceRoom !== ""
                                            ? ` - Cuarto de servicio ${data.serviceRoom}`
                                            : ""
                                        }${
                                          data.warehouse !== 0 &&
                                          data.warehouse !== ""
                                            ? ` - Bodega ${data.warehouse}`
                                            : ""
                                        }`}
                                        // secondary="Secondary text"
                                        sx={{ color: blackColor }}
                                      />
                                    </ListItem>
                                  </List>
                                </Grid>
                              </Grid>
                            </TabPanel>
                          ))}
                        </TabContext>
                      </Box>
                    </Col>
                  )}
                </Row>
              </div>
            </Container>

            <Box sx={{ ml: 8 }}>
              <TitleTextPage
                style={{
                  fontSize: 28,
                }}
              >
                Ubicación
              </TitleTextPage>
              <ParagraphTextPage>
                {rows.cities.name} - {rows.countries.name}.{" "}
                {rows.descriptionLocation}
              </ParagraphTextPage>
            </Box>
            <br></br>
            {rows.viewLocation === 1 && (
              <MapPublic
                lt={rows.ltLgLocation.lt === 0 ? -2.0 : rows.ltLgLocation.lt}
                lg={rows.ltLgLocation.lg === 0 ? -77.5 : rows.ltLgLocation.lg}
                zoom={8}
              />
            )}
          </div>
          <Footer />
          {open && (
            <ViewImageProject
              open={open}
              images={rows.images}
              exit={handleOpenClose}
            />
          )}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              variant="filled"
            >
              Link copiado al portapapeles!
            </Alert>
          </Snackbar>
        </div>
      )}
    </>
  );
}
