import React from "react";

// core components
import { Grid } from "@mui/material";

// sections for this page/view
import Login from "views/IndexSections/Login.js";

import backgroundImge from "assets/img/Fondoazuliniciosesion.jpeg";

export default function Index() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImge})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh", // Usar minHeight para asegurar que ocupa toda la altura
          display: "flex", // Usar flexbox
          flexDirection: "column", // Para alinear verticalmente
        }}
      >
        <Grid container sx={{ flexGrow: 1 }}>
          <Grid item xs={12} md={8} sx={{ height: "100%" }}></Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              p: 5,
              background: `linear-gradient(to top, rgba(0, 132, 182, 0.9), rgba(0, 132, 182, 0))`,
              height: "100vh", // Asegura que ocupa toda la altura
            }}
          >
            <Login />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
