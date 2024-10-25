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
  LocationOn,
  HomeWork,
  Loyalty,
  OpenInNew,
  CreditScore,
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
  Typography,
} from "@mui/material";
import Moment from "moment";

import EditPropertiesAdmin from "views/Dialog/EditPropertiesAdmin";
import NewPropertiesAdmin from "views/Dialog/NewPropertiesAdmin";
import ViewRealEstateSingle from "views/Dialog/ViewRealEstateSingle";
import PlansListPay from "views/Dialog/PlansListPay";
import ViewTransactionProperty from "views/Dialog/ViewTransactionProperty";
import StatusPropertyAdmin from "views/Dialog/StatusPropertyAdmin";
import StatusActivatedAdminProperty from "views/Dialog/StatusActivatedAdminProperty";
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

const infoStyle = {
  color: "#1d1d1b",
  fontSize: 12,
  margin: "5px 0",
  borderBottom: "1px solid #f2f2f2",
  paddingLeft: 2,
  padding: "2px 5px 2px 15px",
};

export default function PropertiesAdminList() {
  const classes = useStyles();

  const [idRow, setIdRow] = useState("");
  const [rows, setRows] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [openPlanPay, setOpenPlanPay] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [openViewUser, setOpenViewUser] = useState(false);
  const [openViewFinalityTransaction, setOpenViewFinalityTransaction] =
    useState(false);
  const [openViewTransaction, setOpenViewTransaction] = useState(false);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [mensageSystem, setMensageSystem] = useState("");
  const [returnLogin, setReturnLogin] = React.useState(false);
  const [searchText, setSearchText] = useState("");
  const [rowsResponse, setRowsResponse] = useState([]);

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

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
            // Filtrar la imagen principal
            const imageMain = params.value.find(
              (image) => parseInt(image.main) === 1
            );

            if (imageMain) {
              // Obtener el nombre y la extensión de la imagen
              const [baseName, extension] = imageMain.images
                .split(".")
                .reduce(
                  ([base, ext], part, index, arr) =>
                    index === arr.length - 1
                      ? [base, part]
                      : [`${base}${base ? "." : ""}${part}`, ext],
                  ["", ""]
                );

              // Construir el nuevo nombre de la imagen
              const newImageName = `${baseName}_150x150.${extension}`;
              url = `${urlServices}documents/images_properties/150x150/${newImageName}`;
            } else {
              url = noimage;
            }
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
        headerName: "Título",
        field: "title",
        flex: 1,
        // headerAlign: "center",
        headerClassName: "super-app-theme--header",
        cellClassName: (params) => {
          return clsx("super-app", {
            celAll: params.value,
          });
        },
        renderCell: (params) => {
          return (
            <>
              <Grid container>
                <Grid item xs={12} md={12}>
                  {params.row.title}
                </Grid>
                <Grid item xs={12} md={12}>
                  <b
                    style={{
                      border: "1px solid " + blackColor,
                      width: 40,
                      borderRadius: 40,
                      padding: "4px 12px",
                      fontSize: 9,
                      color: blackColor,
                    }}
                  >
                    CÓDIGO: {params.row.code}
                  </b>
                </Grid>
              </Grid>
            </>
          );
        },
        sortable: false,
        hideable: false,
      },
      {
        headerName: "Precio",
        field: "price",
        // headerAlign: "center",
        width: 120,
        headerClassName: "super-app-theme--header",
        cellClassName: (params) => {
          return clsx("super-app", {
            celAll: params.value,
          });
        },
        renderCell: (params) => {
          return (
            <>
              <span style={{ fontWeight: "bold" }}>
                ${formatPrice(params.value)}
              </span>
            </>
          );
        },
        sortable: false,
        hideable: false,
      },
      {
        headerName: "Información",
        width: 150,
        // headerAlign: "center",
        headerClassName: "super-app-theme--header",
        cellClassName: (params) => {
          return clsx("super-app", {
            celAll: params.value,
          });
        },
        renderCell: ({ row }) => (
          <div style={{ whiteSpace: "normal" }}>{renderInfo(row)}</div>
        ),
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
              : params.value === 99
              ? "INACTIVA"
              : params.value === 3
              ? "PENDINETE"
              : "ELIMINADA";
          const color =
            params.value === 1
              ? "success"
              : params.value === 2
              ? "info"
              : params.value === 3
              ? "warning"
              : "error";
          return (
            <Alert severity={color} icon={false}>
              {" "}
              <b style={{ color: color, fontSize: 10 }}>{text}</b>
            </Alert>
          );
        },
        sortable: false,
        filtering: false,
        hideable: false,
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
            <Grid container>
              <Grid
                item
                xs={4}
                sm={4}
                sx={{
                  display: UserAuth.profile_id === 1 ? "block" : "none",
                }}
              >
                <GridActionsCellItem
                  key="disable"
                  icon={
                    <Tooltip title="Ver usuario" arrow>
                      <Person style={{ fontSize: 24, color: "#000" }} />
                    </Tooltip>
                  }
                  label="Ver usuario"
                  onClick={openViewUserValue(params)}
                />
              </Grid>
              <Grid item xs={4} sm={4}>
                <GridActionsCellItem
                  key="view"
                  icon={
                    <Tooltip title="Ver publicación" arrow>
                      <OpenInNew style={{ fontSize: 22, color: "#000" }} />
                    </Tooltip>
                  }
                  label="Ver publicación"
                  onClick={openViewValue(params)}
                />
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                sx={{
                  display:
                    parseInt(params.row.status) === 0 ||
                    parseInt(params.row.status) === 99
                      ? "none"
                      : "block",
                }}
              >
                <GridActionsCellItem
                  key="transaction"
                  icon={
                    <Tooltip title="Ver transacción" arrow>
                      <CreditScore style={{ fontSize: 23, color: "#000" }} />
                    </Tooltip>
                  }
                  label="Ver transacción"
                  onClick={openViewTransactionValue(params)}
                />
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                sx={{
                  display:
                    UserAuth.profile_id === 1
                      ? "none"
                      : params.row.status === 0
                      ? "none"
                      : "block",
                }}
              >
                <GridActionsCellItem
                  key="edit"
                  icon={
                    <Tooltip title="Editar" arrow>
                      <Edit style={{ fontSize: 22, color: "#000" }} />
                    </Tooltip>
                  }
                  label="Editar"
                  onClick={openEditValue(params)}
                />
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                sx={{
                  display:
                    UserAuth.profile_id === 1
                      ? parseInt(params.row.status) !== 1 &&
                        parseInt(params.row.status) !== 2
                        ? "block"
                        : "none"
                      : parseInt(params.row.status) === 99
                      ? "block"
                      : "none",
                }}
              >
                <GridActionsCellItem
                  key="enable1"
                  icon={
                    <Tooltip title="Publicar" arrow>
                      <PlayCircleOutline
                        style={{ fontSize: 24, color: "green" }}
                      />
                    </Tooltip>
                  }
                  label="Publicar"
                  onClick={
                    UserAuth.profile_id === 1
                      ? openStatusEnableAdminValue(params)
                      : openPlanPayValue(params)
                  }
                />
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                sx={{
                  display: parseInt(params.row.status) === 2 ? "block" : "none",
                }}
              >
                <GridActionsCellItem
                  key="enable"
                  icon={
                    <Tooltip title="Publicar" arrow>
                      <PlayCircleOutline
                        style={{ fontSize: 24, color: "green" }}
                      />
                    </Tooltip>
                  }
                  label="Publicar"
                  onClick={openStatusEnableValue(params)}
                />
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                sx={{
                  display: parseInt(params.row.status) === 1 ? "block" : "none",
                }}
              >
                <GridActionsCellItem
                  key="pausar"
                  icon={
                    <Tooltip title="Pausar" arrow>
                      <PauseCircleOutline
                        style={{ fontSize: 24, color: "orange" }}
                      />
                    </Tooltip>
                  }
                  label="Pausar"
                  onClick={openStatusValue(params)}
                />
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                sx={{
                  display:
                    UserAuth.profile_id === 1
                      ? params.row.status === 0
                        ? "none"
                        : "block"
                      : "none",
                }}
              >
                <GridActionsCellItem
                  key="delete"
                  icon={
                    <Tooltip title="Eliminar" arrow>
                      <DeleteForever style={{ fontSize: 24, color: "red" }} />
                    </Tooltip>
                  }
                  label="Eliminar"
                  onClick={openStatusDeleteValue(params)}
                />
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                sx={{
                  display:
                    UserAuth.profile_id === 1
                      ? params.row.status === 0
                        ? "block"
                        : "none"
                      : "none",
                }}
              >
                <GridActionsCellItem
                  key="activated"
                  icon={
                    <Tooltip title="Activar" arrow>
                      <AddCircleOutline
                        style={{ fontSize: 24, color: "green" }}
                      />
                    </Tooltip>
                  }
                  label="Activar"
                  onClick={openStatusEnableValue(params)}
                />
              </Grid>
            </Grid>
          );

          return actions;
        },
      },
    ],
  });

  /*const formatCode = (number, length) => {
    return number.toString().padStart(length, "0");
  };*/

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const renderInfo = (row) => (
    <>
      <Typography sx={infoStyle}>
        <Loyalty sx={{ fontSize: 12, marginRight: 1, color: "#1d1d1b" }} />
        {row.typeOperation?.name}
      </Typography>
      <Typography sx={infoStyle}>
        <HomeWork sx={{ fontSize: 12, marginRight: 1, color: "#1d1d1b" }} />
        {row.typeProperty?.name}
      </Typography>
      <Typography sx={infoStyle}>
        <LocationOn sx={{ fontSize: 12, marginRight: 1, color: "#1d1d1b" }} />
        {row.cities?.name}
      </Typography>
    </>
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    RefreshTable();
  }, []);

  // Función para eliminar acentos de una cadena de texto
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.trim();
    setSearchText(searchValue); // Actualiza el estado de búsqueda

    // Filtrar los datos según el valor de búsqueda
    if (searchValue !== "") {
      const resultSearch = rows.filter(
        (item) =>
          removeAccents(item.title.toLowerCase()).includes(
            removeAccents(searchValue.toLowerCase())
          ) || item.code.toString().includes(searchValue)
      );

      setRows(resultSearch);
    } else {
      setRows(rowsResponse);
    }
  };

  const RefreshTable = async () => {
    setSearchText("");
    setLoader(true);

    let url = "";

    if (UserAuth.profile_id === 1) {
      url = `${urlServices}publications/list`;
    } else {
      url = `${urlServices}publications/list/user/${UserAuth.id}`;
    }

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + keyAuthorization,
        },
      });

      if (response.status === 200) {
        const transformedRows = response.data.map((data) => ({
          ...data,
          images: parseJsonArray(data.images),
          details: parseJsonArray(data.details),
          services: parseJsonArray(data.services),
          status:
            data.status !== 0
              ? data.publicationsPlans?.length === 0
                ? 99
                : data.status
              : data.status,
        }));

        const dataFinal = transformedRows.filter((filter) =>
          UserAuth.profile_id !== 1 ? filter.status !== 0 : filter
        );

        const deactivatePlanArray = response.data.filter(
          (row) =>
            row.publicationsPlans.length > 0 &&
            Moment(row.publicationsPlans[0].endDate).isBefore(new Date())
        );

        if (deactivatePlanArray.length > 0) {
          deactivateSubscription(deactivatePlanArray);
        }

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

  const deactivateSubscription = async (rowData) => {
    const requests = rowData.map(async (row) => {
      const value = {
        publicationsPlansId: row.publicationsPlans[0].id,
        publicationsId: row.id,
      };

      try {
        const response = await axios.post(
          `${urlServices}publications-plans/deactivate-subscription`,
          value,
          {
            headers: {
              Authorization: `Bearer ${keyAuthorization}`,
            },
          }
        );
        // console.log(`${row.id} actualizada correctamente.`);
        return response; // Puedes manejar la respuesta si es necesario
      } catch (error) {
        console.error(`Error al actualizar pregunta ${row.id}:`, error);
      }
    });

    // Esperar a que todas las promesas se resuelvan
    await Promise.all(requests);
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
    setIdRow({ id: data.row.id, status: 2, data: data.row });
    setOpenStatus(true);
  };

  const openStatusEnableValue = (data) => () => {
    setIdRow({ id: data.row.id, status: 1, data: data.row });
    setOpenStatus(true);
  };

  const openStatusDeleteValue = (data) => () => {
    setIdRow({ id: data.row.id, status: 0, data: data.row });
    setOpenStatus(true);
  };

  const openEditValue = (data) => () => {
    setIdRow(data);
    setOpenEdit(true);
  };

  const openViewValue = (data) => () => {
    setIdRow(data);
    setOpenView(true);
  };

  const openPlanPayValue = (data) => () => {
    setIdRow(data);
    setOpenPlanPay(true);
  };

  const openViewTransactionValue = (data) => () => {
    setIdRow(data.row.publicationsPlans[0].id);
    setOpenViewTransaction(true);
  };

  const openStatusEnableAdminValue = (data) => () => {
    setIdRow(data.row);
    setOpenViewFinalityTransaction(true);
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
  const handleCloseView = () => setOpenView(false);
  const handleClosePlanPay = () => setOpenPlanPay(false);
  const handleCloseViewTransaction = () => setOpenViewTransaction(false);
  const handleCloseStatus = () => setOpenStatus(false);
  const handleCloseStatusEnableAdmin = () =>
    setOpenViewFinalityTransaction(false);

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {openNew ? (
        <>
          <div className={classes.cardTitleBlack} style={{ margin: "12px 0" }}>
            <Add className={classes.iconFilter} /> Crear tu publicación{" "}
            <ButtonExit startIcon={<Close />} onClick={handleCloseNew}>
              SALIR DEL REGISTRO
            </ButtonExit>
          </div>
          <NewPropertiesAdmin
            open={openNew}
            exit={handleCloseNew}
            callBackRefresh={RefreshTable}
          />
        </>
      ) : openEdit ? (
        <>
          <div className={classes.cardTitleBlack} style={{ margin: "12px 0" }}>
            <Edit className={classes.iconFilter} /> Editar tu publicación{" "}
            <ButtonExit startIcon={<Close />} onClick={handleCloseEdit}>
              SALIR DEL EDITAR
            </ButtonExit>
          </div>
          <EditPropertiesAdmin
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
              <List className={classes.iconFilter} /> Listado de inmuebles
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
                          Agregar inmueble
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
          {openView && (
            <ViewRealEstateSingle
              open={openView}
              exit={handleCloseView}
              id={idRow}
            />
          )}
          {openPlanPay && (
            <PlansListPay
              open={openPlanPay}
              exit={handleClosePlanPay}
              callBackRefresh={RefreshTable}
              id={idRow}
            />
          )}
          {openViewTransaction && (
            <ViewTransactionProperty
              open={openViewTransaction}
              exit={handleCloseViewTransaction}
              id={idRow}
            />
          )}
          {openStatus && (
            <StatusPropertyAdmin
              open={openStatus}
              exit={handleCloseStatus}
              id={idRow}
              callBackRefresh={RefreshTable}
            />
          )}
          {openViewFinalityTransaction && (
            <StatusActivatedAdminProperty
              open={openViewFinalityTransaction}
              exit={handleCloseStatusEnableAdmin}
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
        </Grid>
      )}
    </>
  );
}
