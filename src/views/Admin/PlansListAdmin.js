import React, { useState, useContext, useEffect, Fragment } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@mui/styles";
// core components
import {
  CheckCircle,
  Edit,
  Add,
  Verified,
  Close,
  List,
} from "@mui/icons-material";
import axios from "axios";
import {
  Grid,
  CardActions,
  CardContent,
  Alert,
  Card,
  Button,
} from "@mui/material";

import NewPlansAdmin from "views/Dialog/NewPlansAdmin";
import EditPlansAdmin from "views/Dialog/EditPlansAdmin";
import StatusAdmin from "views/Dialog/StatusAdmin";

import loaderGif from "assets/img/loading.gif";

import {
  cardBodyStyle,
  TitleTextPage,
  ParagraphTextPage,
  blackColor,
  ButtonStyle0,
} from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function PlansListAdmin() {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [openNew, setOpenNew] = React.useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [mensageSystem, setMensageSystem] = useState("");
  const [returnLogin, setReturnLogin] = React.useState(false);
  const [idRow, setIdRow] = useState("");

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
          const statusValue = response.data.filter(
            (value) => value.status === 1
          );
          setRows(statusValue);
          setLoader(false);
        }
      })
      .catch((e) => {
        if (e.response.status === 401) {
          setMensageSystem(
            "La sesión ha expirado, vuelva a iniciar sesión ..."
          );
          setError(true);

          setTimeout(() => {
            localStorage.clear();
            setReturnLogin(true);
          }, 4000);
        } else if (e.response.status === 500) {
          setRows([]);
          setMensageSystem("Error en la consulta con sel servidor.");
          setError(true);
        }
      });
  };

  const OpenEditValue = (data) => {
    setIdRow(data);
    setOpenEdit(true);
  };

  const OpenStatusValue = (data) => {
    let value = {
      ...data,
      row: {
        status: data.status,
      },
    };
    setIdRow(value);
    setOpenStatus(true);
  };

  const handleCloseNew = () => {
    setOpenNew(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseStatus = () => {
    setOpenStatus(false);
  };

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <div className={classes.cardTitleBlack}>
          <List className={classes.iconFilter} /> Listado de planes
        </div>
        <Card
          sx={{ padding: "15px 20px", margin: "10px 0" }}
          variant="outlined"
        >
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
              <Grid item xs={12} sm={12}>
                <div style={{ float: "right", marginBottom: 20 }}>
                  <ButtonStyle0
                    onClick={() => setOpenNew(true)}
                    endIcon={<Add />}
                  >
                    Agregar plan
                  </ButtonStyle0>
                </div>
              </Grid>
              {rows.length > 0 ? (
                rows.map((data) => (
                  <>
                    <Grid item xs={12} md={4} sx={{ padding: 1 }}>
                      <center>
                        <Card
                          sx={{
                            maxWidth: 345,
                            background: "rgb(249, 250, 251)",
                            height: 380,
                            margin: "2px 0",
                          }}
                        >
                          <CardContent style={{ textAlign: "left" }}>
                            <Grid container>
                              <Grid item xs={6} sm={6}>
                                <TitleTextPage style={{ fontSize: 18 }}>
                                  {data.name}
                                  {data.popular === 1 && (
                                    <ParagraphTextPage
                                      style={{ fontSize: 10, margin: "1px 0" }}
                                    >
                                      (DESTACADO)
                                    </ParagraphTextPage>
                                  )}
                                </TitleTextPage>
                              </Grid>
                              <Grid item xs={6} sm={6}>
                                <TitleTextPage style={{ fontSize: 18 }}>
                                  <span style={{ float: "right" }}>
                                    {" "}
                                    ${data.price}
                                  </span>
                                </TitleTextPage>
                              </Grid>
                            </Grid>
                            {data.itemsPlan.map((dataItems) => (
                              <>
                                <ParagraphTextPage
                                  style={{ fontSize: 14, margin: "15px 0" }}
                                >
                                  <CheckCircle
                                    sx={{
                                      color: "rgb(16, 185, 129)",
                                      fontSize: 14,
                                    }}
                                  />{" "}
                                  {dataItems.name}
                                </ParagraphTextPage>
                              </>
                            ))}
                            {data.highlight === 1 && (
                              <Grid item xs={12} md={12}>
                                <center>
                                  <ParagraphTextPage
                                    style={{ fontSize: 16, marginTop: 25 }}
                                  >
                                    <Verified sx={{ color: blackColor }} />
                                    &nbsp;&nbsp; El más elegido por los clientes
                                  </ParagraphTextPage>
                                </center>
                              </Grid>
                            )}
                          </CardContent>
                          <CardActions>
                            <Grid container>
                              <Grid item xs={12} md={12}>
                                <center>
                                  <Button
                                    onClick={() => OpenEditValue(data)}
                                    sx={{ margin: "0px 1px" }}
                                    color="primary"
                                    startIcon={
                                      <Edit
                                        style={{
                                          padding: 2,
                                          border: "1px solid #1976d2",
                                          fontSize: 32,
                                          borderRadius: 15,
                                        }}
                                      />
                                    }
                                  ></Button>
                                  <Button
                                    onClick={() => OpenStatusValue(data)}
                                    sx={{ margin: "0px 1px" }}
                                    color="error"
                                    startIcon={
                                      <Close
                                        style={{
                                          padding: 2,
                                          border: "1px solid red",
                                          fontSize: 32,
                                          borderRadius: 15,
                                        }}
                                      />
                                    }
                                  ></Button>
                                </center>
                              </Grid>
                            </Grid>
                          </CardActions>
                        </Card>
                      </center>
                    </Grid>
                  </>
                ))
              ) : (
                <Grid item xs={12} md={12}>
                  <Alert severity="warning">No hay planes registrados.</Alert>
                </Grid>
              )}
            </Grid>
          )}
        </Card>
      </Grid>
      {openNew && (
        <NewPlansAdmin
          open={openNew}
          exit={handleCloseNew}
          callBackRefresh={RefreshTable}
        />
      )}
      {openEdit && (
        <EditPlansAdmin
          open={openEdit}
          exit={handleCloseEdit}
          idRow={idRow}
          callBackRefresh={RefreshTable}
        />
      )}
      {openStatus && (
        <StatusAdmin
          open={openStatus}
          exit={handleCloseStatus}
          id={idRow}
          callBackRefresh={RefreshTable}
          path="plans"
        />
      )}
    </Grid>
  );
}
