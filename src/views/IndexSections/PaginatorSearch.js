import React, { useState } from "react";
import { Grid, Container, Pagination } from "@mui/material";
import CardSearch from "./CardSearch";

import noDataImg from "assets/img/undraw_House_searching_re_stk8.png";

import { ParagraphTextPage } from "components/cardBodyStyle";

const PaginatorSearch = ({ properties }) => {
  const [page, setPage] = useState(1);
  const propertiesPerPage = 12; // Número de propiedades por página

  const handlePageChange = (event, value) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(value);
  };

  const startIndex = (page - 1) * propertiesPerPage;
  const displayedProperties = properties.slice(
    startIndex,
    startIndex + propertiesPerPage
  );
  return (
    <Container>
      <Grid container spacing={3}>
        {displayedProperties.length > 0 ? (
          displayedProperties.map((property, index) => (
            <CardSearch key={index} property={property} />
          ))
        ) : (
          <Grid item xs={12} md={12}>
            <center>
              <img
                alt="loaderGif"
                src={noDataImg}
                style={{ width: 350, marginTop: 50 }}
              />
              <ParagraphTextPage
                style={{ fontSize: 18, margin: "5px 0 70px 0" }}
              >
                No hay registros para mostrar
              </ParagraphTextPage>
            </center>
          </Grid>
        )}
      </Grid>
      <Pagination
        count={Math.ceil(properties.length / propertiesPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        size="large"
        siblingCount={1}
        boundaryCount={1}
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
};

export default PaginatorSearch;
