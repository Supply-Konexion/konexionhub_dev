import React, { Fragment, useState, useContext, useEffect } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@mui/styles";

import { Cancel, List, Add, AddCircle, Edit } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import clsx from "clsx";
import { Grid, Tooltip, Box, Alert, Card } from "@mui/material";

import StatusAdmin from "views/Dialog/StatusAdmin";
import EditTypeOperationAdmin from "views/Dialog/EditTypeOperationAdmin";
import NewTypeOperationAdmin from "views/Dialog/NewTypeOperationAdmin";

import loaderGif from "assets/img/loading.gif";

import { cardBodyStyle, ButtonStyle0 } from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function TypeOperationListAdmin() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [mensageSystem, setMensageSystem] = useState("");
  const [idRow, setIdRow] = useState("");
  const [openStatus, setOpenStatus] = useState(false);
  const [openNew, setopenNew] = useState(false);
  const [returnLogin, setReturnLogin] = React.useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  const [state] = useState({
    columns: [
      {
        headerName: "Nombre",
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

          actions.push(
            <GridActionsCellItem
              key="disable"
              icon={
                <Tooltip title="Editar" arrow>
                  <Edit style={{ fontSize: 24, color: "#000" }} />
                </Tooltip>
              }
              label="Editar"
              onClick={openEditValue(params)}
            />
          );

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
      .get(`${urlServices}type-operation/list`, {
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

  const openEditValue = (data) => () => {
    setIdRow(data);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container>
      <Grid xs={12} sm={12} md={12}>
        <div className={classes.cardTitleBlack}>
          <List className={classes.iconFilter} /> Listado de tipo de operación
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
                      Agregar tipo
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
        </Card>
      </Grid>
      {openStatus ? (
        <StatusAdmin
          open={openStatus}
          exit={handleCloseStatus}
          id={idRow}
          callBackRefresh={RefreshTable}
          path="type-operation"
        />
      ) : (
        ""
      )}
      {openNew ? (
        <NewTypeOperationAdmin
          open={openNew}
          exit={handleCloseNew}
          callBackRefresh={RefreshTable}
        />
      ) : (
        ""
      )}
      {openEdit ? (
        <EditTypeOperationAdmin
          open={openEdit}
          exit={handleCloseEdit}
          callBackRefresh={RefreshTable}
          id={idRow}
          hide={true}
          title={"type-operation"}
        />
      ) : (
        ""
      )}
    </Grid>
  );
}
