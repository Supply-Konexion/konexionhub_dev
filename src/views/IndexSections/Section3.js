import React, { useEffect } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "components/Styles/section3_styles.css";
// import required modules
import { Navigation, Pagination } from "swiper/modules";

import { Button, Row, Col } from "reactstrap";
import { ArrowRightAlt } from "@mui/icons-material";
import {
  ButtonBase,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
} from "@mui/material";
import axios from "axios";

import noimage from "assets/img/noimage.jpeg";

import {
  TitleTextPage,
  ParagraphTextPage,
  blackColor,
} from "components/cardBodyStyle";

import ViewRealEstateSingle from "views/Dialog/ViewRealEstateSingle";

export default function Section3(props) {
  const [idRow, setIdRows] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [openLoader, setOpenLoader] = React.useState(true);

  const { urlServices } = React.useContext(UrlServicesContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${urlServices}publications/list/page`);

      const transformedRows = response.data.map((data) => ({
        ...data,
        images: parseJsonArray(data.images),
        services: parseJsonArray(data.services),
        details: parseJsonArray(data.details),
      }));

      setRows(transformedRows);
      setOpenLoader(false);
    } catch (error) {
      setOpenLoader(false);
    }
  };

  // Función para parsear cadenas JSON y asegurar que sean arrays
  const parseJsonArray = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return [];
    }
  };

  const handleOpenClose = () => {
    setOpen(false);
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

  const formatPrice = (price) => {
    const integerPrice = Math.floor(price); // O usa parseInt(price)
    return integerPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
    <div
      className="section section-tabs"
      id="basic-elements"
      style={{ background: "#ffffff" }}
    >
      <TitleTextPage
        style={{
          marginLeft: 60,
          marginBottom: 15,
        }}
      >
        {props.data[2].textMain}
      </TitleTextPage>
      <ParagraphTextPage
        style={{
          marginLeft: 60,
          marginBottom: 40,
        }}
      >
        {props.data[2].textSecondary}
      </ParagraphTextPage>
      {openLoader ? (
        <Row>
          {[...Array(4)].map((_, idx) => (
            <Col key={idx} className="ml-auto mr-auto" xs="12" md="3">
              <Skeleton variant="rectangular" height={150} animation="wave" />
            </Col>
          ))}
        </Row>
      ) : (
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation, Pagination]}
          className="section3"
        >
          {rows.length > 0 ? (
            rows.map((data, i) => {
              return (
                <SwiperSlide key={i}>
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="imageInterna"
                  >
                    {data.images.map((data2, i2) => {
                      return (
                        <SwiperSlide>
                          <ButtonBase
                            focusRipple
                            key={i2}
                            onClick={openViewValue(data)}
                          >
                            <ImageListItem key={1}>
                              <img
                                src={imageSetUrl(data2.images)}
                                alt={`Image ${i2}`}
                                loading="lazy"
                                style={{ height: 250 }}
                              />
                              <ImageListItemBar
                                title={data.cities?.name}
                                subtitle={"$" + formatPrice(data.price)}
                              />
                            </ImageListItem>
                          </ButtonBase>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </SwiperSlide>
              );
            })
          ) : (
            <Row>
              {[...Array(5)].map((_, i) => (
                <SwiperSlide key={i}>
                  <ImageListItem>
                    <img
                      src={noimage}
                      alt={`Image ${i}`}
                      loading="lazy"
                      style={{ height: 200 }}
                    />                  
                  </ImageListItem>
                </SwiperSlide>
              ))}
            </Row>
          )}
        </Swiper>
      )}
      <center>
        <Button
          href="/search"
          className="btn-round"
          color="info"
          size="lg"
          style={{
            marginTop: 40,
            background: blackColor,
            color: "#ffffff",
            letterSpacing: ".011em",
            fontFamily: "sans-serif",
          }}
        >
          <b>
            {props.data[2].buttons[0].button1Text} &nbsp;&nbsp;
            <ArrowRightAlt />
          </b>
        </Button>
      </center>
      {open && (
        <ViewRealEstateSingle open={open} exit={handleOpenClose} id={idRow} />
      )}
    </div>
  );
}
