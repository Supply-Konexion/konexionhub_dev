import React, { Fragment, useState, useContext, useEffect } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { List, Search } from "@mui/icons-material";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import axios from "axios";
import clsx from "clsx";
import { Grid, Tooltip, Box, Alert, Card, TextField } from "@mui/material";
import Moment from "moment";

import ViewTransactionProperty from "views/Dialog/ViewTransactionProperty";

import loaderGif from "assets/img/loading.gif";

import { cardBodyStyle, blackColor } from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

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

export default function PaymentsListAdmin() {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [mensageSystem, setMensageSystem] = useState("");
  const [idRow, setIdRow] = useState("");
  const [openViewTransaction, setOpenViewTransaction] = useState(false);
  const [returnLogin, setReturnLogin] = React.useState(false);
  const [searchText, setSearchText] = useState("");
  const [rowsResponse, setRowsResponse] = useState([]);

  let resultSearch = "";

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  const [state] = useState({
    columns: [
      ...(UserAuth.profile_id === 1
        ? [
            {
              headerName: "Usuario",
              field: "user",
              flex: 1,
              headerClassName: "super-app-theme--header",
              cellClassName: (params) =>
                clsx("super-app", { celAll: params.value }),
              renderCell: (params) => (
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <b>{params.row.user.allNames}</b>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ fontSize: 10 }}>
                    Documento: {params.row.user.documentId}
                  </Grid>
                </Grid>
              ),
              sortable: false,
              hideable: false,
            },
          ]
        : []),
      {
        headerName: "Inmueble",
        field: "code",
        width: 100,
        headerAlign: "center",
        headerClassName: "super-app-theme--header",
        cellClassName: (params) => {
          return clsx("super-app", {
            celAll: params.value,
          });
        },
        renderCell: (params) => {
          return (
            <b
              style={{
                fontSize: 12,
                color: blackColor,
                margin: "15px 0",
              }}
            >
              CÓDIGO: <br></br>
              {params.row.publication.code}
            </b>
          );
        },
        sortable: false,
        hideable: false,
        align: "center",
      },
      {
        headerName: "Plan",
        field: "plans",
        flex: 1,
        // headerAlign: "center",
        headerClassName: "super-app-theme--header",
        cellClassName: (params) => {
          return clsx("super-app", {
            celAll: params.value,
          });
        },
        renderCell: (row) => {
          return (
            <div style={{ whiteSpace: "normal" }}>{row.row.plans?.name}</div>
          );
        },
        sortable: false,
        hideable: false,
      },
      {
        headerName: "Precio",
        field: "price",
        width: 90,
        // headerAlign: "center",
        headerClassName: "super-app-theme--header",
        cellClassName: (params) => {
          return clsx("super-app", {
            celAll: params.value,
          });
        },
        renderCell: (row) => {
          return (
            <div style={{ whiteSpace: "normal" }}>${row.row.plans?.price}</div>
          );
        },
        sortable: false,
        hideable: false,
      },
      {
        headerName: "Fecha inicio",
        field: "startDate",
        width: 100,
        // headerAlign: "center",
        headerClassName: "super-app-theme--header",
        cellClassName: (params) => {
          return clsx("super-app", {
            celAll: params.value,
          });
        },
        renderCell: (row) => {
          return (
            <>
              {row.row.startDate
                ? Moment(row.row.startDate).format("DD-MM-YYYY")
                : "---"}
            </>
          );
        },
        sortable: false,
        hideable: false,
      },
      {
        headerName: "Fecha fin",
        field: "endDate",
        width: 100,
        // headerAlign: "center",
        headerClassName: "super-app-theme--header",
        cellClassName: (params) => {
          return clsx("super-app", {
            celAll: params.value,
          });
        },
        renderCell: (row) => {
          return (
            <>
              {row.row.endDate
                ? Moment(row.row.endDate).format("DD-MM-YYYY")
                : "---"}
            </>
          );
        },
        sortable: false,
        hideable: false,
      },
      {
        headerName: "Estado",
        field: "transactionStatus",
        // headerAlign: "center",
        headerClassName: "super-app-theme--header",
        renderCell: (params) => {
          const text =
            params.value === 1
              ? "PAGADO"
              : params.value === 0
              ? "PENDIENTE"
              : "RECHAZADO";
          const color =
            params.value === 1
              ? "green"
              : params.value === 0
              ? "orange"
              : "red";
          return (
            <>
              <b style={{ color: color, fontSize: 10 }}>{text}</b>
            </>
          );
        },
      },
      {
        headerName: "Emisión",
        field: "createdAt",
        width: 100,
        // headerAlign: "center",
        headerClassName: "super-app-theme--header",
        cellClassName: (params) => {
          return clsx("super-app", {
            celAll: params.value,
          });
        },
        renderCell: (row) => {
          return <>{Moment(row.row.createdAt).format("DD-MM-YYYY")}</>;
        },
        sortable: false,
        hideable: false,
      },
      {
        headerName: "-----",
        field: "actions",
        type: "actions",
        width: 30,
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
                <Tooltip title="Información" arrow>
                  <Search style={{ fontSize: 24, color: "#000" }} />
                </Tooltip>
              }
              label="Información"
              onClick={openTransactionValue(params)}
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

  // Función para eliminar acentos de una cadena de texto
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearchChange = (event) => {
    // Filtrar los datos según el valor de búsqueda
    const searchText = event.target.value.trim().toLowerCase();
    if (searchText !== "") {
      resultSearch = rows.filter(
        (item) =>
          removeAccents(item.user.allNames.toLowerCase()).includes(
            removeAccents(searchText)
          ) ||
          item.user.documentId.toLowerCase().includes(searchText) ||
          item.publication.code.toString().includes(searchText)
      );
      setRows(resultSearch);
    } else {
      setRows(rowsResponse);
    }

    setSearchText(searchText);
  };

  const RefreshTable = () => {
    let url = "";

    if (UserAuth.profile_id === 1) {
      url = `${urlServices}publications-plans/list`;
    } else {
      url = `${urlServices}publications-plans/list/user/${UserAuth.id}`;
    }

    axios
      .get(url, {
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

  const openTransactionValue = (data) => () => {
    setIdRow(data.row.id);
    setOpenViewTransaction(true);
  };

  const handleCloseViewTransaction = () => setOpenViewTransaction(false);

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container>
      <Grid xs={12} sm={12} md={12}>
        <div className={classes.cardTitleBlack}>
          <List className={classes.iconFilter} /> Historial de pagos
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
                <Grid
                  item
                  xs={12}
                  sm={12}
                  sx={{ display: UserAuth.profile_id === 1 ? "block" : "none" }}
                >
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
                        rowHeight={140}
                        sx={{
                          [`& .${gridClasses.cell}`]: {
                            display: "flex",
                            alignItems: "center", // Alineación vertical
                            // justifyContent: 'center', // Alineación horizontal
                            //wordWrap: 'break-word !important',
                            //whiteSpace: 'normal !important',
                          },
                          /* [`& .${gridClasses.columnHeaderTitle}`]: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          },*/
                        }}
                        getRowHeight={() => "auto"}
                        //autoHeights
                        autoWidth
                      />
                    </ThemeProvider>
                  </Box>
                </Grid>
              </Grid>
            </Fragment>
          )}
        </Card>
      </Grid>
      {openViewTransaction && (
        <ViewTransactionProperty
          open={openViewTransaction}
          exit={handleCloseViewTransaction}
          id={idRow}
        />
      )}
    </Grid>
  );
}
