import React, { Fragment } from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, Grid } from "@mui/material";

import Footer from "components/Footer/Footer.js";
import img from "assets/img/undraw_House_searching_re_stk8.png";

import { cardBodyStyle, ButtonStyle0 } from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function Nofoundpage(props) {
  const classes = useStyles();
  const [Return, setReturn] = React.useState(false);

  const handleButton = () => {
    localStorage.clear();
    setReturn(true);
  };

  if (Return) {
    window.location.href = "/";
  }

  return (
    <div
      className="wrapper"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <div
        className="main"
        style={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          sx={{
            padding: "30px 20px 20px 20px",
            border: "#F6F6F6",
            borderRadius: 6,
            background: "#F6F6F6",
            width: "75%",
            margin: "20px 0",
          }}
        >
          <Grid item xs={12} sm={6}>
            <center>
            <Avatar
              alt="404"
              src={img}
              style={{
                width: 200,
                height: 200,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                objectFit: "cover",
              }}
            />
            </center>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.titleCard404} style={{ fontSize: 32 }}>
              Página no encontrada
            </div>
            <div className={classes.lineBottom}></div>
            <br />
            <ButtonStyle0
              onClick={handleButton}
              className={classes.buttonSubmit}
            >
              Ir al inicio
            </ButtonStyle0>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
