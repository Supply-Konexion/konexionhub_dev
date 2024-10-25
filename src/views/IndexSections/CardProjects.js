import React, { useContext } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";

import { Card, CardActionArea, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";

const CardSearch = ({ property }) => {
  const { urlServices, urlWeb } = useContext(UrlServicesContext);

  const imageSetUrl = (image) => {
    // Construir el nuevo nombre de la imagen
    return `${urlServices}documents/images_project/${image}`;
  };

  return (
    <Grid item xs={12} md={3}>
      <Card
        sx={{
          position: "relative",
          transition: "transform 0.2s ease-out",
          "&:hover": {
            transform: "scale(1.02)", // Cambia la escala al 102% en hover para el efecto de pulso
          },
        }}
      >
        <CardActionArea
          href={`${urlWeb}project?page=${property.slug}`}
          target="_blank"
        >
          <ImageListItem key={1}>
            <img
              src={imageSetUrl(property.images[0]?.images)}
              alt={property.id}
              loading="lazy"
              style={{ width: "100%", height: 200, objectFit: "cover" }}
            />
            <ImageListItemBar
              title={property.cities?.name}
              sx={{ fontWeight: "bold" }}
              subtitle=""
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${1}`}
                >
                  <Button
                    href={`${urlWeb}project?page=${property.slug}`}
                    target="_blank"
                    sx={{
                      background: "#ffffff",
                      color: "#000000",
                      fontWeight: "bold",
                      borderRadius: 30,
                      fontSize: 10,
                      "&:hover": {
                        color: "#ffffff",
                      },
                    }}
                    size="sm"
                  >
                    Ver
                  </Button>
                </IconButton>
              }
            />
          </ImageListItem>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default CardSearch;
