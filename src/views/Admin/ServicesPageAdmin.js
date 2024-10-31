import React, { useState } from "react";
import { Navigate } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@mui/styles";

import { ArrowRightAlt, ArrowBackIosNew } from "@mui/icons-material";
import { Grid, Divider, Button, Box } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import banner from "assets/img/ModeloBannerPlataforma.jpeg";
import loading from "assets/img/loader.jpg";
import img1 from "assets/img/s-1.jpeg";
import img2 from "assets/img/s-2.jpeg";
import img3 from "assets/img/s-3.jpeg";
import img4 from "assets/img/s-4.jpeg";
import img5 from "assets/img/s-5.jpeg";

import {
  blackColor,
  cardBodyStyle,
  purpleColor,
  ParagraphTextPage,
  TitleTextPage,
  ButtonStyle0,
} from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

const banners = [
  img1, // Reemplaza con la ruta de tus imágenes
  img2,
  img3,
  img4,
  img5,
];

export default function ServicesPageAdmin() {
  const classes = useStyles();

  const [GoBack, setGoBack] = useState(false);

  const [currentBanner, setCurrentBanner] = useState(banners[0]);
  const [zoomed, setZoomed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // Índice del botón activo
  const [hovered, setHovered] = useState(false);
  const [viewToGo, setViewToGo] = useState(false);
  const [ColorToGo, setColorToGo] = useState(purpleColor);

  const [url, setUrl] = useState("supplier-customer");

  const handleButtonClick = (index) => {
    setCurrentBanner(banners[index]);
    setActiveIndex(index); // Actualiza el índice activo
    setZoomed(true);

    const urls = [
      "supplier-customer",
      "cost-optimization",
      "negotiation-purchasing",
      "product-quality",
      "logistics-management",
    ];

    const color = [purpleColor, "#0084B6", "#646567", "#29ACE2", "#000000"];

    const toUrl = urls[index] || ""; // Obtiene la URL correspondiente
    const toColor = color[index] || ""; // Obtiene la URL correspondiente

    setTimeout(() => setZoomed(false), 500);

    window.scrollTo({
      top: document.getElementById("banner-container").offsetTop,
      behavior: "smooth",
    });

    setColorToGo(toColor);
    setUrl(toUrl);
  };

  const viewServices = () => () => {
    setViewToGo(true);
  };

  const goBack = () => () => {
    setGoBack(true);
  };

  if (viewToGo) {
    localStorage.setItem("controllerRouter", `/account/${url}`);
    return <Navigate to={`/account/${url}`} />;
  }

  if (GoBack) {
    localStorage.setItem("controllerRouter", `/account/dashboard-customer`);
    return <Navigate to={`/account/dashboard-customer`} />;
  }

  return (
    <div className={classes.carDashboard}>
      <Grid
        container
        sx={{
          p: "2% 0 3% 0",
        }}
      >
        <Grid item xs={12} sm={12}>
          <Box
            onClick={goBack()}
            sx={{
              color: blackColor,
              fontSize: 14,
              mb: "4%",
              cursor: "pointer",
              width: 90,
            }}
          >
            <ArrowBackIosNew sx={{ fontSize: 22 }} /> Atrás
          </Box>
        </Grid>
        <Grid item xs={12} sm={12}>
          <center>
            <LazyLoadImage
              effect="blur"
              alt="banner"
              src={banner}
              placeholderSrc={loading}
              width="100%"
              style={{ borderRadius: 20, width: "85%" }}
            />
          </center>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Divider sx={{ p: "5% 3%" }}>
            <TitleTextPage
              sx={{
                padding: "7px 15px",
                background: "#0084B6",
                fontWeight: "bold",
                color: "#ffffff",
                borderRadius: 5,
                fontSize: 12,
                width: 180,
              }}
            >
              Seleccionar servicio
            </TitleTextPage>
          </Divider>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ p: "2% 3%" }}>
          {banners.map((_, index) => (
            <Grid item xs={12} key={index} sx={{ mb: 1 }}>
              {" "}
              {/* Añade margen abajo para separar los botones */}
              <Button
                onClick={() => handleButtonClick(index)}
                sx={{
                  borderRadius: 2,
                  color: activeIndex === index ? "#0084B6" : "#646567",
                  textTransform: "none",
                  border:
                    activeIndex === index
                      ? "1px solid #0084B6"
                      : "1px solid #ffffff",
                  "&:hover": {
                    border: "1px solid #0084B6",
                    color: "#0084B6",
                  },
                  width: "100%", // Para que el botón ocupe todo el ancho
                  justifyContent: "flex-start", // Alinear contenido a la izquierda
                  textAlign: "left", // Alinear el texto a la izquierda
                }}
              >
                <ParagraphTextPage style={{ fontSize: 16 }}>
                  <b>{index + 1}.</b>{" "}
                  {
                    [
                      "Calificacion proveedores/clientes",
                      "Optimizacion de costos",
                      "Negociacion y compras",
                      "Verificacion de calidad de productos",
                      "Gestion logistica",
                    ][index]
                  }
                </ParagraphTextPage>
              </Button>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} sm={6} id="banner-container">
          <center>
              <LazyLoadImage
              effect="blur"
              alt={`banner-${ColorToGo}`}
              src={currentBanner}
              placeholderSrc={loading}
              width="100%"
              style={{  width: "100%",
                transition: "transform 0.5s ease",
                transform: zoomed ? "scale(1.05)" : "scale(1)", }}
            />
            <br></br>
            <ButtonStyle0
              onClick={viewServices()}
              type="submit"
              style={{
                marginTop: 2,
                transition: "transform 0.5s ease",
                transform: zoomed ? "scale(1.05)" : "scale(1)",
                background: hovered ? "#ffffff" : ColorToGo,
                border: hovered
                  ? "1px solid #0B2545"
                  : `1px solid ${ColorToGo}`,
              }}
              endIcon={
                <ArrowRightAlt
                  sx={{ color: hovered ? "#0B2545" : "#ffffff" }}
                />
              }
              onMouseEnter={() => setHovered(true)} // Activa el hover
              onMouseLeave={() => setHovered(false)} // Desactiva el hover
            >
              Conoce más
            </ButtonStyle0>
          </center>
        </Grid>
      </Grid>
    </div>
  );
}
