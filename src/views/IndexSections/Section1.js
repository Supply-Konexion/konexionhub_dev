import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "components/Styles/pageHeader_styles.css";
// reactstrap components
import { Container, Row, Col, Button } from "reactstrap";
import { ArrowRightAlt, Person } from "@mui/icons-material";

import { TitleTextPage, ParagraphTextPage } from "components/cardBodyStyle";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { blackColor } from "components/material-dashboard-react";

export default function Section1(props) {
  const [isActive, setIsActive] = React.useState(false);
  const [textColor, setTextColor] = React.useState({
    color: blackColor,
    borderColor: blackColor,
  });

  const returnSignUp = () => {
    setIsActive(true);
    props.signUp(true);
  };

  return (
    <div
      className="section section-tabs"
      style={{
        background:
          "linear-gradient(#ccc, #ffffff, #ffffff, #ffffff, #ffffff, #ffffff ,#ffffff)",
        paddingTop: 130,
      }}
    >
      <Container
        style={{ padding: "70px 0px 20px 0px", background: "#FFFFFF" }}
      >
        <div className="header-filter">
          <Row>
            <Col className="ml-auto mr-auto" md="10" xl="6">
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
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="headerSlider"
              >
                {props.data[0].images.map((data, i) => (
                  <SwiperSlide>
                    <img
                      src={`${props.urlServices}documents/images_templates/${data.images}`}
                      alt={`img${i}`}
                      style={{ height: 400 }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Col>
            <Col
              className="ml-auto mr-auto"
              md="10"
              xl="6"
              style={{ padding: "40px 0 40px 40px" }}
            >
              <TitleTextPage style={{ marginBottom: 40 }}>
                {props.data[0].textMain}
              </TitleTextPage>
              <ParagraphTextPage>
                {props.data[0].textSecondary}
              </ParagraphTextPage>
              <Button
                onClick={returnSignUp}
                className="btn-round"
                color="info"
                size="lg"
                style={{
                  marginTop: 40,
                  marginRight: 10,
                  color: isActive ? blackColor : textColor.color,
                  background: isActive ? "#ffffff" : "transparent",
                  letterSpacing: ".011em",
                  fontFamily: "sans-serif",
                  border: `1px solid ${
                    isActive ? "transparent" : textColor.borderColor
                  }`,
                }}
                active={isActive}
                onMouseOver={() => {
                  setIsActive(false);
                  setTextColor({
                    color: "#ffffff",
                    borderColor: "transparent",
                  });
                }}
                onMouseOut={() => {
                  setIsActive(false);
                  setTextColor({ color: blackColor, borderColor: blackColor });
                }}
              >
                <b>
                  {props.data[0].buttons[0].button1Text} &nbsp;&nbsp;
                  <Person />
                </b>
              </Button>
              <Button
                href="/information"
                className="btn-round"
                color="info"
                size="lg"
                style={{
                  marginTop: 40,
                  marginLeft: 10,
                  background: blackColor,
                  color: "#ffffff",
                  letterSpacing: ".011em",
                  fontFamily: "sans-serif",
                }}
              >
                <b>
                  {props.data[0].buttons[1].button2Text} &nbsp;&nbsp;
                  <ArrowRightAlt />
                </b>
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
