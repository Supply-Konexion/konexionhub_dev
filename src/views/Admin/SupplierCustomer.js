import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
  ArrowRightAlt,
  ArrowBackIosNew,
  Search,
  GridView,
  Equalizer,
  PersonSearch,
  Factory,
  LocalLibrary,
} from "@mui/icons-material";
import { Grid, Card, Button, CardContent, Box } from "@mui/material";
import {
  cardBodyStyle,
  ParagraphTextPage,
  TitleTextPage,
  blackColor,
  purpleColor,
} from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

const cardData = [
  {
    title: "Análisis de riesgo documentar",
    backText: "prueba1",
    img: Equalizer,
  },
  {
    title: "Búsqueda de proveedores y clientes",
    backText: "prueba2",
    img: PersonSearch,
  },
  {
    title: "Inspección de fábricas y oficinas",
    backText: "prueba3",
    img: Factory,
  },
  { title: "Coordinación de muestras", backText: "prueba4", img: LocalLibrary },
];

const FlipCard = ({ title, backText, ImgComponent }) => (
  <Card
    variant="outlined"
    className="flip-card"
    sx={{ height: 250, p: 2, m: 1 }}
  >
    <div className="flip-card-inner">
      <div className="flip-card-front">
        <center>
          <ImgComponent sx={{ fontSize: 62 }} />
        </center>
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <TitleTextPage
                sx={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                {title}
              </TitleTextPage>
              <center>
                <Button
                  sx={{
                    marginTop: 6,
                    background: "#ffffff",
                    textTransform: "none",
                    padding: "8px 0",
                    width: 90,
                    borderRadius: 2,
                    border: "1px solid #0B2545",
                    "&:hover": { background: "#ffffff" },
                  }}
                  endIcon={<Search sx={{ color: purpleColor }} />}
                >
                  <ParagraphTextPage sx={{ color: purpleColor, fontSize: 12 }}>
                    Ver
                  </ParagraphTextPage>
                </Button>
              </center>
            </Grid>
          </Grid>
        </CardContent>
      </div>
      <div className="flip-card-back">
        <Grid container>
          <Grid item xs={12} sm={12}>
            <TitleTextPage sx={{ fontSize: 16, textAlign: "center", color: "#ffffff" }}>
              {backText}
            </TitleTextPage>
          </Grid>
          <Grid item xs={12} sm={12}>
            <center>
              <Button
                sx={{
                  marginTop: 10,
                  background: purpleColor,
                  textTransform: "none",
                  padding: "10px 0",
                  width: 100,
                  borderRadius: 2,
                  border: "1px solid #0B2545",
                  "&:hover": { background: purpleColor },
                }}
                endIcon={<ArrowRightAlt sx={{ color: "#ffffff" }} />}
              >
                <ParagraphTextPage sx={{ color: "#ffffff", fontSize: 12 }}>
                  Activar
                </ParagraphTextPage>
              </Button>
            </center>
          </Grid>
        </Grid>
      </div>
    </div>
  </Card>
);

export default function SupplierCustomer() {
  const classes = useStyles();
  const [GoBack, setGoBack] = useState(false);

  const goBack = () => {
    setGoBack(true);
  };

  if (GoBack) {
    localStorage.setItem("controllerRouter", `/account/services`);
    return <Navigate to={`/account/services`} />;
  }

  return (
    <div className={classes.carDashboard}>
      <Grid container sx={{ p: "2% 0 3% 0" }}>
        <Grid item xs={12}>
          <Box
            onClick={goBack}
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
        <Grid item xs={12} sm={12} sx={{ p: "0 2% 3% 2%" }}>
          <TitleTextPage sx={{ fontSize: 22 }}>
            <GridView sx={{ color: "#29ACE2", fontSize: 24 }} />
            <span style={{ verticalAlign: "middle" }}>
              Calificacion de proveedores/clientes
            </span>
          </TitleTextPage>
        </Grid>

        {cardData.map((card, index) => (
          <Grid item xs={12} md={3} key={index}>
            <FlipCard
              title={card.title}
              backText={card.backText}
              ImgComponent={card.img}
            />
          </Grid>
        ))}
      </Grid>

      <style jsx>{`
        .flip-card {
          perspective: 1000px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #29ACE2;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
