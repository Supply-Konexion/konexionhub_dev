import React, { useContext } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";

import { TitleTextPage, ParagraphTextPage } from "components/cardBodyStyle";

import ViewRealEstateSingle from "views/Dialog/ViewRealEstateSingle";

const CardSearch = ({ property }) => {
  const [idRow, setIdRows] = React.useState();
  const [open, setOpen] = React.useState(false);

  const { urlServices } = useContext(UrlServicesContext);

  const handleOpenClose = () => {
    setOpen(false);
  };
  // Función para formatear el precio con separadores de decenas de miles
  const formatPrice = (price) => {
    const integerPrice = Math.floor(price); // O usa parseInt(price)
    return integerPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      const truncatedText = text.substring(0, maxLength);
      return (
        <>
          {truncatedText}
          <span style={{ fontWeight: "bold", fontSize: 12 }}>
            {" "}
            [Ver más...]
          </span>
        </>
      );
    } else {
      return text;
    }
  };

  const imageSetUrl = (image) => {
    // Obtener el nombre y la extensión de la imagen
    const [baseName, extension] = image
      .split(".")
      .reduce(
        ([base, ext], part, index, arr) =>
          index === arr.length - 1
            ? [base, part]
            : [`${base}${base ? "." : ""}${part}`, ext],
        ["", ""]
      );

    // Construir el nuevo nombre de la imagen
    const newImageName = `${baseName}_600x400.${extension}`;
    return `${urlServices}documents/images_properties/600x400/${newImageName}`;
  };

  const openViewValue = (data) => () => {
    const initialValue = {
      price: data.price,
      descriptionLocation: data.descriptionLocation,
      images: data.images,
      cities: { name: data.cities?.name },
      cityId: data.cityId,
      countries: { name: data.countries?.name },
      countriesId: data.countriesId,
      createdAt: data.createdAt,
      description: data.description,
      details: data.details,
      services: data.services,
      typeProperty: { name: data.typeProperty?.name },
      public: true,
    };

    const row = { row: initialValue };
    const result = { ...data, ...row };

    setIdRows(result);
    setOpen(true);
  };

  return (
    <Grid item xs={12} md={4}>
      <Card
        sx={{
          position: "relative",
          transition: "transform 0.2s ease-out",
          "&:hover": {
            transform: "scale(1.02)", // Cambia la escala al 102% en hover para el efecto de pulso
          },
        }}
      >
        <CardActionArea onClick={openViewValue(property)}>
          <CardMedia
            component="img"
            height="200"
            image={
              property.images[0]?.images
                ? imageSetUrl(property.images[0]?.images)
                : property.images
            } // URL de la imagen de la propiedad
            alt={property.title} // Título de la propiedad como texto alternativo
          />
          <CardContent>
            <Grid container>
              <Grid item xs={12} sm={5}>
                <TitleTextPage style={{ fontSize: 18 }}>
                  ${formatPrice(property.price)}
                </TitleTextPage>
              </Grid>
              <Grid item xs={12} sm={7}>
                <TitleTextPage style={{ fontSize: 13, float: "right" }}>
                  {property.cityName || property.cities?.name}
                </TitleTextPage>
              </Grid>
            </Grid>

            <ParagraphTextPage style={{ fontSize: 14 }}>
              {truncateText(property.descriptionLocation, 50)}
            </ParagraphTextPage>
          </CardContent>
        </CardActionArea>
      </Card>
      {open && (
        <ViewRealEstateSingle open={open} exit={handleOpenClose} id={idRow} />
      )}
    </Grid>
  );
};

export default CardSearch;
