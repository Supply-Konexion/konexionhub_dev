import React from "react";
//import { Link } from "react-router-dom";
// reactstrap components
import { Button, NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

import { Copyright, StarBorder } from "@mui/icons-material";

import {
  TitleTextPage,
  ParagraphTextPage,
  blackColor,
} from "components/cardBodyStyle";

export default function Footer() {
  return (
    <footer className="footer" style={{ background: blackColor }}>
      <Container>
        <Row>
          <Col xs="12" md="8">
            <TitleTextPage
              style={{
                color: "#FFF",
                fontSize: 22,
              }}
            >
              White Lion VIP <StarBorder />
            </TitleTextPage>
            <ParagraphTextPage
              style={{
                color: "#ffffff",
                fontSize: 14,
              }}
            >
              Conoce sobre nosotros y todo lo que ofrece nuestra plataforma.
              <Button
                href="/information"
                //onClick={handleClickOpenDemo}
                className="btn-round"
                color="info"
                size="sm"
                style={{
                  background: "rgb(16, 185, 129)",
                  color: "#ffffff",
                  marginLeft: 10,
                  letterSpacing: ".011em",
                  fontFamily: "sans-serif",
                }}
              >
                <b>Saber más</b>
              </Button>
            </ParagraphTextPage>
            <div className="btn-wrapper profile">
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://www.instagram.com/"
                id="tooltip622135962"
                target="_blank"
              >
                <i className="fab fa-instagram" />
              </Button>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple"
                color="default"
                href="https://wa.link/"
                id="tooltip230450801"
                target="_blank"
              >
                <i className="fab fa-whatsapp" />
              </Button>
            </div>
          </Col>
          <Col xs="12" md="4">
            <Nav style={{ marginTop: "-30px" }}>
              <NavItem>
                <NavLink href="/">
                  <ParagraphTextPage
                    style={{
                      fontWeight: "bold",
                      fontSize: 10,
                      color: "#ffffff",
                    }}
                  >
                    - Políticas de privacidad
                  </ParagraphTextPage>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">
                  <ParagraphTextPage
                    style={{
                      fontWeight: "bold",
                      fontSize: 10,
                      color: "#ffffff",
                    }}
                  >
                    - Terminos y condiciones
                  </ParagraphTextPage>
                </NavLink>
              </NavItem>
              <NavItem>
                {/*<NavLink href="https://creative-tim.com/contact-us?ref=blkdsr-footer">*/}
                <ParagraphTextPage style={{ color: "#ffffff", fontSize: 14 }}>
                  <center>
                    Copyright <Copyright />
                    white lion vip. {1900 + new Date().getYear()}
                  </center>
                </ParagraphTextPage>
                {/*</NavLink>*/}
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
