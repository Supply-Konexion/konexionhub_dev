import React, { useState, useContext, useEffect, Fragment } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// core components
import {
  //Cancel,
  //AddCircle,
  Add,
  List,
  Search,
} from "@mui/icons-material";
import clsx from "clsx";
import {
  DataGrid,
  //GridActionsCellItem
} from "@mui/x-data-grid";
import axios from "axios";
import { TextField, Grid, Box, Alert, Card } from "@mui/material";

//import DeleteCountries from "views/dialog/DeleteCountries";
import NewCountriesAdmin from "views/Dialog/NewCountriesAdmin";

import loaderGif from "assets/img/loading.gif";

import { cardBodyStyle, ButtonStyle0 } from "components/cardBodyStyle";

// Crea un tema personalizado
const theme = createTheme({
  components: {
    MuiTablePagination: {
      styleOverrides: {
        displayedRows: {
          color: "black", // Cambia el color del texto a negro
        },
      },
    },
  },
});

const useStyles = makeStyles(cardBodyStyle);

export default function CountriesListAdmin() {
  const classes = useStyles();

  //const [idRow, setIdRow] = useState("");
  const [rows, setRows] = useState([]);
  //const [openStatus, setOpenStatus] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [mensageSystem, setMensageSystem] = useState("");
  const [returnLogin, setReturnLogin] = React.useState(false);
  const [searchText, setSearchText] = useState("");
  const [rowsResponse, setRowsResponse] = useState([]);
  let resultSearch = "";

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  const [state] = useState({
    columns: [
      {
        headerName: "Paises",
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
        headerName: "Code",
        field: "code",
        flex: 1,
        //headerAlign: "center",
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
      /*{
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
      },*/
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
      .get(`${urlServices}location/countries/list`, {
        headers: {
          Authorization: "Bearer " + keyAuthorization,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setRows(response.data);
          setRowsResponse(response.data);
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

  /* const handleCloseStatus = () => {
    setOpenStatus(false);
  };

  const openStatusValue = (data) => () => {
    setIdRow(data);
    setOpenStatus(true);
  };*/

  const handleCloseNew = () => {
    setOpenNew(false);
  };

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <div className={classes.cardTitleBlack}>
          <List className={classes.iconFilter} /> Listado de paises
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
                <Grid item xs={6} sm={6}>
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
                </Grid>
                <Grid item xs={6} sm={6}>
                  <div style={{ float: "right" }}>
                    <ButtonStyle0
                      onClick={(event) => {
                        setOpenNew(true);
                      }}
                      endIcon={<Add />}
                    >
                      Agregar país
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
                    <ThemeProvider theme={theme}>
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
                    </ThemeProvider>
                  </Box>
                </Grid>
              </Grid>
            </Fragment>
          )}
        </Card>
      </Grid>
      {/* {openStatus ? (
        <DeleteCountries
          open={openStatus}
          exit={handleCloseStatus}
          id={idRow}
          callBackRefresh={RefreshTable}
        />
      ) : (
        ""
      )*/}
      {openNew ? (
        <NewCountriesAdmin
          open={openNew}
          exit={handleCloseNew}
          callBackRefresh={RefreshTable}
        />
      ) : (
        ""
      )}
    </Grid>
  );
}
