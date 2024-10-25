import React, { useState, useEffect, useContext } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";

import { makeStyles } from "@mui/styles";
import { BarChart } from "@mui/x-charts/BarChart";
import { Grid, Alert } from "@mui/material";
import axios from "axios";

import loaderGif from "assets/img/loading.gif";

import { cardBodyStyle } from "components/cardBodyStyle";
import { blackColor } from "components/material-dashboard-react";

const useStyles = makeStyles(cardBodyStyle);

const colors = [
  "rgb(0, 196, 159)",
  "rgb(255, 187, 40)",
  "rgb(0, 136, 254)",
  "rgb(96, 0, 155)",
  "rgb(39, 49, 200)",
  "rgb(184, 0, 216)",
];

export default function BarChartPropertiesCitiesAdmin() {
  const classes = useStyles();

  const [namesArray, setNamesArray] = useState([]);
  const [valuesArray, setValuesArray] = useState([]);
  const [barColors, setBarColors] = useState([]);
  const [countProperties, setCountProperties] = useState(0);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);

  const { urlServices, UserAuth } = useContext(UrlServicesContext);
  let keyAuthorization = UserAuth.Session;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urlServices}publications/list`, {
          headers: {
            Authorization: "Bearer " + keyAuthorization,
          },
        });

        const result = response.data.filter(
          (filtered) => filtered.status === 1
        );

        console.log(result);

        setCountProperties(result.length);

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
        setError(true);
        setLoader(false);
      }
    };

    fetchData();
  }, [urlServices, UserAuth.id]);

  return (
    <Grid container>
      {error && (
        <Grid item xs={12} md={12}>
          <Alert severity="error">Error en la consulta</Alert>
        </Grid>
      )}
      <Grid item xs={12} md={12} sx={{ marginBottom: "-20px" }}>
        <div className={classes.cardTitleBlack} style={{ fontSize: 14 }}>
          Registros de inmuebles por ciudad{" "}
          <span style={{ float: "right", fontSize: 12 }}>
            Total de registros activos:{" "}
            <b
              style={{
                color: "white",
                borderRadius: "50%",
                padding: "7px 10px",
                background: blackColor,
                fontSize: 14,
              }}
            >
              {countProperties}
            </b>
          </span>
        </div>
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
