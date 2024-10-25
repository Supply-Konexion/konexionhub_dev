import React, { Fragment, useState, useContext, useEffect } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Redirect } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@mui/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { Cancel, List, Add, AddCircle } from "@mui/icons-material";
import Card from "components/Card/Card.js";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import CardBody from "components/Card/CardBody.js";
import axios from "axios";
import clsx from "clsx";
import { Grid, Tooltip, Box, Alert } from "@mui/material";

import StatusAdmin from "views/dialog/StatusAdmin";
import NewGenderAdmin from "views/dialog/NewGenderAdmin";

import loaderGif from "assets/img/loading.gif";

import {
  cardBodyStyle,
  ButtonStyle0,
} from "assets/jss/material-dashboard-react/components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function GenderListAdmin() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [mensageSystem, setMensageSystem] = useState("");
  const [idRow, setIdRow] = useState("");
  const [openStatus, setOpenStatus] = useState(false);
  const [openNew, setopenNew] = useState(false);
  const [returnLogin, setReturnLogin] = React.useState(false);

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  const [state] = useState({
    columns: [
      {
        headerName: "Nombre de género",
        field: "name",
        flex: 1,
        // headerAlign: "center",
        headerClassName: "super-app-theme--header",
        cellClassName: (params) => {
          return clsx("super-app", {
            celAll: params.value,
          });
        },
        sortable: false,
        hideable: false,
      },
      {
        headerName: "Estado",
        field: "status",
        // headerAlign: "center",
        headerClassName: "super-app-theme--header",
        renderCell: (params) => {
          const text = params.value === 1 ? "ACTIVO" : "INACTIVO";
          const color = params.value === 1 ? "green" : "red";
          return (
            <>
              <b style={{ color: color, fontSize: 10 }}>{text}</b>
            </>
          );
        },
      },
      {
        headerName: "-----",
        field: "actions",
        type: "actions",
        width: 110,
        headerClassName: "super-app-theme--header",
        cellClassName: (params) => {
          return clsx("super-app", {
            celActions: params.value,
          });
        },
        getActions: (params) => {
          const actions = [];

          if (parseInt(params.row.status) === 0) {
            // Si el perfil está deshabilitado, mostramos el icono para habilitarlo
            actions.push(
              <GridActionsCellItem
                key="enable"
                icon={
                  <Tooltip title="Habilitar" arrow>
                    <AddCircle style={{ fontSize: 24, color: "green" }} />
                  </Tooltip>
                }
                label="Habilitar"
                onClick={openStatusValue(params)}
              />
            );
          } else {
            // Si el perfil está habilitado, mostramos el icono para deshabilitarlo
            actions.push(
              <GridActionsCellItem
                key="disable"
                icon={
                  <Tooltip title="Deshabilitar" arrow>
                    <Cancel style={{ fontSize: 24, color: "#000" }} />
                  </Tooltip>
                }
                label="Deshabilitar"
                onClick={openStatusValue(params)}
              />
            );
          }

          return actions;
        },
      },
    ],
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    RefreshTable();
  }, []);

  const RefreshTable = () => {
    axios
      .get(`${urlServices}gender/list`, {
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

  const handleCloseStatus = () => {
    setOpenStatus(false);
  };

  const handleCloseNew = () => {
    setopenNew(false);
  };

  const openStatusValue = (data) => () => {
    setIdRow(data);
    setOpenStatus(true);
  };

  if (returnLogin) {
    return <Redirect to="/" />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <div className={classes.cardTitleBlack}>
          <List className={classes.iconFilter} /> Listado de géneros
        </div>
        <Card>
          <CardBody>
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
              <Fragment>
                <Grid container>
                  <Grid item xs={12} sm={12}>
                    <div style={{ float: "right" }}>
                      <ButtonStyle0
                        onClick={(event) => {
                          setopenNew(true);
                        }}
                        endIcon={<Add />}
                      >
                        Agregar género
                      </ButtonStyle0>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Box
                      sx={{
                        "& .super-app.celAll": {
                          fontSize: 12,
                          //backgroundColor: 'rgba(255, 7, 0, 0.55)',
                        },
                        "& .super-app.celActions": {
                          backgroundColor: "rgb(242, 242, 242)",
                        },
                        "& .super-app-theme--header": {
                          backgroundColor: "rgb(242, 242, 242)",
                        },
                        marginTop: 2,
                      }}
                    >
                      <DataGrid
                        rows={rows}
                        columns={state.columns}
                        loading={loader}
                        initialState={{
                          pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                          },
                        }}
                        pageSizeOptions={[5, 10, 20, 50]}
                        disableRowSelectionOnClick={true}
                        checkboxSelection={false}
                        //rowHeight={40}
                        autoHeights
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Fragment>
            )}
          </CardBody>
        </Card>
      </GridItem>
      {openStatus ? (
        <StatusAdmin
          open={openStatus}
          exit={handleCloseStatus}
          id={idRow}
          callBackRefresh={RefreshTable}
          path="gender"
        />
      ) : (
        ""
      )}
      {openNew ? (
        <NewGenderAdmin
          open={openNew}
          exit={handleCloseNew}
          callBackRefresh={RefreshTable}
        />
      ) : (
        ""
      )}
    </GridContainer>
  );
}
