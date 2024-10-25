import React, { Fragment, useEffect, useState, useContext } from "react";

import { UrlServicesContext } from "../UrlServicesContext";
import axios from "axios";
import {
  TextField,
  Grid,
  Box,
  Alert,
  Autocomplete,
  Skeleton,
  MenuItem,
  Paper,
} from "@mui/material";

import { styled } from "@mui/material/styles";

// Estilo personalizado para el Paper del menú
const CustomPaper = styled(Paper)(({ theme }) => ({
  "& .MuiMenuItem-root": {
    color: "#000000", // Cambia el color del texto aquí
  },
}));

export default function LoadStates(props) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);
  const [isLoadedd, setIsLoadedd] = useState(false);

  const { urlServices } = useContext(UrlServicesContext);

  useEffect(() => {
    const consultar = async () => {
      await axios
        .get(`${urlServices}location/states/list`)
        .then((response) => {
          setIsLoadedd(true);

          if (!props.disabled) {
            let result = response.data.filter(
              (filtered) =>
                Number(filtered.location_id) === Number(props.idCountries)
            );

            setResults(result);
          }
        })
        .catch((e) => {
          setResults(null);
          setError(true);
          setIsLoadedd(false);
        });
    };
    consultar();
  }, [urlServices, props.disabled, props.idCountries]);

  return (
    <Fragment>
      {error ? (
        <Alert severity="error">
          Error en la consulta de <b>PROVINCIAS</b>
        </Alert>
      ) : (
        ""
      )}
      {!isLoadedd ? (
        <Fragment>
          <Grid item xs={12} sm={12}>
            <center>
              <Box sx={{ width: "100%" }}>
                <Skeleton width="100%" height={35} />
              </Box>
            </center>
          </Grid>
        </Fragment>
      ) : (
        <Autocomplete
          id="combo-box-demo"
          options={results}
          value={props.value}
          onChange={(event, newValue) => {
            props.refresh(newValue);
          }}
          getOptionLabel={(option) => option.name || "Seleccione ..."}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Provincia"
              variant="outlined"
              margin="dense"
              error={props.error}
              required
              size="small"
              inputProps={{
                ...params.inputProps,
                autoComplete: "off", // disable autocomplete and autofill
              }}
              style={{ background: "#FFFFFF" }}
            />
          )}
          disabled={props.disabled}
          classes={{
            clearIndicatorDirty: "none",
            popupIndicator: "none",
          }}
          PaperComponent={(props) => <CustomPaper {...props} />}
          renderOption={(props, option) => (
            <MenuItem {...props} key={option.value}>
              {option.name}
            </MenuItem>
          )}
        />
      )}
    </Fragment>
  );
}
