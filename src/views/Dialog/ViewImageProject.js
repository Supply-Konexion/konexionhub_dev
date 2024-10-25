import React, { Fragment, useContext } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";

import { Grid, DialogActions, DialogContent, Dialog } from "@mui/material";
// reactstrap components
import { Button } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "components/Styles/sliderProject_styles.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function ViewImageProject(props) {
  const { urlServices } = useContext(UrlServicesContext);

  const handleCloseDialog = (pro) => (event) => {
    props.exit();
  };

  return (
    <Fragment>
      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={handleCloseDialog(true)}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        keepMounted
        scroll="body"
        PaperProps={{
          sx: {
            borderRadius: 6,            
          },
        }}
      >
        <DialogContent dividers sx={{ padding: 0 }}>
          <Fragment>
            <Grid container>
              <Grid item xs={12} sm={12}>
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="sliderProject"
                >
                  {props.images.map((image, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={`${urlServices}documents/images_project/${image.images}`}
                        alt={`imageSlider${i})`}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: 450,
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
            </Grid>
          </Fragment>
        </DialogContent>
        <DialogActions>
          <Button
            className="btn-round"
            color="info"
            size="md"
            style={{
              background: "#000000",
              color: "#ffffff",
              letterSpacing: ".011em",
              fontFamily: "sans-serif",
              fontSize: 12,
              padding: "5px 20px",
            }}
            onClick={handleCloseDialog(true)}
          >
            Salir
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
