import React, { useEffect } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";

// core components
import { Box, TextField, Grid, Skeleton } from "@mui/material";
import axios from "axios";
import { Home } from "@mui/icons-material";
// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";

// sections for this page/view
import PlansListPage from "views/IndexSections/PlansListPage.js";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";

import {
  TitleTextPage,
  ParagraphTextPage,
  blackColor,
} from "components/cardBodyStyle";

export default function SingleInformationPage(props) {
  const [signUp, setSignUp] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [openLoader, setOpenLoader] = React.useState(true);

  const { urlServices } = React.useContext(UrlServicesContext);

  useEffect(() => {
    fetchData();
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  const fetchData = async () => {
    const valueData = {
      values: [1, 2, 3],
    };

    try {
      const response = await axios.post(
        `${urlServices}post-templates/sections/pages`,
        valueData
      );

      const transformedRows = response.data.map((data) => ({
        ...data,
        images: parseJsonArray(data.images),
        buttons: parseJsonArray(data.buttons),
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

  const returnSignUpClose = (data) => {
    setSignUp(data);
  };

  return (
    <>
      <IndexNavbar signUp={signUp} signUpClose={returnSignUpClose} />
      <div className="wrapper">
        <div
          className="section section-tabs"
          style={{
            background:
              "linear-gradient(#ccc, #ffffff, #ffffff, #ffffff, #ffffff, #ffffff ,#ffffff)",
            paddingTop: 160,
          }}
        >
          {openLoader ? (
            <Container style={{ background: "#FFFFFF" }}>
              <div className="header-filter">
                <Row>
                  <Col className="ml-auto mr-auto" md="12" xl="5">
                    <center>
                      <Skeleton
                        variant="circular"
                        width={250}
                        height={250}
                        animation="wave"
                        sx={{ mt: 10 }}
                      />
                    </center>
                  </Col>
                  <Col
                    className="ml-auto mr-auto"
                    md="12"
                    xl="7"
                    style={{ padding: "40px 0 40px 40px" }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width={550}
                      height={350}
                      animation="wave"
                    />
                  </Col>
                </Row>
              </div>
            </Container>
          ) : (
            <>
              <Container
                style={{ padding: "40px 40px 40px 40px", marginBottom: 130 }}
              >
                <Row>
                  <Col className="ml-auto mr-auto" md="5" xs="12">
                    <center>
                      <img
                        src={`${urlServices}documents/images_templates/${rows[0].images[0].images}`}
                        alt="inm"
                        style={{ height: 250, marginTop: 15 }}
                      />
                    </center>
                  </Col>
                  <Col
                    className="ml-auto mr-auto"
                    md="7"
                    xs="12"
                    style={{ paddingTop: 30 }}
                  >
                    <TitleTextPage style={{ marginBottom: 20 }}>
                      {rows[0].textMain}
                    </TitleTextPage>
                    <ParagraphTextPage>
                      {rows[0].textSecondary}
                    </ParagraphTextPage>
                  </Col>
                </Row>
              </Container>

              <Grid container>
                <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      background: "peachpuff",
                      py: 8,
                      px: 3,
                    }}
                  >
                    <Box
                      component="form"
                      // onSubmit={handleSubmit}
                      sx={{ maxWidth: 400 }}
                    >
                      <TitleTextPage>{rows[1].textMain}</TitleTextPage>
                      <ParagraphTextPage>
                        {rows[1].textSecondary}
                      </ParagraphTextPage>
                      <Row>
                        <Col className="ml-auto mr-auto" md="7" xs="12">
                          <TextField
                            label="Correo electrónico"
                            placeholder="Correo electrónico"
                            variant="outlined"
                            sx={{ width: "100%", mt: 3, mb: 2 }}
                            // value={searchText}
                            // onChange={handleSearchChange}
                            autoComplete="off"
                          />
                        </Col>
                        <Col className="ml-auto mr-auto" md="5" xs="12">
                          <TextField
                            label="Teléfono celular"
                            placeholder="Teléfono celular"
                            variant="outlined"
                            sx={{ width: "100%", mt: 3, mb: 2 }}
                            autoComplete="off"
                          />
                        </Col>
                        <Col className="ml-auto mr-auto" md="12" xs="12">
                          <TextField
                            label="Asunto"
                            variant="outlined"
                            placeholder="Asunto"
                            sx={{ width: "100%", mb: 2 }}
                            autoComplete="off"
                          />
                        </Col>
                      </Row>
                      <center>
                        <Button
                          //href="/information"
                          className="btn-round"
                          color="info"
                          size="lg"
                          style={{
                            background: "#000000",
                            color: "#ffffff",
                            letterSpacing: ".011em",
                            fontFamily: "sans-serif",
                          }}
                        >
                          <b>Enviar</b>
                        </Button>
                      </center>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: { md: "block", xs: "none" },
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: -67,
                      left: -67,
                      right: 0,
                      bottom: 0,
                      width: "100%",
                    }}
                  />
                  <Box
                    component="img"
                    src={`${urlServices}documents/images_templates/${rows[1].images[0].images}`}
                    alt="call to action"
                    sx={{
                      position: "absolute",
                      top: -28,
                      left: -28,
                      right: 0,
                      bottom: 0,
                      width: 700,
                      //maxWidth: 600,
                    }}
                  />
                </Grid>
              </Grid>
              {rows[2].status === 1 && (
                <Container
                  style={{
                    padding: "100px 0 100px 0",
                    width: "100%",
                  }}
                >
                  <TitleTextPage style={{ textAlign: "center" }}>
                    {rows[2].textMain}
                  </TitleTextPage>
                  <br></br>
                  <br></br>
                  <Grid container>
                    <Grid item xs={12} md={12}>
                      {<PlansListPage />}
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <center>
                        <Button
                          href="/"
                          className="btn-round"
                          color="info"
                          size="lg"
                          style={{
                            marginTop: 40,
                            marginLeft: 10,
                            background: blackColor,
                            color: "#ffffff",
                            letterSpacing: ".011em",
                            fontFamily: "sans-serif",
                          }}
                        >
                          <b>
                            Ir al inicio &nbsp;&nbsp;
                            <Home />
                          </b>
                        </Button>
                      </center>
                    </Grid>
                  </Grid>
                </Container>
              )}
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
