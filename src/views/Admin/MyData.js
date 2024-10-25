import React, { Fragment, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import NumberFormat from "react-number-format";

import { cardBodyStyle } from "assets/jss/material-dashboard-react/components/cardBodyStyle";

import img from "assets/img/undraw_hombre.png";

const useStyles = makeStyles(cardBodyStyle);

export default function MyData(props) {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "Hector Daniel",
    lastname: "Echeverria",
    age: "20",
    mail: "test@polygraph.com",
    errorName: false,
    errorLastName: false,
    errorAge: false,
    errorMail: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
      errorName: false,
      errorLastName: false,
      errorAge: false,
      errorMail: false,
    });
  }; 

  return (
    <Fragment>
      <Grid container spacing={1} className={classes.containerProfile}>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <div className={classes.titleCardFilter}>
                Datos personales del candidato
              </div>
              <div className={classes.lineBottom}></div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <center>
                <img
                  alt="avatar"
                  src={img}
                  style={{ width: 300, margin: "7px 0" }}
                />
              </center>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl style={{ width: "100%" }}>
                    <TextField
                      name="name"
                      value={values.name}
                      error={values.errorName}
                      onChange={handleChange("name")}
                      fullWidth
                      required
                      label="Nombres"
                      margin="dense"
                      autoComplete="off"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl style={{ width: "100%" }}>
                    <TextField
                      name="lastname"
                      value={values.lastname}
                      error={values.errorLatasName}
                      onChange={handleChange("lastname")}
                      fullWidth
                      required
                      label="Apellidos"
                      margin="dense"
                      autoComplete="off"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl style={{ width: "100%" }}>
                    <TextField
                      name="mail"
                      value={values.mail}
                      error={values.errorMail}
                      onChange={handleChange("mail")}
                      fullWidth
                      required
                      label="Correo electrónico"
                      margin="dense"
                      autoComplete="off"
                      disabled
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <NumberFormat
                    customInput={TextField}
                    name="age"
                    value={values.age}
                    onChange={handleChange("age")}
                    //prefix={"$"}
                    // thousandSeparator="."
                    //  decimalSeparator=","
                    allowNegative={false}
                    inputProps={{
                      style: {
                        textAlign: "center",
                        fontSize: 16,
                      },
                    }}
                    label="Edad"
                    fullWidth
                    autoComplete="off"
                    margin="dense"
                    required
                    error={values.errorAge}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl style={{ width: "100%" }}>
                    <TextField
                      name="mail"
                      value="Soltero"
                      error={values.errorMail}
                      onChange={handleChange("mail")}
                      fullWidth
                      required
                      label="Estado civil"
                      margin="dense"
                      autoComplete="off"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl style={{ width: "100%" }}>
                    <TextField
                      name="mail"
                      value="Superior"
                      error={values.errorMail}
                      onChange={handleChange("mail")}
                      fullWidth
                      required
                      label="Escolaridad"
                      margin="dense"
                      autoComplete="off"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl style={{ width: "100%" }}>
                    <TextField
                      name="mail"
                      value="Masculino"
                      error={values.errorMail}
                      onChange={handleChange("mail")}
                      fullWidth
                      required
                      label="Género"
                      margin="dense"
                      autoComplete="off"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <br></br>
              <center>
                <Button
                  type="submit"
                  className={classes.buttonSubmit}
                  //  onClick={submitForm}
                >
                  Guardar
                </Button>
              </center>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}
