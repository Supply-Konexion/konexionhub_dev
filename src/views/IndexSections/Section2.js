import React, { useEffect } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "components/Styles/section2_styles.css";
// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Row, Col } from "reactstrap";
import {
  Button,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Skeleton,
} from "@mui/material";
import axios from "axios";

import noimage from "assets/img/noimage.jpeg";

import { TitleTextPage, ParagraphTextPage } from "components/cardBodyStyle";

export default function Section2(props) {
  const [rows, setRows] = React.useState([]);
  const [openLoader, setOpenLoader] = React.useState(true);

  const { urlServices, urlWeb } = React.useContext(UrlServicesContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${urlServices}project-post/list/page`);

      const transformedRows = response.data.map((data) => ({
        ...data,
        images: parseJsonArray(data.images),
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
  return (
    <div
      className="section section-tabs"
      id="basic-elements"
      style={{ background: "peachpuff" }}
    >
      <TitleTextPage
        style={{
          marginBottom: 15,
        }}
      >
        <center>{props.data[1].textMain}</center>
      </TitleTextPage>
      <ParagraphTextPage
        style={{
          marginBottom: 40,
        }}
      >
        <center>{props.data[1].textSecondary}</center>
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
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Navigation, Pagination]}
          className="section2"
        >
          {rows.length > 0 ? (
            rows.map((data, i) => {
              return (
                <SwiperSlide key={i}>
                  <ImageListItem>
                    <img
                      src={`${urlServices}documents/images_project/${data.images[0].images}`}
                      alt={`Image ${i}`}
                      loading="lazy"
                      style={{ height: 250 }}
                    />
                    <ImageListItemBar
                      title={data.cities?.name}
                      subtitle=""
                      actionIcon={
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about ${i}`}
                        >
                          <Button
                            href={`${urlWeb}project?page=${data.slug}`}
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
    </div>
  );
}
