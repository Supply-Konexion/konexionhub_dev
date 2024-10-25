import React, { useEffect } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";

import { makeStyles } from "@mui/styles";
import { Grid, Card, FormControl, Box, Skeleton } from "@mui/material";
import { Cancel } from "@mui/icons-material";
// reactstrap components
import { Container, Row, Col } from "reactstrap";
import axios from "axios";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import Paginator from "views/IndexSections/PaginatorProjects";
import LoadStates from "components/Services/LoadStates";
import LoadCities from "components/Services/LoadCities";

import backgroundImge from "assets/img/projects.jpg";

import {
  cardBodyStyle,
  TitleTextPage,
  ParagraphTextPage,
} from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function SingleProjectPage() {
  const classes = useStyles();

  const [rows, setRows] = React.useState([]);
  const [openLoader, setOpenLoader] = React.useState(true);
  const [signUp, setSignUp] = React.useState(false);

  const { urlServices } = React.useContext(UrlServicesContext);

  const [values, setValues] = React.useState({
    states: "",
    statesData: "",
    city: "",
    cityData: "",
    disabledCity: true,
  });

  // Filtrar propiedades según los filtros seleccionados
  const filteredProperties = rows.filter((property) => {
    return (
      (values.states === "" || property.statesId === values.states) &&
      (values.city === "" || property.cityId === values.city)
    );
  });

  useEffect(() => {
    fetchData();
    document.body.classList.toggle("index-page");
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${urlServices}project-post/list/page`);

      const transformedRows = response.data.map((data) => ({
        ...data,
        images: parseJsonArray(data.images),
        headerImage: parseJsonArray(data.headerImage),
        services: parseJsonArray(data.services),
        planos: parseJsonArray(data.planos),
        ltLgLocation: JSON.parse(data.ltLgLocation),
      }));

      setRows(transformedRows);
      setOpenLoader(false);
    } catch (error) {
      setOpenLoader(false);
    }
  };

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

  const changeStates = (data) => {
    setValues({
      ...values,
      states: data !== null ? data.id : "",
      statesData: data !== null ? data : "",
      city: "",
      cityData: "",
      disabledCity: data !== null ? false : true,
    });
  };

  const cancelStatesChange = () => {
    setValues({
      ...values,
      states: "",
      statesData: "",
      city: "",
      cityData: "",
      disabledCity: true,
    });
  };

  const changeCity = (data) => {
    window.scrollTo({ top: 450, behavior: "smooth" });

    setValues({
      ...values,
      city: data !== null ? data.id : "",
      cityData: data !== null ? data : "",
    });
  };

  const cancelCityChange = () => {
    setValues({
      ...values,
      city: "",
      cityData: "",
    });
  };

  const returnSignUpClose = (data) => {
    setSignUp(data);
  };

  return (
    <>
      <IndexNavbar signUp={signUp} signUpClose={returnSignUpClose} />
      <div className="wrapper">
        <div
          style={{
            marginTop: 120,
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
              backgroundImage: `url(${backgroundImge})`, // Establece la imagen de fondo
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
            width: 350,
            marginTop: "-230px",
            zIndex: "666",
            position: "absolute",
            marginLeft: 8,
            padding: "10px 20px",
            background: "rgba(255, 255, 255, 0.85)",
          }}
        >
          <TitleTextPage
            style={{
              fontSize: 18,
            }}
          >
            Proyectos por ciudad
          </TitleTextPage>
          {/* Filtro por ciudad */}
          <FormControl fullWidth size="small" sx={{ m: "3px 0" }}>
            <LoadStates
              value={values.statesData}
              refresh={changeStates}
              idCountries={45}
            />
            {values.states !== "" ? (
              <div
                style={{ textAlign: "right", cursor: "pointer" }}
                onClick={cancelStatesChange}
              >
                <Cancel sx={{ fontSize: 16, color: "red" }} />{" "}
                <span style={{ color: "red", fontSize: 10 }}>
                  Eliminar selección
                </span>
              </div>
            ) : (
              ""
            )}
          </FormControl>
          {/* Filtro por Transacción */}
          <FormControl fullWidth size="small" sx={{ m: "3px 0" }}>
            <LoadCities
              value={values.cityData}
              refresh={changeCity}
              disabled={values.disabledCity}
              idStates={values.states}
            />
            {values.city !== "" ? (
              <div
                style={{ textAlign: "right", cursor: "pointer" }}
                onClick={cancelCityChange}
              >
                <Cancel sx={{ fontSize: 16, color: "red" }} />{" "}
                <span style={{ color: "red", fontSize: 10 }}>
                  Eliminar selección
                </span>
              </div>
            ) : (
              ""
            )}
          </FormControl>
        </Card>
        <div className="main">
          <Container style={{ marginTop: 90, marginBottom: 60 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Box sx={{ marginBottom: 5, textAlign: "center" }}>
                  <TitleTextPage
                    style={{
                      fontSize: 32,
                    }}
                  >
                    Proyectos de tus sueños
                    <center>
                      <div className={classes.lineBottom}></div>
                    </center>
                  </TitleTextPage>
                  <br></br>
                  <ParagraphTextPage>
                    En planos, en construcción o en venta
                  </ParagraphTextPage>
                </Box>
                {openLoader ? (
                  <div className="header-filter">
                    <Row>
                      {[...Array(8)].map((_, idx) => (
                        <Col
                          key={idx}
                          className="ml-auto mr-auto"
                          md="12"
                          xl="3"
                          style={{ marginTop: 30 }}
                        >
                          <Skeleton
                            variant="rectangular"
                            height={150}
                            animation="wave"
                          />
                          <Skeleton
                            variant="rectangular"
                            height={15}
                            animation="wave"
                            sx={{ mt: 1 }}
                          />
                          <Skeleton
                            variant="rectangular"
                            height={15}
                            animation="wave"
                            sx={{ mt: 1 }}
                          />
                        </Col>
                      ))}
                    </Row>
                  </div>
                ) : (
                  <Paginator properties={filteredProperties} />
                )}
              </Grid>
            </Grid>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}
