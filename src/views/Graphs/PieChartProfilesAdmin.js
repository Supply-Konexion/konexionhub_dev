import React, { useState, useEffect, useContext } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";

import { makeStyles } from "@mui/styles";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Grid, Alert } from "@mui/material";
import axios from "axios";

import loaderGif from "assets/img/loading.gif";

import { cardBodyStyle, blackColor } from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

const sizing = {
  margin: { left: 1 },
  width: 400,
  height: 200,
  legend: { hidden: false },
};

const colors = [
  "rgb(96, 0, 155)",
  "rgb(0, 136, 254)",
  "rgb(39, 49, 200)",
  "rgb(0, 196, 159)",
  "rgb(184, 0, 216)",
  "rgb(255, 187, 40)",
];

export default function PieChartProfilesAdmin() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const { urlServices, UserAuth } = useContext(UrlServicesContext);
  let keyAuthorization = UserAuth.Session;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urlServices}users/list`, {
          headers: {
            Authorization: "Bearer " + keyAuthorization,
          },
        });

        const result = response.data.filter(
          (filtered) => filtered.status !== 0 && filtered.profileId !== 1
        );

        const profileCount = result.reduce((acc, profile) => {
          const profileName = profile.profile.name;
          acc[profileName] = (acc[profileName] || 0) + 1;
          return acc;
        }, {});

        const countArray = Object.entries(profileCount).map(
          ([name, value], index) => ({
            label: name,
            value: value,
            color: colors[index % colors.length],
          })
        );

        setData(countArray);
        setLoader(false);
      } catch (error) {
        setError(true);
        setLoader(false);
      }
    };

    fetchData();
  }, [urlServices, UserAuth.id, keyAuthorization]);

  const TOTAL = data.length
    ? data.map((item) => item.value).reduce((a, b) => a + b, 0)
    : 0;

  const getArcLabel = (params) => {
    const percent = TOTAL ? params.value / TOTAL : 0; // Verifica TOTAL
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <Grid container>
      {error && (
        <Grid item xs={12} md={12}>
          <Alert severity="error">Error en la consulta</Alert>
        </Grid>
      )}
      <Grid item xs={12} md={12}>
        <span className={classes.cardTitleBlack} style={{ fontSize: 14 }}>
          Registros de usuarios por tipo de perfiles
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
            <PieChart
              series={[
                {
                  outerRadius: 80,
                  data,
                  arcLabel: getArcLabel,
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontSize: 14,
                },
              }}
              {...sizing}
            />
          </center>
        )}
      </Grid>
      {data.map((val, i) => (
        <Grid
          item
          xs={data.length === 1 ? 12 : data.length === 2 ? 6 : 4}
          md={data.length === 1 ? 12 : data.length === 2 ? 6 : 4}
          key={i}
          sx={{ textAlign: "center" }}
        >
          <span className={classes.cardTitleBlack} style={{ fontSize: 12 }}>
            {`${val.label}`}{" "}
            <b
              style={{
                color: "white",
                borderRadius: "50%",
                padding: "7px 10px",
                background: blackColor,
              }}
            >{`${val.value}`}</b>
          </span>
        </Grid>
      ))}
    </Grid>
  );
}
