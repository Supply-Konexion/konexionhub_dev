import React, { useState, useContext, useEffect, Fragment } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// core components
import {
  Add,
  PersonOutline,
  Search,
  Edit,
  LockReset,
} from "@mui/icons-material";
import clsx from "clsx";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import {
  TextField,
  Box,
  Tooltip,
  Grid,
  Alert,
  Stack,
  Card,
} from "@mui/material";
import Moment from "moment";

import StatusAdmin from "views/Dialog/StatusAdmin";
import NewUserAdmin from "views/Dialog/NewUserAdmin";
import EditUserAdmin from "views/Dialog/EditUserAdmin";
import ResetPasswordUser from "views/Dialog/ResetPasswordUser";
import ViewUserAdmin from "views/Dialog/ViewUserAdmin";

import loaderGif from "assets/img/loading.gif";

import {
  cardBodyStyle,
  ButtonStyle0,
  AntSwitch,
} from "components/cardBodyStyle";

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

export default function UsersListAdmin() {
  const classes = useStyles();

  const [idRow, setIdRow] = useState("");
  const [rows, setRows] = useState([]);
  const [openStatus, setOpenStatus] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openViewUser, setOpenViewUser] = useState(false);
  const [openResetPassword, setOpenResetPassword] = useState(false);
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
        headerName: "Usuario",
        field: "allNames",
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
        headerName: "Email",
        field: "email",
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
        headerName: "Perfil",
        field: "profileId",
        headerClassName: "super-app-theme--header",
        headerAlign: "center",
        renderCell: (params) => {
          return (
            <b
              style={{
                padding: 5,
                borderRadius: 10,
                border: "1px solid " + params.row.profile.color,
                whiteSpace: "break-spaces",
                background: params.row.profile.color,
                color: "#000",
                fontSize: 10,
              }}
            >
              {params.row.profile.name}{" "}
            </b>
          );
        },
        align: "center",
        width: 150,
        sortable: false,
        filtering: false,
        hideable: false,
      },
      {
        headerName: "Fecha Creación",
        field: "createdAt",
        headerClassName: "super-app-theme--header",
        headerAlign: "center",
        renderCell: (params) => {
          return <span>{Moment(params.value).format("DD-MM-YYYY")} </span>;
        },
        cellClassName: (params) => {
          return clsx("super-app", {
            celAll: params.value,
          });
        },
        align: "center",
        width: 150,
        sortable: false,
        filtering: false,
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
        width: 130,
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
                <Tooltip title="Ver usuario" arrow>
                  <Search style={{ fontSize: 24, color: "#000" }} />
                </Tooltip>
              }
              label="Ver usuario"
              onClick={openViewUserValue(params)}
            />
          );

          actions.push(
            <GridActionsCellItem
              key="disable"
              style={{ marginLeft: "-13px" }}
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
              /* <GridActionsCellItem
                key="enable"
                icon={
                  <Tooltip title="Habilitar" arrow>
                    <AddCircle style={{ fontSize: 24, color: "green" }} />
                  </Tooltip>
                }
                label="Habilitar"
                onClick={openStatusValue(params)}
              />*/
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                style={{ marginLeft: "-9px" }}
              >
                <Tooltip title="Habilitar" arrow>
                  <AntSwitch
                    checked={parseInt(params.row.status) === 0 ? false : true}
                    inputProps={{ "aria-label": "ant design" }}
                    onClick={openStatusValue(params)}
                  />
                </Tooltip>
              </Stack>
            );
          } else {
            // Si el perfil está habilitado, mostramos el icono para deshabilitarlo
            actions.push(
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                style={{ marginLeft: "-9px" }}
              >
                <Tooltip title="Deshabilitar" arrow>
                  <AntSwitch
                    checked={parseInt(params.row.status) === 0 ? false : true}
                    inputProps={{ "aria-label": "ant design" }}
                    onClick={openStatusValue(params)}
                  />
                </Tooltip>
              </Stack>
            );
            /*actions.push(
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
            );*/
          }

          actions.push(
            <GridActionsCellItem
              style={{ marginLeft: "-5px" }}
              key="disable"
              icon={
                <Tooltip title="Resetear contraseña" arrow>
                  <LockReset style={{ fontSize: 24, color: "#000" }} />
                </Tooltip>
              }
              label="Resetear contraseña"
              onClick={openResetPasswordValue(params)}
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
          removeAccents(item.allNames.toLowerCase()).includes(
            removeAccents(searchText)
          ) || item.documentId.toLowerCase().includes(searchText)
      );
      setRows(resultSearch);
    } else {
      setRows(rowsResponse);
    }

    setSearchText(searchText);
  };

  const RefreshTable = () => {
    setSearchText("");

    axios
      .get(`${urlServices}users/list`, {
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

  const handleCloseStatus = () => {
    setOpenStatus(false);
  };

  const openStatusValue = (data) => () => {
    setIdRow(data);
    setOpenStatus(true);
  };

  const openResetPasswordValue = (data) => () => {
    setIdRow(data);
    setOpenResetPassword(true);
  };

  const openEditValue = (data) => () => {
    setIdRow(data);
    setOpenEdit(true);
  };

  const openViewUserValue = (data) => () => {
    setIdRow(data);
    setOpenViewUser(true);
  };

  const handleCloseViewUser = () => {
    setOpenViewUser(false);
  };

  const handleCloseNew = () => {
    setOpenNew(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseResetPassword = () => {
    setOpenResetPassword(false);
  };

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <div className={classes.cardTitleBlack}>
          <PersonOutline className={classes.iconFilter} /> Listado de usuarios
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
                      style={{ width: 220 }}
                    >
                      Agregar administrador
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
      {openStatus && (
        <StatusAdmin
          open={openStatus}
          exit={handleCloseStatus}
          id={idRow}
          callBackRefresh={RefreshTable}
          path="users"
        />
      )}
      {openNew && (
        <NewUserAdmin
          open={openNew}
          exit={handleCloseNew}
          callBackRefresh={RefreshTable}
        />
      )}
      {openEdit && (
        <EditUserAdmin
          open={openEdit}
          exit={handleCloseEdit}
          callBackRefresh={RefreshTable}
          id={idRow}
        />
      )}
      {openResetPassword && (
        <ResetPasswordUser
          open={openResetPassword}
          exit={handleCloseResetPassword}
          id={idRow}
        />
      )}
      {openViewUser && (
        <ViewUserAdmin
          open={openViewUser}
          exit={handleCloseViewUser}
          id={idRow}
        />
      )}
    </Grid>
  );
}
