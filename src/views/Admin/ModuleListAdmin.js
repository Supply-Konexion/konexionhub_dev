import React, {
  Fragment,
  useState,
  forwardRef,
  useContext,
  useEffect,
} from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Redirect } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import {
  Search,
  // Cancel,
  FormatListBulleted,
  AddCircle,
  CheckCircle,
} from "@mui/icons-material";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from "axios";
import MaterialTable from "material-table";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import NewModuleAdmin from "views/dialog/NewModuleAdmin";
import EditModuleAdmin from "views/dialog/EditModuleAdmin";

import { cardBodyStyle } from "assets/jss/material-dashboard-react/components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

function generate(element) {
  return element.map((value) => (
    <ListItem dense>
      <ListItemIcon>
        <CheckCircle style={{ color: "#000", fontSize: 16 }} />
      </ListItemIcon>
      <ListItemText primary={value.name} />
    </ListItem>
  ));
}

export default function MenuListAdmin() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [idRow, setIdRow] = useState("");
  const [openEdit, setopenEdit] = useState(false);
  const [openBackdrop, setoOpenBackdrop] = useState(false);
  const [openNew, setopenNew] = useState(false);
  const [returnLogin, setReturnLogin] = React.useState(false);

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  const tableIcons = {
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  };

  const [state] = useState({
    columns: [
      {
        title: "Nombre",
        field: "name",
        width: "15%",
        cellStyle: {
          // whiteSpace: "nowrap",
          border: "1px solid rgb(241, 241, 241)",
          fontSize: 14,
        },
      },
      {
        title: "Orden",
        field: "order",
        width: "5%",
        cellStyle: {
          whiteSpace: "nowrap",
          border: "1px solid rgb(241, 241, 241)",
          fontSize: 14,
          textAlign: "center",
        },
      },
      {
        title: "SubMódulos",
        field: "resource",
        width: "20%",
        render: (rowData) => (
          <Fragment>
            <List dense={false}>{generate(rowData.resource)}</List>
          </Fragment>
        ),
        cellStyle: {
          // whiteSpace: "nowrap",
          border: "1px solid rgb(241, 241, 241)",
          fontSize: 14,
        },
      },
    ],
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    axios
      .get(`${urlServices}modules`, {
        headers: {
          application: keyAplication,
          Authorization: "Bearer " + keyAuthorization,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setRows(response.data.rows);
          setLoader(false);
        }
      })
      .catch((e) => {
        if (e.response.status === 404) {
          setLoader(false);
          setRows([]);
        } else if (e.response.status === 401) {
          setTimeout(() => {
            localStorage.clear();
            setReturnLogin(true);
          }, 200);
        } else {
          setError(true);
          setRows([]);
        }
      });
  }, [keyAplication, urlServices, keyAuthorization]);

  const RefreshTable = () => {
    setoOpenBackdrop(true);

    axios
      .get(`${urlServices}modules`, {
        headers: {
          Authorization: "Bearer " + keyAuthorization,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setRows(response.data.rows);
          setLoader(false);
          setoOpenBackdrop(false);
        }
      })
      .catch((e) => {
        if (e.response.status === 404) {
          setLoader(false);
          setRows([]);
          setoOpenBackdrop(false);
        } else if (e.response.status === 401) {
          setTimeout(() => {
            localStorage.clear();
            setReturnLogin(true);
          }, 200);
        } else {
          setError(true);
          setRows([]);
          setoOpenBackdrop(false);
        }
      });
  };

  const handleCloseNew = () => {
    setopenNew(false);
  };

  const handleCloseEdit = () => {
    setopenEdit(false);
  };

  if (returnLogin) {
    return <Redirect to="/" />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <div className={classes.cardTitleWhite}>
              <FormatListBulleted className={classes.iconWhite} /> Módulos y
              submódulos
            </div>
          </CardHeader>
          <CardBody>
            {error ? (
              <Alert severity="error">
                Error en la consulta con sel servidor.
              </Alert>
            ) : (
              ""
            )}
            {loader ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Box sx={{ width: "100%" }}>
                    <Skeleton
                      width="40%"
                      height={40}
                      style={{ float: "right" }}
                    />
                    <Skeleton width="100%" height={300} />
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <Fragment>
                <Grid container>
                  <Grid item xs={12} sm={12}>
                    <Button
                      className={classes.buttonRight}
                      onClick={(event) => {
                        setopenNew(true);
                      }}
                      startIcon={<AddCircle />}
                    >
                      Agregar módulo
                    </Button>
                  </Grid>
                </Grid>
                <MaterialTable
                  title=""
                  columns={state.columns}
                  style={{
                    boxShadow: "unset",
                    border: "1px solid rgb(241, 241, 241)",
                  }}
                  data={rows}
                  localization={{
                    pagination: {
                      labelRowsSelect: "Filas",
                      labelDisplayedRows: " {from}-{to} de {count}",
                      firstTooltip: "Primera página",
                      previousTooltip: "Previo",
                      nextTooltip: "Siguiente",
                      lastTooltip: "Ultima página",
                    },
                    toolbar: {
                      // nRowsSelected: '{0} row(s) selected',
                      searchTooltip: "Filtrar",
                      searchPlaceholder: "Buscar",
                    },
                    header: {
                      actions: " --- ",
                    },
                    body: {
                      emptyDataSourceMessage: "No hay datos.",
                      filterRow: {
                        filterTooltip: "Filtro",
                      },
                    },
                  }}
                  actions={[
                    {
                      icon: "edit",
                      tooltip: "Editar",
                      onClick: (event, rowData) => {
                        setopenEdit(true);
                        setIdRow(rowData);
                      },
                    },
                    /*{
                            icon: "delete",
                            tooltip: "Eliminar",
                            onClick: (event, rowData) => {
                              setOpenDelete(true);
                              setIdRow(rowData);
                            },
                          },*/
                    /* (rowData1) => ({
                      icon: () => <Cancel />,
                      tooltip: "Deshabilitar",
                      onClick: (event, rowData) => {
                        setOpenDelete(true);
                        setIdRow(rowData);
                      },
                      hidden: rowData1.status === 1 ? false : true,
                    }),
                    (rowData2) => ({
                      icon: () => <AddCircle style={{ color: "green" }} />,
                      tooltip: "Habilitar",
                      onClick: (event, rowData) => {
                        setOpenAdd(true);
                        setIdRow(rowData);
                      },
                      hidden: rowData2.status === 0 ? false : true,
                    }),*/
                    {
                      icon: "refresh",
                      tooltip: "Refresh Data",
                      isFreeAction: true,
                      onClick: () => RefreshTable(),
                    },
                  ]}
                  icons={tableIcons}
                  options={{
                    search: true,
                    padding: "default",
                    filtering: false,
                    actionsColumnIndex: -1,
                    pageSize: 10,
                    headerStyle: {
                      background: "#F2F2F2",
                      padding: "1%",
                      fontWeight: "bold",
                      textAlign: "center",
                    },
                    cellStyle: { border: "1px solid #DDDDDD" },
                  }}
                />
              </Fragment>
            )}
          </CardBody>
        </Card>
      </GridItem>

      {openNew ? (
        <NewModuleAdmin
          open={openNew}
          exit={handleCloseNew}
          callBackRefresh={RefreshTable}
        />
      ) : (
        ""
      )}
      {/*openView ? (
        <ViewCompositionsAdmin
          open={openView}
          data={idRow}
          exit={handleCloseView}
        />
      ) : (
        ""
      )*/}
      {openEdit ? (
        <EditModuleAdmin
          open={openEdit}
          data={idRow}
          exit={handleCloseEdit}
          callBackRefresh={RefreshTable}
        />
      ) : (
        ""
      )}
      <Backdrop
        style={{ zIndex: "9999", color: "#FFFFFF" }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </GridContainer>
  );
}
