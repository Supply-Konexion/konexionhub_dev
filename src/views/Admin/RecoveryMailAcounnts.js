import React, {
  Fragment,
  useState,
  forwardRef,
  useContext,
  useEffect,
} from "react";
import { UrlServicesContext } from "components/UrlServicesContext";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { Search, Mail } from "@mui/icons-material";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MaterialTable from "material-table";
import format from "date-fns/format";

import SendRecoveryPass from "views/dialog/SendRecoveryPass";

import { cardBodyStyle } from "assets/jss/material-dashboard-react/components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function RecoveryMailAcounnts() {
  const classes = useStyles();
  const tableRef = React.createRef();

  const [openMail, setOpenMail] = useState(false);
  const [idRow, setIdRow] = useState("");

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  const tableIcons = {
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  };

  const [state] = useState({
    columns: [
      {
        title: "Cuenta",
        field: "name,lastName, companyName",
        filtering: false,
        render: (rowData) => {
          return (
            <Fragment>
              {rowData.name + " " + rowData.lastName}{" "}
              {rowData.companyName !== "" ? (
                <b style={{ fontSize: 11 }}>({rowData.companyName})</b>
              ) : (
                ""
              )}{" "}
            </Fragment>
          );
        },
        width: "30%",
        cellStyle: {
          // whiteSpace: "nowrap",
          border: "1px solid rgb(241, 241, 241)",
          textAlign: "left",
          fontSize: 12,
        },
        headerStyle: { textAlign: "center" },
      },
      {
        title: "Email",
        field: "email",
        width: "25%",
        cellStyle: {
          // whiteSpace: "nowrap",
          border: "1px solid rgb(241, 241, 241)",
          fontSize: 12,
        },
      },
      /*{
        title: "Ubicación",
        render: (rowData) => {
          return (
            <Fragment>
              <b style={{ fontSize: 11 }}>
                {rowData.city.state.name + "/" + rowData.city.name}
              </b>
            </Fragment>
          );
        },
        width: "10%",
        cellStyle: {
          // whiteSpace: "nowrap",
          border: "1px solid rgb(241, 241, 241)",
          fontSize: 12,
          textAlign: "center",
        },
      },*/
      {
        title: "Registrado",
        render: (rowData) => format(new Date(rowData.createdAt), "dd-MM-yyyy"),
        width: "10%",
        cellStyle: {
          // whiteSpace: "nowrap",
          border: "1px solid rgb(241, 241, 241)",
          fontSize: 12,
          textAlign: "center",
        },
      },
      {
        title: "Estado",
        field: "status",
        render: (rowData) => {
          const text =
            rowData.status === 1
              ? "ACTIVO"
              : rowData.status === 2
              ? "PENDIENTE "
              : "INACTIVO";
          const color =
            rowData.status === 1
              ? "green"
              : rowData.status === 2
              ? "orange "
              : "red";
          return <b style={{ color: color }}>{text}</b>;
        },
        width: "5%",
        cellStyle: {
          // whiteSpace: "nowrap",
          textAlign: "CENTER",
          border: "1px solid rgb(241, 241, 241)",
          fontSize: 12,
        },
      },
    ],
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const RefreshTable = () => {
    tableRef.current && tableRef.current.onQueryChange();
  };

  const handleCloseMail = () => {
    setOpenMail(false);
  };

  let url = "";

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <div className={classes.cardTitleWhite}>
              <Mail className={classes.iconWhite} /> Listado de clientes
            </div>
          </CardHeader>
          <CardBody>
            <Fragment>
              <MaterialTable
                title=""
                tableRef={tableRef}
                columns={state.columns}
                style={{
                  boxShadow: "unset",
                  border: "1px solid rgb(241, 241, 241)",
                }}
                data={(query) =>
                  new Promise((resolve, reject) => {
                    if (query.search === "") {
                      url = `${urlServices}accounts?limit=${
                        query.pageSize
                      }&page=${query.page + 1}`;
                    } else {
                      url = `${urlServices}accounts`;
                    }
                    fetch(url, {
                      method: "get",
                      headers: {
                        Authorization: "Bearer " + keyAuthorization,
                      },
                    })
                      .then((response) => response.json())
                      .then((result) => {
                        resolve({
                          //data: result.data,
                          data: result.data.filter(function (obj) {
                            return Object.keys(obj).some(function (key) {
                              return obj[key]
                                ? obj[key]
                                    .toString()
                                    .toLowerCase()
                                    .includes(query.search)
                                : false;
                            });
                          }),
                          page: result.page - 1,
                          totalCount: result.total,
                        });
                      });
                  })
                }
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
                  (rowData1) => ({
                    icon: () => <Mail />,
                    tooltip: "Enviar correo",
                    onClick: (event, rowData) => {
                      setOpenMail(true);
                      setIdRow(rowData);
                    },
                    hidden: rowData1.status === 1 ? false : true,
                  }),
                  {
                    icon: "refresh",
                    tooltip: "Refresh Data",
                    isFreeAction: true,
                    onClick: () =>
                      tableRef.current && tableRef.current.onQueryChange(),
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
          </CardBody>
        </Card>
      </GridItem>
      {openMail ? (
        <SendRecoveryPass
          open={openMail}
          exit={handleCloseMail}
          id={idRow}
          callBackRefresh={RefreshTable}
        />
      ) : (
        ""
      )}
    </GridContainer>
  );
}
