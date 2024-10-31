import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// @material-ui/core
import { makeStyles } from "@mui/styles";
import { Search, Add, GridView } from "@mui/icons-material";
// core components
import { TextField, Grid, Divider } from "@mui/material";

import SearchProviders from "views/Dialog/SearchProviders";

import {
  dashboardStyle,
  TitleTextPage,
  ButtonStyle0,
} from "components/dashboardStyle.js";

const useStyles = makeStyles(dashboardStyle);

export default function Dashboard() {
  const classes = useStyles();

  const [openSearchProviders, setOpenSearchProviders] = useState(false);
  const [viewServicesPage, setViewServicesPage] = useState(false);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Función para eliminar acentos de una cadena de texto
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearchChange = (event) => {
    const value = event.target.value; // Obtener el valor del input

    if (value !== "") {
      setSearchText(removeAccents(value.toLowerCase())); // Actualizar el estado del texto de búsqueda
    } else {
      setSearchText("");
    }
  };

  const handleSearchClick = (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    if (searchText !== "") {
      setOpenSearchProviders(true);
    }
  };

  const viewServices = () => () => {
    setViewServicesPage(true);
  };

  const handleCloseSearchProviders = () => setOpenSearchProviders(false);

  if (viewServicesPage) {
    localStorage.setItem("controllerRouter", "/account/services");
    return <Navigate to="/account/services" />;
  }

  return (
    <div className={classes.cardDashboardTop}>
      <Grid
        container
        sx={{
          pt: "3%",
          background: `linear-gradient(to top, rgba(0, 132, 182, 0.9) -15%, rgba(0, 132, 182, 0) 30%)`,
          borderRadius: 2,
        }}
      >
        <Grid item xs={12} sm={12} sx={{ p: "1% 3%" }}>
          <TitleTextPage sx={{ fontSize: 24 }}>
            <GridView sx={{ color: "#29ACE2", fontSize: 34 }} />
            <span style={{ verticalAlign: "middle" }}>
              {" "}
              Huānyíng - Bienvenido
            </span>
          </TitleTextPage>
        </Grid>
        <Grid item xs={12} sm={12} sx={{ textAlign: "center", mt: "5%" }}>
          <TitleTextPage sx={{ color: "#0084B6", fontSize: 14 }}>
            <span style={{ fontWeight: 400 }}>¿Estás buscando</span>{" "}
            PROVEEDORES?
          </TitleTextPage>
        </Grid>
        <Grid item xs={12} sm={12} sx={{ p: "30px 3%" }}>
          <center>
            {/* Campo de búsqueda */}
            <form onSubmit={handleSearchClick}>
              <TextField
                variant="outlined"
                value={searchText}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <Search
                      onClick={handleSearchClick}
                      position="start"
                      sx={{
                        color: "#0084B6",
                        fontSize: 32,
                        marginRight: 1,
                        cursor: "pointer",
                      }}
                    />
                  ),
                }}
                sx={{
                  width: { xs: "100%", sm: "60%" },
                  "& .MuiInputBase-input::placeholder": {
                    fontSize: "12px", // Cambia el tamaño del texto del placeholder
                    color: "rgba(0, 0, 0, 0.6)", // Opcional: Cambia el color del placeholder
                  },
                }}
                autoComplete="off"
                placeholder="Ingrese el producto a buscar o nombre del proveedor"
              />
            </form>
          </center>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{ color: "#646567", textAlign: "center" }}
        >
          <TitleTextPage sx={{ fontSize: 16 }}>
            "Nunca fué tan fácil buscar proveedores"
          </TitleTextPage>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            color: "#BDBEC0",
            mt: "15%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Divider sx={{ width: "85%" }}>
            <TitleTextPage
              sx={{
                padding: "7px 15px",
                background: "#0084B6",
                fontWeight: "bold",
                color: "#ffffff",
                borderRadius: 5,
                fontSize: 12,
                width: 180,
              }}
            >
              Más servicios{" "}
              <Add
                position="start"
                style={{
                  color: "#ffffff",
                  fontSize: 18,
                }}
              />
            </TitleTextPage>
          </Divider>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <Grid container sx={{ p: "3% 2%" }}>
            <Grid item xs={12} sm={4}>
              <ButtonStyle0
                onClick={viewServices()}
                style={{ marginTop: 35, width: 250 }}
              >
                Servicios Konexion
              </ButtonStyle0>
            </Grid>
            <Grid item xs={12} sm={4}>
              <ButtonStyle0 style={{ marginTop: 35, width: 250 }} disabled>
                Negocios
              </ButtonStyle0>
            </Grid>
            <Grid item xs={12} sm={4}>
              <ButtonStyle0 style={{ marginTop: 35, width: 250 }} disabled>
                Cotizador de productos y servicios
              </ButtonStyle0>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {openSearchProviders && (
        <SearchProviders
          open={openSearchProviders}
          exit={handleCloseSearchProviders}
          search={searchText}
        />
      )}
    </div>
  );
}
