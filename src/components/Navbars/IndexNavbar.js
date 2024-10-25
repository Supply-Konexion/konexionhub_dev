import React, { useContext } from "react";
import { UrlServicesContext } from "components/UrlServicesContext";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Row,
  Col,
  UncontrolledTooltip,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import { Person, KeyboardBackspace, Logout, Close } from "@mui/icons-material";
import {
  Drawer,
  Grid,
  TextField,
  IconButton,
  Alert,
  Slide,
  Snackbar,
  Box,
} from "@mui/material";
import axios from "axios";

import {
  TitleTextPage,
  TextMenuLink,
  ParagraphTextPage,
  blackColor,
  CircularProgressTheme,
} from "components/cardBodyStyle";

import LoadProfile from "components/Services/LoadProfile";
import LoadPrefixes from "components/Services/LoadPrefixes";
import Login from "views/IndexSections/Login";
import logo from "assets/img/LogotipoFondoTransparente_Konexion.png";
import success from "assets/img/success.jpg";

export default function IndexNavbar(props) {
  const [buttonStates, setButtonStates] = React.useState({
    defaultStyle: { color: blackColor, background: "transparent" },
  });
  const [login, setLogin] = React.useState(false);
  const [signUp, setSignUp] = React.useState(false);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  const [color2, setColor2] = React.useState({ borderBottom: 0 });
  const [loader, setloader] = React.useState(false);
  const [successTrue, setSuccessTrue] = React.useState(false);
  const [alert, setAlert] = React.useState({
    openAlert: false,
    errorAlert: "error",
    mensaje: "",
  });

  const { urlServices, UserAuth, LogoutAuth } = useContext(UrlServicesContext);

  const [values, setValues] = React.useState({
    email: "",
    profile: "",
    name: "",
    lastname: "",
    document: "",
    phone: "",
    profileData: "",
    prefix: "",
    prefixData: null,
    errorProfile: false,
    errorEmail: false,
    errorName: false,
    errorLastname: false,
    errorDocument: false,
    errorPhone: false,
    errorPrefix: false,
  });

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      //setColor("bg-info");
      setColor("");
      setColor2({ background: "#FFFFFF", borderBottom: "1px solid #CCCCCC" });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
      setColor2({ borderBottom: 0 });
    }
  };

  const handleMouseOver = (index) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        color: "#ffffff",
        background: blackColor,
      },
    }));
  };

  const handleMouseOut = (index) => {
    setButtonStates((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        color: blackColor,
        background: "transparent",
      },
    }));
  };

  const handleChange = (prop) => (event) => {
    setAlert({
      ...alert,
      openAlert: false,
    });
    setValues({
      ...values,
      [prop]: event.target.value,
      errorEmail: false,
      errorName: false,
      errorLastname: false,
      errorDocument: false,
      errorPhone: false,
    });
  };

  const changeProfile = (data) => {
    setValues({
      ...values,
      profile: data !== null ? data.id : "",
      profileData: data !== null ? data : "",
      errorProfile: false,
    });

    setAlert({
      ...alert,
      openAlert: false,
    });
  };

  const changePrefix = (data) => {
    setValues({
      ...values,
      prefix: data !== null ? data.prefix : null,
      prefixData: data !== null ? data : null,
      errorPrefix: false,
    });

    setAlert({
      ...alert,
      openAlert: false,
    });
  };

  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };

  const toggleDrawerSignUp = () => {
    setSignUp(true);
  };

  const toggleDrawerLogin = () => {
    setLogin(true);
  };

  const toggleDrawerCloseSignUp = () => {
    setAlert({
      ...alert,
      openAlert: false,
    });
    setValues({
      ...values,
      email: "",
      profile: "",
      name: "",
      lastname: "",
      document: "",
      phone: "",
      profileData: "",
      prefix: "",
      prefixData: null,
      errorEmail: false,
      errorName: false,
      errorLastname: false,
      errorDocument: false,
      errorPhone: false,
      errorProfile: false,
      errorPrefix: false,
    });
    setloader(false);
    setSuccessTrue(false);
    setSignUp(false);
    props.signUpClose(false);
  };

  const toggleDrawerCloseLogin = () => {
    setLogin(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({
      ...alert,
      openAlert: false,
    });
  };

  const handleLogout = () => {
    LogoutAuth();
    localStorage.clear();
  };

  const submitFormSignUp = () => (event) => {
    event.preventDefault();

    if (values.profile.length === 0) {
      setValues({
        ...values,
        errorProfile: true,
      });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "El campo perfil es obligatorio.",
      });
    } else if (values.email.length === 0) {
      setValues({
        ...values,
        errorEmail: true,
      });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "El campo correo electrónico es obligatorio.",
      });
    } else if (values.name.length === 0) {
      setValues({
        ...values,
        errorName: true,
      });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "El campo nombre es obligatorio.",
      });
    } else if (values.lastname.length === 0) {
      setValues({
        ...values,
        errorLastname: true,
      });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "El campo apellido es obligatorio.",
      });
    } else if (values.document.length === 0) {
      setValues({
        ...values,
        errorDocument: true,
      });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "El campo cédula o RUC es obligatorio.",
      });
    } else if (values.prefix.length === 0) {
      setValues({
        ...values,
        errorPrefix: true,
      });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "El campo país es obligatorio.",
      });
    } else if (values.phone.length === 0) {
      setValues({
        ...values,
        errorPhone: true,
      });
      setAlert({
        ...alert,
        openAlert: true,
        errorAlert: "error",
        mensaje: "El campo teléfono es obligatorio.",
      });
    } else {
      setloader(true);

      const data = {
        profileId: values.profile,
        email: values.email.trim(),
        name: values.name,
        lastName: values.lastname,
        allNames: `${values.name} ${values.lastname}`,
        documentId: values.document,
        phone: `+${values.prefix}${values.phone}`,
        password: "",
      };

      axios
        .post(`${urlServices}users`, data)
        .then((response) => {
          if (response.status === 200) {
            setTimeout(() => {
              setAlert({
                ...alert,
                openAlert: true,
                errorAlert: "success",
                mensaje: "Cuenta creada con éxito.",
              });

              setloader(false);
              setSuccessTrue(true);
            }, 1000);
          }
        })
        .catch((e) => {
          setloader(false);
          if (e.response.status === 409) {
            setValues({
              ...values,
              errorEmail: true,
            });
            setAlert({
              ...alert,
              openAlert: true,
              errorAlert: "error",
              mensaje: e.response.data.message,
            });
          } else {
            setAlert({
              ...alert,
              openAlert: true,
              errorAlert: "error",
              mensaje:
                "Error interno con el servidor, comunicase con el administrador.",
            });
          }
        });
    }
  };

  return (
    <>
      <Navbar
        className={"fixed-top " + color}
        style={color2}
        color-on-scroll="100"
        expand="lg"
      >
        <div className="navbar-translate">
          <NavbarBrand
            to="/"
            tag={Link}
            id="navbar-brand"
            style={{ marginLeft: 50 }}
          >
            <Row>
              <Col xs="5" md="5">
                <center>
                  <img alt="logo" src={logo} style={{ width: 55 }} />
                </center>
              </Col>
              <Col xs="7" md="7">
                <TitleTextPage
                  style={{
                    fontSize: 22,
                    color: blackColor,
                    marginTop: 15,
                  }}
                >
                  White Lion VIP
                </TitleTextPage>
              </Col>
            </Row>
          </NavbarBrand>
          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            Inicio
          </UncontrolledTooltip>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
            style={{ background: blackColor }}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
          style={{ background: "#ffffff" }}
        >
          <div className="navbar-collapse-header">
            <Row>
              {/*<Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  BLK•React
                </a>
              </Col>*/}
              <Col className="collapse-close text-right" xs="12">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <Close style={{ color: blackColor, fontSize: 34 }} />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            {/*<NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/CreativeTim"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Twitter"
              >
                <i className="fab fa-twitter" />
                <p className="d-lg-none d-xl-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/CreativeTim"
                rel="noopener noreferrer"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="fab fa-facebook-square" />
                <p className="d-lg-none d-xl-none">Facebook</p>
              </NavLink>
            </NavItem>*/}
            <NavItem className="p-0" style={{ marginTop: 5 }}>
              <TextMenuLink
                style={{
                  ...(buttonStates[0] || buttonStates.defaultStyle),
                  padding: "5px 10px",
                  borderRadius: 50,
                  transition: "background-color 0.3s, color 0.3s",
                }}
                disableFocusRipple={true}
                href="/"
                onMouseOver={() => handleMouseOver(0)}
                onMouseOut={() => handleMouseOut(0)}
              >
                Inicio
              </TextMenuLink>
            </NavItem>
            <NavItem className="p-0" style={{ marginTop: 5 }}>
              <TextMenuLink
                style={{
                  ...(buttonStates[4] || buttonStates.defaultStyle),
                  padding: "5px 10px",
                  borderRadius: 50,
                  transition: "background-color 0.3s, color 0.3s",
                }}
                disableFocusRipple={true}
                href="/information"
                onMouseOver={() => handleMouseOver(4)}
                onMouseOut={() => handleMouseOut(4)}
              >
                Saber más
              </TextMenuLink>
            </NavItem>
            <NavItem className="p-0" style={{ marginTop: 5 }}>
              <TextMenuLink
                style={{
                  ...(buttonStates[1] || buttonStates.defaultStyle),
                  padding: "5px 10px",
                  borderRadius: 50,
                  transition: "background-color 0.3s, color 0.3s",
                }}
                disableFocusRipple={true}
                href="/search"
                onMouseOver={() => handleMouseOver(1)}
                onMouseOut={() => handleMouseOut(1)}
              >
                Inmuebles
              </TextMenuLink>
            </NavItem>
            <NavItem className="p-0" style={{ marginTop: 5 }}>
              <TextMenuLink
                style={{
                  ...(buttonStates[2] || buttonStates.defaultStyle),
                  padding: "5px 10px",
                  borderRadius: 50,
                  transition: "background-color 0.3s, color 0.3s",
                }}
                disableFocusRipple={true}
                href="/projects"
                onMouseOver={() => handleMouseOver(2)}
                onMouseOut={() => handleMouseOut(2)}
              >
                Proyectos
              </TextMenuLink>
            </NavItem>
            {!localStorage.getItem("Session") ? (
              <>
                <NavItem className="p-0" style={{ marginTop: 5 }}>
                  <TextMenuLink
                    style={{
                      ...(buttonStates[3] || buttonStates.defaultStyle),
                      padding: "5px 10px",
                      borderRadius: 50,
                      transition: "background-color 0.3s, color 0.3s",
                      cursor: "pointer",
                    }}
                    disableFocusRipple={true}
                    onClick={toggleDrawerLogin}
                    onMouseOver={() => handleMouseOver(3)}
                    onMouseOut={() => handleMouseOut(3)}
                  >
                    Iniciar sesión
                  </TextMenuLink>
                </NavItem>
                <NavItem className="p-0">
                  <Box
                    component="div"
                    sx={{
                      float: "right",
                    }}
                  >
                    <Button
                      onClick={toggleDrawerSignUp}
                      className="btn-round"
                      color="info"
                      style={{ background: blackColor, color: "#ffffff" }}
                      size="sm"
                    >
                      <Person sx={{ fontSize: 20, marginTop: 0.3 }} />{" "}
                      &nbsp;&nbsp;
                      <b
                        style={{
                          padding: "6px 2px 5px 2px",
                          letterSpacing: ".011em",
                          fontFamily: "sans-serif",
                          verticalAlign: "middle",
                        }}
                      >
                        Registrarme
                      </b>
                    </Button>
                  </Box>
                </NavItem>
              </>
            ) : (
              <UncontrolledDropdown
                nav
                style={{
                  background: "#3358f4",
                  borderRadius: 20,
                  fontWeight: "bold",
                  width: 150,
                }}
              >
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  nav
                  onClick={(e) => e.preventDefault()}
                  style={{
                    verticalAlign: "middle",
                    fontSize: 14,
                    padding: "8px 2px 8px 10px",
                    letterSpacing: ".011em",
                    fontFamily: "sans-serif",
                    fontWeight: "600",
                  }}
                >
                  <Person sx={{ fontSize: 18 }} />
                  &nbsp;&nbsp;Mi cuenta
                </DropdownToggle>
                <DropdownMenu className="dropdown-with-icons">
                  <DropdownItem
                    href={
                      UserAuth.profile_id === 1
                        ? "/account/dashboard"
                        : "account/dashboard-customer"
                    }
                  >
                    <TitleTextPage style={{ fontSize: 14 }}>
                      <Person sx={{ color: blackColor, fontSize: 18 }} />
                      &nbsp;&nbsp;Ir a la cuenta
                    </TitleTextPage>
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>
                    <TitleTextPage style={{ fontSize: 14 }}>
                      <Logout sx={{ color: blackColor, fontSize: 18 }} />
                      &nbsp;&nbsp;Cerrar sesión
                    </TitleTextPage>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      <Drawer
        anchor={"right"}
        open={props.signUp || signUp}
        onClose={toggleDrawerCloseSignUp}
      >
        <Grid container spacing={1} sx={{ padding: "18px 28px", width: 400 }}>
          <Grid item xs={12} md={12}>
            <IconButton
              onClick={toggleDrawerCloseSignUp}
              sx={{ marginBottom: 2 }}
            >
              <ParagraphTextPage style={{ fontSize: 22, cursor: "pointer" }}>
                <KeyboardBackspace />
                &nbsp;&nbsp;Atrás
              </ParagraphTextPage>
            </IconButton>
          </Grid>
          {successTrue ? (
            <Grid item xs={12} md={12}>
              <center>
                <img src={success} alt="success" style={{ width: 200 }} />
              </center>
              <Alert severity="success">
                <b style={{ fontSize: 22 }}>
                  ¡Su cuenta ha sido registrada con éxito!
                </b>
                <br></br>
                <br></br>
                Se ha enviado un correo electrónico de bienvenida, con
                instrucciones para acceder a la plataforma.
              </Alert>
            </Grid>
          ) : (
            <>
              <Grid item xs={12} md={12} sx={{ marginBottom: 1 }}>
                <TitleTextPage style={{ fontSize: 22 }}>
                  Ingresa los datos para crear tu perfil
                </TitleTextPage>
              </Grid>
              <Grid item xs={12} md={12}>
                <TitleTextPage
                  style={{ float: "right", fontSize: 10, color: "red" }}
                >
                  * Todos los campos son obligatórios
                </TitleTextPage>
                <LoadProfile
                  value={values.profileData}
                  refresh={changeProfile}
                  error={values.errorProfile}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sx={{
                  display:
                    parseInt(values.profile) === 3 || values.profile === 4
                      ? "block"
                      : "none",
                }}
              >
                <TitleTextPage style={{ fontSize: 12 }}>
                  Persona responsable
                </TitleTextPage>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-basic"
                  label="Correo electrónico"
                  variant="outlined"
                  onChange={handleChange("email")}
                  value={values.email}
                  autoComplete="off"
                  margin="dense"
                  size="small"
                  error={values.errorEmail}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                  onChange={handleChange("name")}
                  value={values.name}
                  autoComplete="off"
                  margin="dense"
                  size="small"
                  error={values.errorName}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-basic"
                  label="Apellido"
                  variant="outlined"
                  onChange={handleChange("lastname")}
                  value={values.lastname}
                  autoComplete="off"
                  margin="dense"
                  size="small"
                  error={values.errorLastname}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="outlined-basic"
                  label="Cédula o RUC"
                  variant="outlined"
                  onChange={handleChange("document")}
                  value={values.document}
                  autoComplete="off"
                  margin="dense"
                  size="small"
                  error={values.errorDocument}
                  fullWidth
                />
              </Grid>
              <Grid item xs={7} md={7}>
                <LoadPrefixes
                  value={values.prefixData}
                  refresh={changePrefix}
                  error={values.errorPrefix}
                />
              </Grid>
              <Grid item xs={5} md={5}>
                <TextField
                  id="outlined-basic"
                  label="Teléfono móvil"
                  variant="outlined"
                  onChange={(e) => {
                    const value = e.target.value;

                    // Permitir el valor vacío o un número que no comience con '0'
                    if (
                      value === "" ||
                      (value.length > 0 && value[0] !== "0")
                    ) {
                      handleChange("phone")(e); // Actualiza el valor
                    }
                  }}
                  value={values.phone}
                  autoComplete="off"
                  margin="dense"
                  size="small"
                  error={values.errorPhone}
                  fullWidth
                  placeholder="958732826"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <center>
                  {loader ? (
                    <CircularProgressTheme style={{ marginTop: 30 }} />
                  ) : (
                    <Button
                      className="btn-round"
                      color="info"
                      size="lg"
                      style={{
                        marginTop: 30,
                        marginLeft: 10,
                        background: blackColor,
                        color: "#ffffff",
                        letterSpacing: ".011em",
                        fontFamily: "sans-serif",
                      }}
                      onClick={submitFormSignUp()}
                      type="submit"
                    >
                      <b>Registrarme</b>
                    </Button>
                  )}
                </center>
              </Grid>
            </>
          )}
        </Grid>
        <Snackbar
          open={alert.openAlert}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={handleClose}
        >
          <Slide direction="up" in={alert.openAlert} mountOnEnter unmountOnExit>
            <Alert
              onClose={handleClose}
              severity={alert.errorAlert === "error" ? "error" : "success"}
              elevation={6}
              variant="filled"
            >
              {alert.mensaje}
            </Alert>
          </Slide>
        </Snackbar>
      </Drawer>
      <Drawer anchor={"right"} open={login} onClose={toggleDrawerCloseLogin}>
        <Grid container sx={{ padding: "20px 30px", width: 400 }}>
          <Grid item xs={12} md={12}>
            <IconButton
              onClick={toggleDrawerCloseLogin}
              sx={{ marginBottom: 2 }}
            >
              <ParagraphTextPage style={{ fontSize: 22, cursor: "pointer" }}>
                <KeyboardBackspace />
                &nbsp;&nbsp;Atrás
              </ParagraphTextPage>
            </IconButton>
          </Grid>
          <Grid item xs={12} md={12}>
            {" "}
            {/* LOGIN */}
            <Login />
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
}
