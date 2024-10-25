import React, { Fragment, useState, useContext, useCallback } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";
import debounce from "lodash.debounce";

import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { AddCircle, Delete } from "@mui/icons-material";
import {
  Grid,
  Button,
  DialogActions,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Slide,
  Snackbar,
  TextField,
  Alert,
  Dialog,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";

import {
  cardBodyStyle,
  ButtonStyle0,
  ButtonExit,
} from "components/cardBodyStyle";

const StyledTableRow = styled(TableRow)({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#FAFAFA",
    },
  },
});

const useStyles = makeStyles(cardBodyStyle);

export default function NewPlansAdmin(props) {
  const classes = useStyles();

  const [openAlertSuccess, setopenAlertSuccess] = useState(false);
  const [mensaje_success, setmensaje_success] = useState("");
  const [returnLogin, setReturnLogin] = React.useState(false);
  const [error, setError] = useState(false);
  const [mensageSystem, setMensageSystem] = useState("");
  const [rowsItem, setrowsItem] = useState([]);
  const [checked, setChecked] = React.useState(false);
  const [checkedMostImportant, setCheckedMostImportant] = useState(false);
  const [alert, setAlert] = React.useState({
    openAlert: false,
    errorAlert: "error",
    mensaje: "",
  });

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  const [values, setValues] = useState({
    namePlan: "",
    price: "",
    nameItem: "",
    errorNameItem: false,
    errorNamePlan: false,
    errorPrice: false,
  });

  const handleChange = useCallback(
    debounce((prop, value) => {
      setValues((prevValues) => ({
        ...prevValues,
        [prop]: value,
        errorNameItem: false,
        errorNamePlan: false,
        errorPrice: false,
      }));

      setAlert((prevAlert) => ({
        ...prevAlert,
        openAlert: false,
      }));
    }, 10),
    []
  );

  const handleCloseDialog = (pro) => (event) => {
    props.exit();
  };

  const submitForm = (e) => {
    e.preventDefault();
    setopenAlertSuccess(false);

    if (values.namePlan.length === 0) {
      setValues({ ...values, errorNamePlan: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "El campo Nombre del plan es obligatorio.",
      });
    } else if (values.price.length === 0) {
      setValues({ ...values, errorPrice: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "El campo Precio es obligatorio.",
      });
    } else if (rowsItem.length === 0) {
      setValues({ ...values, errorNameItem: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Debe agregar un item para el plan",
      });
    } else {
      let planID = [];
      let axiosPromises = [];
      const errorsArray = [];

      const insert = async () => {
        const valueData = {
          name: values.namePlan,
          price: values.price,
          highlight: checked ? 1 : 0,
          popular: checkedMostImportant ? 1 : 0,
          createdUserId: UserAuth.id,
        };

        // Agregar la promesa de axios a nuestro array
        axiosPromises.push(
          axios
            .post(`${urlServices}plans`, valueData, {
              headers: {
                Authorization: "Bearer " + keyAuthorization,
              },
            })
            .then((response) => {
              planID.push({
                plan_id: response.data.plans.id,
              });
            })
            .catch((error) => {
              console.log(error);
              errorsArray.push(valueData); // Guardar los datos que dieron error
              // setLoadersSave(false);
            })
        );
      };

      insert();

      // Esperar a que todas las promesas se resuelvan
      Promise.all(axiosPromises)
        .then(() => {
          const itemsPromises = [];

          rowsItem.forEach((data) => {
            const valuesItems = {
              planId: planID[0].plan_id,
              name: data.nameItem,
            };

            itemsPromises.push(InsertItems(valuesItems));
          });

          // Esperar a que se completen todas las llamadas
          return Promise.allSettled(itemsPromises);
        })
        .then((results) => {
          // Aquí puedes manejar tanto los éxitos como los errores
          const errorsIntems = results.filter(
            (result) => result.value.isAxiosError
          );

          //  setErrorListPlan(errorsArray);
          // setErrorListItemsPlan(errorsIntems);

          setopenAlertSuccess(true);
          setmensaje_success("Datos guardados exitosamente.");
          props.callBackRefresh();

          setValues({
            ...values,
            namePlan: "",
            price: "",
          });

          setChecked(false);
          setCheckedMostImportant(false);

          setrowsItem([]);
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
            setMensageSystem("Error en la consulta con sel servidor.");
            setError(true);
          }
        });
    }
  };

  const InsertItems = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${urlServices}items-plan`, data, {
          headers: {
            Authorization: "Bearer " + keyAuthorization,
          },
        })
        .then((response) => {
          resolve(response); // Resolvemos la promesa con la respuesta de axios
        })
        .catch((error) => {
          //reject(error); // Rechazamos la promesa con el error de axios
          resolve(error);
        });
    });
  };

  const handleAdd = () => {
    if (values.nameItem.length === 0) {
      setValues({ ...values, errorNameItem: true });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "Agregue un texto.",
      });
    } else {
      setrowsItem([
        ...rowsItem,
        {
          nameItem: values.nameItem,
        },
      ]);

      setValues({
        ...values,
        nameItem: "",
        errorNameItem: false,
      });
    }
  };

  const handleRemoveClick = (i) => {
    const list = [...rowsItem];
    list.splice(i, 1);
    setrowsItem(list);
  };

  const handleChangeChecked = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeCheckedMostImportant = (event) => {
    setCheckedMostImportant(event.target.checked);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ openAlert: false });
  };

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      <Dialog
        fullWidth
        onClose={handleCloseDialog(true)}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        keepMounted
        scroll="body"
        //style={{ zIndex: 100 }}
        PaperProps={{
          sx: {
            borderRadius: 6,
          },
        }}
      >
        <DialogContent dividers className={classes.styleDialogContent}>
          <Fragment>
            <Grid container spacing={1} className={classes.containerProfile}>
              <Grid item xs={12} sm={12}>
                {error ? <Alert severity="error">{mensageSystem}</Alert> : ""}
                <div className={classes.titleCardFilter}>
                  Nuevo plan de suscripción
                </div>
                <div className={classes.lineBottom}></div>
              </Grid>
              <Grid
                container
                spacing={1}
                style={{
                  borderRadius: 5,
                  padding: 10,
                }}
              >
                <Grid item xs={12} sm={8}>
                  <TextField
                    name="namePlan"
                    value={values.namePlan}
                    error={values.errorNamePlan}
                    onChange={(event) =>
                      handleChange("namePlan", event.target.value)
                    }
                    fullWidth
                    required
                    label="Nombre plan"
                    margin="dense"
                    autoComplete="off"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="price"
                    value={values.price}
                    error={values.errorPrice}
                    onChange={(event) =>
                      handleChange("price", event.target.value)
                    }
                    fullWidth
                    required
                    label="Precio plan"
                    margin="dense"
                    autoComplete="off"
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleChangeChecked}
                        name="mostSelect"
                      />
                    }
                    label="Más elegido"
                  />
                </Grid>
                <Grid item xs={12} sm={7}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedMostImportant}
                        onChange={handleChangeCheckedMostImportant}
                        name="mostImportant"
                      />
                    }
                    label="Más destacado"
                  />
                  <FormHelperText>
                    Plan más destacado para las publicaciones.
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} md={12} style={{ paddingTop: 8 }}>
                  <span
                    className={classes.cardTitleBlack}
                    style={{ fontSize: 14 }}
                  >
                    Agregar items:
                  </span>
                </Grid>
                <Grid item xs={8} sm={9}>
                  <TextField
                    name="nameItem"
                    value={values.nameItem}
                    error={values.errorNameItem}
                    onChange={(event) =>
                      handleChange("nameItem", event.target.value)
                    }
                    fullWidth
                    required
                    label="Texto item"
                    margin="dense"
                    autoComplete="off"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item xs={4} sm={3}>
                  <Button
                    style={{ marginTop: 12 }}
                    onClick={handleAdd}
                    startIcon={<AddCircle />}
                    variant="contained"
                    size="small"
                  >
                    Agregar
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  style={{ paddingLeft: 70, paddingRight: 70 }}
                >
                  {rowsItem.length > 0 ? (
                    <Table
                      className={classes.table}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableBody>
                        <TableCell component="th" scope="row">
                          <b>Items</b>{" "}
                        </TableCell>
                        <TableCell component="th" scope="row"></TableCell>
                        {rowsItem.map((row1, i1) => {
                          return (
                            <StyledTableRow key={i1}>
                              <TableCell
                                // align="center"
                                component="th"
                                scope="row"
                              >
                                {row1.nameItem}
                              </TableCell>
                              <TableCell
                                align="center"
                                component="th"
                                scope="row"
                              >
                                <Delete
                                  style={{
                                    cursor: "pointer",
                                    float: "right",
                                  }}
                                  onClick={() => handleRemoveClick(i1)}
                                />
                              </TableCell>
                            </StyledTableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  <br></br>
                  <center>
                    <ButtonStyle0 type="submit" onClick={submitForm}>
                      Guardar
                    </ButtonStyle0>
                  </center>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <center>
                    {openAlertSuccess && (
                      <Alert severity="success">{mensaje_success}</Alert>
                    )}
                  </center>
                </Grid>
              </Grid>
            </Grid>
            {alert.openAlert && (
              <Snackbar
                open={true}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={handleCloseAlert}
              >
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                  <Alert
                    onClose={handleCloseAlert}
                    severity={
                      alert.errorAlert === "error" ? "error" : "success"
                    }
                    elevation={6}
                    variant="filled"
                  >
                    {alert.mensaje}
                  </Alert>
                </Slide>
              </Snackbar>
            )}
          </Fragment>
        </DialogContent>
        <DialogActions>
          <ButtonExit onClick={handleCloseDialog(true)}>Cerrar</ButtonExit>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
