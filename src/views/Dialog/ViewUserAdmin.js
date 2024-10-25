import React, { Fragment } from "react";

import { makeStyles } from "@mui/styles";
import { Grid, DialogActions, DialogContent, Dialog } from "@mui/material";
import Moment from "moment";
import { Person, WhatsApp } from "@mui/icons-material";

import {
  cardBodyStyle,
  TitleTextPage,
  ParagraphTextPage,
  ButtonExit,
  blackColor,
} from "components/cardBodyStyle";

const useStyles = makeStyles(cardBodyStyle);

export default function ViewUserAdmin(props) {
  const classes = useStyles();

  const handleCloseDialog = (pro) => (event) => {
    props.exit();
  };

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
                <div
                  className={classes.cardTitleBlack}
                  style={{ margin: "12px 0" }}
                >
                  <Person
                    className={classes.iconFilter}
                    sx={{ fontSize: "38px !important" }}
                  />{" "}
                  Registro del usuario
                </div>
              </Grid>
              <Grid item xs={6} sm={4} sx={{ m: "8px 0" }}>
                <TitleTextPage style={{ fontSize: 14 }}>
                  Nombre y apellido:
                </TitleTextPage>
              </Grid>
              <Grid item xs={6} sm={8} sx={{ m: "8px 0" }}>
                <ParagraphTextPage>{props.id.row.allNames}</ParagraphTextPage>
              </Grid>
              <Grid item xs={6} sm={4} sx={{ m: "8px 0" }}>
                <TitleTextPage style={{ fontSize: 14 }}>
                  Documento ID:
                </TitleTextPage>
              </Grid>
              <Grid item xs={6} sm={8} sx={{ m: "8px 0" }}>
                <ParagraphTextPage>{props.id.row.documentId}</ParagraphTextPage>
              </Grid>
              <Grid item xs={6} sm={4} sx={{ m: "8px 0" }}>
                <TitleTextPage style={{ fontSize: 14 }}>
                  Correo electrónico:
                </TitleTextPage>
              </Grid>
              <Grid item xs={6} sm={8} sx={{ m: "8px 0" }}>
                <ParagraphTextPage>{props.id.row.email}</ParagraphTextPage>
              </Grid>
              <Grid item xs={6} sm={4} sx={{ m: "8px 0" }}>
                <TitleTextPage style={{ fontSize: 14 }}>
                  Teléfono:
                </TitleTextPage>
              </Grid>
              <Grid item xs={6} sm={8} sx={{ m: "8px 0" }}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <ParagraphTextPage>{props.id.row.phone}</ParagraphTextPage>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <a
                      href={`https://wa.me/${props.id.row.phone}`}
                      style={{
                        color: blackColor,
                        fontWeight: "bold",
                        padding: "4px 8px",
                        background: "#dcf8c6",
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsApp /> Abrir chat
                    </a>
                  </Grid>
                </Grid>
              </Grid>
              {props.id.row.profile && (
                <>
                  <Grid item xs={6} sm={4} sx={{ m: "8px 0" }}>
                    <TitleTextPage style={{ fontSize: 14 }}>
                      Perfil:
                    </TitleTextPage>
                  </Grid>
                  <Grid item xs={6} sm={8} sx={{ m: "8px 0" }}>
                    <ParagraphTextPage
                      style={{
                        padding: 5,
                        background: props.id.row.profile.color,
                        textAlign: "center",
                      }}
                    >
                      {props.id.row.profile.name}
                    </ParagraphTextPage>
                  </Grid>
                </>
              )}
              <Grid item xs={6} sm={4} sx={{ m: "8px 0" }}>
                <TitleTextPage style={{ fontSize: 14 }}>
                  Fecha del registro:
                </TitleTextPage>
              </Grid>
              <Grid item xs={6} sm={8} sx={{ m: "8px 0" }}>
                <ParagraphTextPage>
                  {Moment(props.id.row.createdAt).format("DD-MM-YYYY")}
                </ParagraphTextPage>
              </Grid>
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
