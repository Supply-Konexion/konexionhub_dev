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
    color: "#000000",
    fontSize: 12,
  },
}));

export default function LoadPrefixes(props) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);
  const [isLoadedd, setIsLoadedd] = useState(true);

  const { urlServices } = useContext(UrlServicesContext);

  useEffect(() => {
    const consultar = async () => {
      await axios
        .get(`${urlServices}country-prefixes/list`)
        .then((response) => {
          setResults(response.data);
          setIsLoadedd(true);
        })
        .catch((e) => {
          setResults(null);
          setError(true);
          setIsLoadedd(false);
        });
    };
    consultar();
  }, [urlServices]);

  return (
    <Fragment>
      {error && (
        <Alert severity="error">
          Error en la consulta de <b>PAIS</b>
        </Alert>
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
          getOptionLabel={(option) =>
            `${option.countrie} (${option.prefix})` || "Seleccione ..."
          }
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={(params) => (
            <TextField
              {...params}
              label="País"
              variant="outlined"
              margin="dense"
              error={props.error}
              required
              InputLabelProps={{ style: { color: "#FFFFFF" } }}
              inputProps={{
                ...params.inputProps,
                autoComplete: "off",
              }}
              fullWidth
              sx={{
                color: "#FFFFFF", // Cambiar el color del texto
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFFFFF", // Cambiar el color del borde
                  borderRadius: 5,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFFFFF", // Cambiar el color del borde al pasar el ratón
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FFFFFF", // Cambiar el color del borde al estar enfocado
                },
                "& input": {
                  color: "#FFFFFF", // Cambiar el color del texto
                },
              }}
              placeholder="Seleccione..."
            />
          )}
          PaperComponent={(props) => <CustomPaper {...props} />}
          renderOption={(props, option) => (
            <MenuItem {...props} key={option.prefix}>
              {option.countrie} ({option.prefix})
            </MenuItem>
          )}
          classes={{
            clearIndicatorDirty: "none",
            popupIndicator: "none",
          }}
        />
      )}
    </Fragment>
  );
}
