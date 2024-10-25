import React, { Fragment, useState, useContext, useEffect } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Redirect } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@mui/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { AddCircle, List, Search } from "@mui/icons-material";
import Card from "components/Card/Card.js";
import clsx from "clsx";
import CardBody from "components/Card/CardBody.js";
import axios from "axios";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { TextField, Grid, Tooltip, Box, Alert } from "@mui/material";

import ViewProfilePrivileges from "views/dialog/ViewProfilePrivileges";

import loaderGif from "assets/img/loading.gif";

import { cardBodyStyle } from "assets/jss/material-dashboard-react/components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function ProfilePrivilegesListAdmin() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [idRow, setIdRow] = useState("");
  const [OpenEnable, setOpenEnable] = useState(false);
  const [returnLogin, setReturnLogin] = React.useState(false);
  const [mensageSystem, setMensageSystem] = useState("");
  const [searchText, setSearchText] = useState("");
  const [rowsResponse, setRowsResponse] = useState([]);
  let resultSearch = "";

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  const [state] = useState({
    columns: [
      {
        headerName: "Nombre de perfil",
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
        headerName: "Permisos",
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
                <Tooltip title="Agregar" arrow>
                  <AddCircle style={{ fontSize: 24, color: "green" }} />
                </Tooltip>
              }
              label="Agregar"
              onClick={openEnable(params)}
            />
          );

          return actions;
        },
      },
    ],
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    RefreshTable();
  }, []);

  const handleSearchChange = (event) => {
    // Filtrar los datos según el valor de búsqueda
    if (event.target.value.trim() !== "") {
      resultSearch = rows.filter((item) =>
        item.name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setRows(resultSearch);
    } else {
      setRows(rowsResponse);
    }

    setSearchText(event.target.value);
  };

  const RefreshTable = () => {
    setSearchText("");

    axios
      .get(`${urlServices}profile/list`, {
        headers: {
          Authorization: "Bearer " + keyAuthorization,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          let result = response.data.filter((filtered) => filtered.id !== 1);

          setRows(result);
          setRowsResponse(result);
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

  const handleClose = () => {
    setOpenEnable(false);
  };

  const openEnable = (data) => () => {
    setIdRow(data);
    setOpenEnable(true);
  };

  if (returnLogin) {
    return <Redirect to="/" />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <div className={classes.cardTitleBlack}>
          <List className={classes.iconFilter} /> Listado de perfiles y permisos
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
                {/* Campo de búsqueda */}
                <TextField
                  variant="outlined"
                  value={searchText}
                  onChange={handleSearchChange}
                  style={{ marginBottom: 5 }}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <Search
                        position="start"
                        style={{
                          color: "gray",
                          fontSize: 22,
                          marginRight: 10,
                        }}
                      />
                    ),
                  }}
                  placeholder="Buscar"
                />
                {/* DataGrid */}
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
              </Fragment>
            )}
          </CardBody>
        </Card>
      </GridItem>
      {OpenEnable ? (
        <ViewProfilePrivileges
          open={OpenEnable}
          exit={handleClose}
          id={idRow}
          callBackRefresh={RefreshTable}
        />
      ) : (
        ""
      )}
    </GridContainer>
  );
}
