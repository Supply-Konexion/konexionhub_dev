import React, {
  Fragment,
  useState,
  forwardRef,
  useContext,
  useEffect,
} from 'react'
import { UrlServicesContext } from 'components/UrlServicesContext'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// core components
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import { Search, Mail } from '@mui/icons-material'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardBody from 'components/Card/CardBody.js'
import MaterialTable from 'material-table'
import format from 'date-fns/format'

import SendRecoveryPass from 'views/dialog/SendRecoveryPass'

import { cardBodyStyle } from 'assets/jss/material-dashboard-react/components/cardBodyStyle'

const useStyles = makeStyles(cardBodyStyle)

export default function RecoveryMailApplicants() {
  const classes = useStyles()
  const tableRef = React.createRef()

  const [openMail, setOpenMail] = useState(false)
  const [idRow, setIdRow] = useState('')

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  const tableIcons = {
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  }

  const [state] = useState({
    columns: [
      {
        title: 'Nombres y apellidos',
        field: 'name,lastName',
        render: (rowData) => {
          return <b>{rowData.name + ' ' + rowData.lastName}</b>
        },
        width: '50%',
        cellStyle: {
          whiteSpace: 'nowrap',
          border: '1px solid rgb(241, 241, 241)',
          fontSize: 14,
        },
      },
      {
        title: 'Correo electrónico',
        field: 'email',
        width: '30%',
        cellStyle: {
          // whiteSpace: "nowrap",
          border: '1px solid rgb(241, 241, 241)',
          fontSize: 14,
        },
      },
      {
        title: 'Registrado',
        render: (rowData) =>
          format(new Date(rowData.createdAt), 'dd-MM-yyyy kk:mm:ss'),
        width: '10%',
        cellStyle: {
          // whiteSpace: "nowrap",
          border: '1px solid rgb(241, 241, 241)',
          fontSize: 14,
          textAlign: 'center',
        },
      },
      {
        title: 'Estado',
        field: 'status',
        render: (rowData) => {
          const text =
            rowData.status === 1
              ? 'ACTIVO'
              : rowData.status === 99
              ? 'Pendiente'
              : 'INACTIVO'
          const color =
            rowData.status === 1
              ? 'green'
              : rowData.status === 99
              ? 'orange'
              : 'red'
          return <b style={{ color: color }}>{text}</b>
        },
        width: '1%',
        cellStyle: {
          // whiteSpace: "nowrap",
          textAlign: 'CENTER',
          border: '1px solid rgb(241, 241, 241)',
          fontSize: 12,
        },
      },
    ],
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const RefreshTable = () => {
    tableRef.current && tableRef.current.onQueryChange()
  }

  const handleCloseMail = () => {
    setOpenMail(false)
  }

  let url = ''

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <div className={classes.cardTitleWhite}>
              <Mail className={classes.iconWhite} /> Listado de candidatos
            </div>
          </CardHeader>
          <CardBody>
            <Fragment>
              <MaterialTable
                title=""
                tableRef={tableRef}
                columns={state.columns}
                style={{
                  boxShadow: 'unset',
                  border: '1px solid rgb(241, 241, 241)',
                }}
                data={(query) =>
                  new Promise((resolve, reject) => {
                    if (query.search === '') {
                      url = `${urlServices}users/account/${localStorage.getItem(
                        'account_id'
                      )}/candidates?limit=${query.pageSize}&page=${
                        query.page + 1
                      }`
                    } else {
                      url = `${urlServices}users/account/${localStorage.getItem(
                        'account_id'
                      )}/candidates?`
                    }
                    fetch(url, {
                      method: 'get',
                      headers: {
                        Authorization: 'Bearer ' + keyAuthorization,
                      },
                    })
                      .then((response) => response.json())
                      .then((result) => {
                        resolve({
                          //data: result.data,
                          data:
                            result.data !== undefined
                              ? result.data.filter(function (obj) {
                                  return Object.keys(obj).some(function (key) {
                                    return obj[key]
                                      ? obj[key]
                                          .toString()
                                          .toLowerCase()
                                          .includes(query.search)
                                      : false
                                  })
                                })
                              : [],
                          page: result.page !== undefined ? result.page - 1 : 0,
                          totalCount:
                            result.total !== undefined ? result.total : 0,
                        })
                      })
                  })
                }
                localization={{
                  pagination: {
                    labelRowsSelect: 'Filas',
                    labelDisplayedRows: ' {from}-{to} de {count}',
                    firstTooltip: 'Primera página',
                    previousTooltip: 'Previo',
                    nextTooltip: 'Siguiente',
                    lastTooltip: 'Ultima página',
                  },
                  toolbar: {
                    // nRowsSelected: '{0} row(s) selected',
                    searchTooltip: 'Filtrar',
                    searchPlaceholder: 'Buscar',
                  },
                  header: {
                    actions: ' --- ',
                  },
                  body: {
                    emptyDataSourceMessage: 'No hay datos.',
                    filterRow: {
                      filterTooltip: 'Filtro',
                    },
                  },
                }}
                actions={[
                  (rowData1) => ({
                    icon: () => <Mail />,
                    tooltip: 'Enviar correo',
                    onClick: (event, rowData) => {
                      setOpenMail(true)
                      setIdRow(rowData)
                    },
                    hidden:
                      rowData1.email === '' || rowData1.email === null
                        ? true
                        : rowData1.status === 1
                        ? false
                        : true,
                  }),
                  {
                    icon: 'refresh',
                    tooltip: 'Refresh Data',
                    isFreeAction: true,
                    onClick: () =>
                      tableRef.current && tableRef.current.onQueryChange(),
                  },
                ]}
                icons={tableIcons}
                options={{
                  search: true,
                  padding: 'default',
                  filtering: false,
                  actionsColumnIndex: -1,
                  pageSize: 10,
                  headerStyle: {
                    background: '#F2F2F2',
                    padding: '1%',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  },
                  cellStyle: { border: '1px solid #DDDDDD' },
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
        ''
      )}
    </GridContainer>
  )
}
