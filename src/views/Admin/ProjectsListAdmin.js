import React, { useState, useContext, useEffect, Fragment } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  PauseCircleOutline,
  PlayCircleOutline,
  Add,
  List,
  Search,
  Edit,
  Close,
  OpenInNew,
  Link,
  DeleteForever,
  AddCircleOutline,
  Person,
} from "@mui/icons-material";
import clsx from "clsx";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import axios from "axios";
import {
  TextField,
  Grid,
  Box,
  Alert,
  Card,
  Tooltip,
  Snackbar,
} from "@mui/material";
import Moment from "moment";
import { CopyToClipboard } from "react-copy-to-clipboard";

import EditProjectAdmin from "views/Dialog/EditProjectAdmin";
import NewProjectAdmin from "views/Dialog/NewProjectAdmin";
import StatusProjectAdmin from "views/Dialog/StatusProjectAdmin";
import ViewUserAdmin from "views/Dialog/ViewUserAdmin";

import loaderGif from "assets/img/loading.gif";
import noDataImg from "assets/img/undraw_House_searching_re_stk8.png";
import noimage from "assets/img/noimage.jpeg";

import {
  cardBodyStyle,
  ButtonStyle0,
  ParagraphTextPage,
  blackColor,
  ButtonExit,
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

export default function ProjectsListAdmin() {
  const classes = useStyles();

  const [idRow, setIdRow] = useState("");
  const [rows, setRows] = useState([]);
  const [openStatus, setOpenStatus] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [loader, setLoader] = useState(true);
  const [openViewUser, setOpenViewUser] = useState(false);
  const [error, setError] = useState(false);
  const [mensageSystem, setMensageSystem] = useState("");
  const [returnLogin, setReturnLogin] = React.useState(false);
  const [searchText, setSearchText] = useState("");
  const [rowsResponse, setRowsResponse] = useState([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  let resultSearch = "";

  const { urlServices, urlWeb, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  const [state] = useState({
    columns: [
      {
        headerName: "-----",
        field: "images",
        width: 120,
        headerAlign: "center",
        headerClassName: "super-app-theme--header",
        renderCell: (params) => {
          let url = "";

          if (params.value.length > 0) {
            url = `${urlServices}documents/images_project/${params.value[0].images}`;
          } else {
            url = noimage;
          }
          // Retornar el URL completo
          return (
            <img
              src={url}
              alt="foto"
              style={{
                width: 150,
                objectFit: "cover",
                padding: 3,
                borderRadius: 10,
              }}
            />
          );
        },
        cellClassName: (params) => clsx("super-app", { celAll: params.value }),
        sortable: false,
        hideable: false,
      },
      {
        headerName: "Constructora",
        field: "constructora",
        headerClassName: "super-app-theme--header",
        flex: 1,
        // headerAlign: "center",
        renderCell: (params) => {
          return <span style={{ fontSize: 14 }}>{params.value}</span>;
        },
        cellClassName: (params) => {
          return clsx("super-app", {
            celAll: params.value,
          });
        },
        // align: "center",
        sortable: false,
        filtering: false,
        hideable: false,
      },
      {
        headerName: "Contacto",
        field: "phone",
        headerClassName: "super-app-theme--header",
        width: 120,
        // headerAlign: "center",
        renderCell: (params) => {
          return <span style={{ fontSize: 12 }}>{params.value}</span>;
        },
        cellClassName: (params) => {
          return clsx("super-app", {
            celAll: params.value,
          });
        },
        // align: "center",
        sortable: false,
        filtering: false,
        hideable: false,
      },
      {
        headerName: "Compartir link",
        field: "slug",
        headerClassName: "super-app-theme--header",
        width: 190,
        headerAlign: "center",
        renderCell: (params) => {
          return (
            <CopyToClipboard
              text={`${urlWeb}project?page=${params.value}`}
              onCopy={handleCopy}
            >
              <ButtonExit startIcon={<Link />} style={{ fontSize: 10 }}>
                Link del proyecto
              </ButtonExit>
            </CopyToClipboard>
          );
        },
        cellClassName: (params) => {
          return clsx("super-app", {
            celAll: params.value,
          });
        },
        align: "center",
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
          const text =
            params.value === 1
              ? "ACTIVO"
              : params.value === 2
              ? "PAUSADO"
              : "ELIMINADO";
          const color =
            params.value === 1
              ? "success"
              : params.value === 2
              ? "warning"
              : "error";
          return (
            <Alert severity={color} icon={false}>
              {" "}
              <b style={{ color: color, fontSize: 10 }}>{text}</b>
            </Alert>
          );
        },
      },
      {
        headerName: "Creado",
        field: "createdAt",
        headerClassName: "super-app-theme--header",
        headerAlign: "center",
        renderCell: (params) => {
          return (
            <span style={{ fontSize: 12 }}>
              {Moment(params.value).format("DD-MM-YYYY")}{" "}
            </span>
          );
        },
        cellClassName: (params) => {
          return clsx("super-app", {
            celAll: params.value,
          });
        },
        align: "center",
        width: 120,
        sortable: false,
        filtering: false,
        hideable: false,
      },
      {
        headerName: "-----",
        field: "actions",
        type: "actions",
        width: 120,
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
              style={{
                display: UserAuth.profile_id === 1 ? "block" : "none",
              }}
              icon={
                <Tooltip title="Ver usuario" arrow>
                  <Person style={{ fontSize: 24, color: "#000" }} />
                </Tooltip>
              }
              label="Ver usuario"
              onClick={openViewUserValue(params)}
            />
          );

          actions.push(
            <GridActionsCellItem
              key="disable"
              style={{
                marginLeft: "-13px",
              }}
              icon={
                <Tooltip title="Ver proyecto" arrow>
                  <OpenInNew style={{ fontSize: 22, color: "#000" }} />
                </Tooltip>
              }
              label="Ver proyecto"
              component="a"
              target="_blank"
              href={`${urlWeb}project?page=${params.row.slug}`}
            />
          );

          actions.push(
            <GridActionsCellItem
              style={{
                marginLeft: "-12px",
                display:
                  UserAuth.profile_id === 1
                    ? "none"
                    : params.row.status === 0
                    ? "none"
                    : "block",
              }}
              key="disable"
              icon={
                <Tooltip title="Editar" arrow>
                  <Edit style={{ fontSize: 22, color: "#000" }} />
                </Tooltip>
              }
              label="Editar"
              onClick={openEditValue(params)}
            />
          );

          actions.push(
            <GridActionsCellItem
              style={{
                marginLeft: "-16px",
                display: parseInt(params.row.status) === 2 ? "block" : "none",
              }}
              key="enable"
              icon={
                <Tooltip title="Publicar" arrow>
                  <PlayCircleOutline style={{ fontSize: 34, color: "green" }} />
                </Tooltip>
              }
              label="Publicar"
              onClick={openStatusValue(params)}
            />
          );

          actions.push(
            <GridActionsCellItem
              style={{
                marginLeft: "-13px",
                display: parseInt(params.row.status) === 1 ? "block" : "none",
              }}
              key="disable"
              icon={
                <Tooltip title="Pausar" arrow>
                  <PauseCircleOutline
                    style={{ fontSize: 24, color: "orange" }}
                  />
                </Tooltip>
              }
              label="Pausar"
              onClick={openStatusPausarValue(params)}
            />
          );

          actions.push(
            <GridActionsCellItem
              key="delete"
              style={{
                display:
                  UserAuth.profile_id === 1
                    ? params.row.status === 0
                      ? "none"
                      : "block"
                    : "none",
                marginLeft: "-15px",
              }}
              icon={
                <Tooltip title="Eliminar" arrow>
                  <DeleteForever style={{ fontSize: 24, color: "red" }} />
                </Tooltip>
              }
              label="Eliminar"
              onClick={openStatusDeleteValue(params)}
            />
          );

          actions.push(
            <GridActionsCellItem
              key="activated"
              style={{
                display:
                  UserAuth.profile_id === 1
                    ? params.row.status === 0
                      ? "block"
                      : "none"
                    : "none",
              }}
              icon={
                <Tooltip title="Activar" arrow>
                  <AddCircleOutline style={{ fontSize: 24, color: "green" }} />
                </Tooltip>
              }
              label="Activar"
              onClick={openStatusValue(params)}
            />
          );
          return actions;
        },
      },
    ],
  });

  const handleCopy = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

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
    if (event.target.value.trim() !== "") {
      resultSearch = rows.filter((item) =>
        removeAccents(item.title.toLowerCase()).includes(
          removeAccents(searchText.toLowerCase())
        )
      );
      setRows(resultSearch);
    } else {
      setRows(rowsResponse);
    }

    setSearchText(event.target.value);
  };

  const RefreshTable = async () => {
    setSearchText("");
    setLoader(true);

    let url = "";

    if (UserAuth.profile_id === 1) {
      url = `${urlServices}project-post/list`;
    } else {
      url = `${urlServices}project-post/list/user/${UserAuth.id}`;
    }

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${keyAuthorization}`,
        },
      });

      if (response.status === 200) {
        const transformedRows = response.data.map((data) => ({
          ...data,
          images: parseJsonArray(data.images),
          headerImage: parseJsonArray(data.headerImage),
          services: parseJsonArray(data.services),
          planos: parseJsonArray(data.planos),
          ltLgLocation: JSON.parse(data.ltLgLocation),
        }));

        const dataFinal = transformedRows.filter((filter) =>
          UserAuth.profile_id !== 1 ? filter.status !== 0 : filter
        );

        console.log(dataFinal);
        setRows(dataFinal);
        setRowsResponse(dataFinal);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setMensageSystem("La sesión ha expirado, vuelva a iniciar sesión ...");
        setError(true);
        setTimeout(() => {
          localStorage.clear();
          setReturnLogin(true);
        }, 4000);
      } else if (error.response?.status === 500) {
        setRows([]);
        setMensageSystem("Error en la consulta con el servidor.");
        setError(true);
      } else {
        console.error("Error en la solicitud:", error);
        setRows([]);
        setMensageSystem("Error al realizar la solicitud.");
        setError(true);
      }
    } finally {
      setLoader(false);
    }
  };

  // Función para parsear cadenas JSON y asegurar que sean arrays
  const parseJsonArray = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return [];
    }
  };

  const openStatusValue = (data) => () => {
    setIdRow({ id: data.row.id, status: 1 });
    setOpenStatus(true);
  };

  const openStatusPausarValue = (data) => () => {
    setIdRow({ id: data.row.id, status: 2 });
    setOpenStatus(true);
  };

  const openStatusDeleteValue = (data) => () => {
    setIdRow({ id: data.row.id, status: 0 });
    setOpenStatus(true);
  };

  const openEditValue = (data) => () => {
    setIdRow(data);
    setOpenEdit(true);
  };

  const openViewUserValue = (data) => () => {
    const Value = {
      allNames: data.row.user.allNames,
      createdAt: data.row.user.createdAt,
      documentId: data.row.user.documentId,
      email: data.row.user.email,
      phone: data.row.user.phone,
      profile: null,
    };

    const row = { row: Value };
    const result = { ...data, ...row };

    setIdRow(result);
    setOpenViewUser(true);
  };

  const handleCloseViewUser = () => setOpenViewUser(false);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleCloseNew = () => setOpenNew(false);
  const handleCloseStatus = () => setOpenStatus(false);

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {openNew ? (
        <>
          <div className={classes.cardTitleBlack} style={{ marginTop: 12 }}>
            <Add className={classes.iconFilter} /> Crear proyecto{" "}
            <ButtonExit startIcon={<Close />} onClick={handleCloseNew}>
              SALIR DEL RERGISTRO
            </ButtonExit>
          </div>
          <NewProjectAdmin
            open={openNew}
            exit={handleCloseNew}
            callBackRefresh={RefreshTable}
          />
        </>
      ) : openEdit ? (
        <>
          <div className={classes.cardTitleBlack} style={{ margin: "12px 0" }}>
            <Edit className={classes.iconFilter} /> Editar proyecto{" "}
            <ButtonExit startIcon={<Close />} onClick={handleCloseEdit}>
              SALIR DEL EDITAR
            </ButtonExit>
          </div>
          <EditProjectAdmin
            open={openEdit}
            exit={handleCloseEdit}
            callBackRefresh={RefreshTable}
            id={idRow}
          />
        </>
      ) : (
        <Grid container>
          <Grid xs={12} sm={12} md={12}>
            <div className={classes.cardTitleBlack}>
              <List className={classes.iconFilter} /> Listado de proyectos
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
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      sx={{
                        display: UserAuth.profile_id === 1 ? "none" : "block",
                      }}
                    >
                      <div style={{ float: "right" }}>
                        <ButtonStyle0
                          onClick={(event) => {
                            setOpenNew(true);
                          }}
                          endIcon={<Add />}
                        >
                          Agregar proyecto
                        </ButtonStyle0>
                      </div>
                    </Grid>

                    {rows.length === 0 ? (
                      <Grid item xs={12} sm={12}>
                        <center>
                          <img
                            alt="loaderGif"
                            src={noDataImg}
                            style={{ width: 350, marginTop: 40 }}
                          />
                          <ParagraphTextPage
                            style={{ fontSize: 18, margin: "5px 0 70px 0" }}
                          >
                            No hay registros para mostrar
                          </ParagraphTextPage>
                        </center>
                      </Grid>
                    ) : (
                      <Grid item xs={12} sm={12}>
                        <Box
                          sx={{
                            "& .super-app.celAll": {
                              fontSize: 14,
                              color: blackColor,
                              // whiteSpace: "normal !important",
                              // wordWrap: "break-word !important",
                              //backgroundColor: 'rgba(255, 7, 0, 0.55)',
                            },
                            "& .super-app.celActions": {
                              backgroundColor: "rgb(242, 242, 242)",
                            },
                            "& .super-app-theme--header": {
                              backgroundColor: "rgb(242, 242, 242)",
                            },
                            marginTop: 2,
                            width: "100%",
                            // height: '600px',
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
                              rowHeight={120}
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
                              // autoHeights
                              autoWidth
                            />
                          </ThemeProvider>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </Fragment>
              )}
            </Card>
          </Grid>
          {openStatus && (
            <StatusProjectAdmin
              open={openStatus}
              exit={handleCloseStatus}
              id={idRow}
              callBackRefresh={RefreshTable}
            />
          )}
          {openViewUser && (
            <ViewUserAdmin
              open={openViewUser}
              exit={handleCloseViewUser}
              id={idRow}
            />
          )}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              variant="filled"
            >
              Link copiado al portapapeles!
            </Alert>
          </Snackbar>
        </Grid>
      )}
    </>
  );
}
