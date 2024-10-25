import React, { Fragment, useEffect, useContext, useState } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Navigate } from "react-router-dom";

import { makeStyles } from "@mui/styles";
import {
  Grid,
  DialogActions,
  DialogContent,
  Dialog,
  Alert,
} from "@mui/material";
import axios from "axios";
import Moment from "moment";
import { CreditScore } from "@mui/icons-material";

import loaderGif from "assets/img/loading.gif";

import {
  cardBodyStyle,
  TitleTextPage,
  ParagraphTextPage,
  ButtonExit,
} from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function ViewTransactionProperty(props) {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [mensageSystem, setMensageSystem] = useState("");
  const [returnLogin, setReturnLogin] = React.useState(false);

  const { urlServices, UserAuth } = useContext(UrlServicesContext);

  let keyAuthorization = UserAuth.Session;

  useEffect(() => {
    SearchData();
  }, []);

  const SearchData = async () => {
    setLoader(true);

    try {
      const response = await axios.get(
        `${urlServices}publications-plans/${props.id}`,
        {
          headers: {
            Authorization: `Bearer ${keyAuthorization}`,
          },
        }
      );

      if (response.status === 200) {
        setRows(response.data);
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

  const handleCloseDialog = (pro) => (event) => {
    props.exit();
  };

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  return (
    <Fragment>
      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={handleCloseDialog(true)}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        keepMounted
        scroll="body"
        PaperProps={{
          sx: {
            borderRadius: 6,
          },
        }}
      >
        <DialogContent dividers className={classes.styleDialogContent}>
          <Fragment>
            <Grid container className={classes.containerProfile}>
              <Grid item xs={12} sm={12}>
                {error ? <Alert severity="error">{mensageSystem}</Alert> : ""}
                <div
                  className={classes.cardTitleBlack}
                  style={{ margin: "12px 0" }}
                >
                  <CreditScore className={classes.iconFilter} /> Transacción
                </div>
              </Grid>
              {loader ? (
                <Grid item xs={12} sm={12}>
                  <center>
                    <img
                      alt="loaderGif"
                      src={loaderGif}
                      style={{ width: 60, marginTop: 40 }}
                    />
                  </center>
                </Grid>
              ) : (
                <>
                  <Grid item xs={6} sm={6}>
                    <Alert
                      severity="success"
                      icon={false}
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TitleTextPage style={{ fontSize: 16 }}>
                        {rows[0].startDate ? Moment(rows[0].startDate).format("DD-MM-YYYY") : "---"}
                      </TitleTextPage>
                      <ParagraphTextPage
                        style={{
                          fontSize: 10,
                          margin: "1px 0",
                          textAlign: "center",
                        }}
                      >
                        FECHA DE INICIO
                      </ParagraphTextPage>
                    </Alert>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Alert
                      severity="error"
                      icon={false}
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TitleTextPage style={{ fontSize: 16 }}>
                        {rows[0].endDate ? Moment(rows[0].endDate).format("DD-MM-YYYY") : "---"}
                      </TitleTextPage>
                      <ParagraphTextPage
                        style={{
                          fontSize: 10,
                          margin: "1px 0",
                          textAlign: "center",
                        }}
                      >
                        FECHA FIN
                      </ParagraphTextPage>
                    </Alert>
                  </Grid>
                  <Grid item xs={6} sm={6} style={{ margin: "25px 0 5px 0" }}>
                    {" "}
                    <TitleTextPage
                      style={{ fontSize: 18, textAlign: "center" }}
                    >
                      <span style={{ fontWeight: 400, fontSize: 14 }}>
                        Plan:{" "}
                      </span>
                      {rows[0].plans.name}
                    </TitleTextPage>
                  </Grid>
                  <Grid item xs={6} sm={6} style={{ margin: "25px 0 5px 0" }}>
                    {" "}
                    <TitleTextPage
                      style={{ fontSize: 18, textAlign: "center" }}
                    >
                      <span style={{ fontWeight: 400, fontSize: 14 }}>
                        Precio:{" "}
                      </span>{" "}
                      ${rows[0].plans.price}
                    </TitleTextPage>
                  </Grid>
                  <Grid item xs={12} sm={12} style={{ margin: " 5px 0" }}>
                    <ParagraphTextPage style={{ fontSize: 14 }}>
                      Suscripción{" "}
                      <b>
                        {rows[0].status === 1 && rows[0].transactionStatus === 1
                          ? "ACTIVA"
                          : rows[0].status === 0 && rows[0].transactionStatus === 1
                          ? "FINALIZADA"
                          :  rows[0].status === 0 && rows[0].transactionStatus === 3
                          ? "RECHAZADO"
                          : "PENDIENTE"}
                      </b>
                    </ParagraphTextPage>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <ParagraphTextPage
                      style={{ fontSize: 14, margin: "5px 0" }}
                    >
                      Número de pedido: <b>{rows[0].orderNumber}</b>
                    </ParagraphTextPage>
                  </Grid>
                </>
              )}
            </Grid>
          </Fragment>
        </DialogContent>
        <DialogActions>
          <ButtonExit onClick={handleCloseDialog(true)}>Cerrar</ButtonExit>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
