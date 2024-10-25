import React, { useState, useEffect, useContext } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import { BarChart } from "@mui/x-charts/BarChart";
import { Grid, Alert } from "@mui/material";
import axios from "axios";

import loaderGif from "assets/img/loading.gif";

import { cardBodyStyle } from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

const colors = [
  "rgb(0, 196, 159)",
  "rgb(255, 187, 40)",
  "rgb(0, 136, 254)",
  "rgb(96, 0, 155)",
  "rgb(39, 49, 200)",
  "rgb(184, 0, 216)",
];

export default function BarChartPropertiesCities() {
  const classes = useStyles();

  const [namesArray, setNamesArray] = useState([]);
  const [valuesArray, setValuesArray] = useState([]);
  const [barColors, setBarColors] = useState([]);
  const [returnLogin, setReturnLogin] = React.useState(false);
  const [error, setError] = useState(false);
  const [mensageSystem, setMensageSystem] = useState("");
  const [loader, setLoader] = useState(true);
  const { urlServices, UserAuth } = useContext(UrlServicesContext);
  let keyAuthorization = UserAuth.Session;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${urlServices}publications/list/user/${UserAuth.id}`,
          {
            headers: {
              Authorization: "Bearer " + keyAuthorization,
            },
          }
        );

        const result = response.data.filter(
          (filtered) => filtered.status !== 0
        );

        const citiesCount = result.reduce((acc, city) => {
          const cityName = city.cities.name;
          acc[cityName] = (acc[cityName] || 0) + 1;
          return acc;
        }, {});

        const countArray = Object.entries(citiesCount).map(
          ([name, value], index) => ({
            name,
            value,
            color: colors[index % colors.length],
          })
        );

        setNamesArray(countArray.map((item) => item.name));
        setValuesArray(countArray.map((item) => item.value));
        setBarColors(countArray.map((item) => item.color));
        setLoader(false);
      } catch (error) {
        if (error.response?.status === 401) {
          setMensageSystem(
            "La sesión ha expirado, vuelva a iniciar sesión ..."
          );
          setError(true);
          setTimeout(() => {
            localStorage.clear();
            setReturnLogin(true);
          }, 4000);
        } else if (error.response?.status === 500) {
          setMensageSystem("Error en la consulta con el servidor.");
          setError(true);
        } else {
          console.error("Error en la solicitud:", error);
          setMensageSystem("Error al realizar la solicitud.");
          setError(true);
        }
        setLoader(false);
      }
    };

    fetchData();
  }, [urlServices, UserAuth.id, keyAuthorization]);

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container>
      {error && (
        <Grid item xs={12} md={12}>
          <Alert severity="error">{mensageSystem}</Alert>
        </Grid>
      )}
      <Grid item xs={12} md={12}>
        <span className={classes.cardTitleBlack} style={{ fontSize: 14 }}>
          Registros de inmuebles por ciudad
        </span>
        {loader ? (
          <center>
            <img
              alt="loaderGif"
              src={loaderGif}
              style={{ width: 60, marginTop: 30 }}
            />
          </center>
        ) : (
          <center>
            <BarChart
              width={500}
              height={300}
              series={[{ data: valuesArray, id: "cId" }]}
              xAxis={[
                {
                  data: namesArray,
                  scaleType: "band",
                  colorMap: {
                    type: "ordinal",
                    values: namesArray,
                    colors: barColors,
                  },
                },
              ]}
              borderRadius={10}
              tooltip={{ trigger: "item" }}
            />
          </center>
        )}
      </Grid>
    </Grid>
  );
}
