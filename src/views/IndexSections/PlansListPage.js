import React, { useState, useContext, useEffect } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";

// core components
import {
  CheckCircle,
  Verified
} from "@mui/icons-material";
import axios from "axios";
import { Grid, CardContent, Alert, Card } from "@mui/material";

import loaderGif from "assets/img/loading.gif";

import {
  TitleTextPage,
  ParagraphTextPage,
  blackColor,
} from "components/cardBodyStyle";

export default function PlansListPage(props) {

  const [rows, setRows] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [mensageSystem, setMensageSystem] = useState("");

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  useEffect(() => {
    RefreshTable();
  }, []);

  const RefreshTable = () => {
    axios
      .get(`${urlServices}plans/listAll`, {
        headers: {
          Authorization: "Bearer " + keyAuthorization,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setRows(response.data);
          setLoader(false);
        }
      })
      .catch((e) => {
        setMensageSystem("Error en la consulta con sel servidor.");
        setError(true);
      });
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        {error ? <Alert severity="error">{mensageSystem}</Alert> : ""}
        {loader ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <center>
                <img
                  alt="loaderGif"
                  src={loaderGif}
                  style={{ width: 60, margin: "20% 0" }}
                />
              </center>
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            {rows
              .filter((plan) => plan.status === 1)
              .map((data) => (
                <>
                  <Grid item xs={12} md={4} sx={{ padding: 1 }}>
                    <center>
                      <Card
                        sx={{
                          maxWidth: 345,
                          background: "rgb(249, 250, 251)",
                          height: 380,
                          margin: "2px 0",
                          paddingBottom: 50,
                        }}
                      >
                        <CardContent style={{ textAlign: "left" }}>
                          <TitleTextPage style={{ fontSize: 24 }}>
                            {data.name}
                            <span style={{ float: "right" }}>
                              {" "}
                              ${data.price}
                            </span>
                          </TitleTextPage>
                          {data.itemsPlan.map((dataItems) => (
                            <>
                              <ParagraphTextPage
                                style={{ fontSize: 16, margin: "20px 0" }}
                              >
                                <CheckCircle
                                  sx={{
                                    color: "rgb(16, 185, 129)",
                                    fontSize: 22,
                                  }}
                                />{" "}
                                {dataItems.name}
                              </ParagraphTextPage>
                            </>
                          ))}
                          {data.highlight === 1 ? (
                            <Grid item xs={12} md={12}>
                              <center>
                                <ParagraphTextPage
                                  style={{ fontSize: 18, marginTop: 70 }}
                                >
                                  <Verified sx={{ color: blackColor }} />
                                  &nbsp;&nbsp; El más elegido por los clientes
                                </ParagraphTextPage>
                              </center>
                            </Grid>
                          ) : (
                            ""
                          )}
                        </CardContent>
                      </Card>
                    </center>
                  </Grid>
                </>
              ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
