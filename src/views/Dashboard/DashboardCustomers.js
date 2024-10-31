import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// @material-ui/core
import { makeStyles } from "@mui/styles";
import { ArrowRightAlt } from "@mui/icons-material";
// core components
import { Stack, Grid } from "@mui/material";

import BarChartPropertiesCities from "views/Graphs/BarChartPropertiesCities";
import PieChartPropertiesType from "views/Graphs/PieChartPropertiesType";

import {
  dashboardStyle,
  ButtonExit,
  TitleTextPage,
} from "components/dashboardStyle.js";

const useStyles = makeStyles(dashboardStyle);

export default function DashboardCustomers() {
  const classes = useStyles();

  const [buttonProperties, setButtonProperties] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (buttonProperties) {
    return <Navigate to="/account/properties" />;
  }

  return (
    <div>
     
    </div>
  );
}
