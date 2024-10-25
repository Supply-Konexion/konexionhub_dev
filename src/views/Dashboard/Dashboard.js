import React, { useState, useEffect, useContext } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";

// @material-ui/core
import { makeStyles } from "@mui/styles";
import { ArrowRightAlt, MapsHomeWork } from "@mui/icons-material";
// core components
import { Stack, Grid, Alert } from "@mui/material";
import axios from "axios";

import construction from "assets/img/undraw_under_construction_46pa.png";

import {
  dashboardStyle,
  ButtonExit,
  ColorLinearProgress,
} from "components/dashboardStyle.js";
import { blackColor } from "components/material-dashboard-react";

const useStyles = makeStyles(dashboardStyle);

export default function Dashboard() {
  const classes = useStyles();

  const [returnLogin, setReturnLogin] = React.useState(false);
  const [error, setError] = useState(false);
  const [mensageSystem, setMensageSystem] = useState("");
  const [buttonUsers, setButtonUsers] = useState(false);
  const [buttonProperties, setButtonProperties] = useState(false);
  const [countProject, setCountProject] = useState(0);
  const [countPublication, setCountPublication] = useState(0);

  const { urlServices, UserAuth } = useContext(UrlServicesContext);
  let keyAuthorization = UserAuth.Session;

  if (buttonUsers) {
    return <Navigate to="/account/users" />;
  }

  if (buttonProperties) {
    return <Navigate to="/account/properties" />;
  }

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className={classes.carDashboard}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 0",
      }}
    >
      <img src={construction} alt="construction" style={{ width: 450 }} />
      <br></br>
      <br></br>
      <b> EN DESARROLLO...</b>
    </div>
  );
}
