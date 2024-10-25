import { styled } from "@mui/material/styles";
import { createStyles } from "@mui/styles";

import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Button, AppBar, Tabs, Switch } from "@mui/material";

import {
  defaultFont,
  defaultFontTitle,
  defaultFontButtom,
  defaultFontParagraph,
  defaultFontSlogan,
  purpleColor,
  dangerColor,
  hexToRgb,
  blackColor,
  successColor,
  warningColor,
  whiteColor,
  transition,
  grayColor,
  infoColor,
  dangerCardHeader,
  successCardHeader,
} from "./material-dashboard-react";

const cardBodyStyle = createStyles({
  rootHome: {
    flexGrow: 1,
    padding: "20px 20px 0 20px",
  },
  rootSteps: {
    padding: 25,
    border: "1px solid rgb(241, 241, 241)",
    borderRadius: 6,
    background: whiteColor,
    width: "100%",
    margin: "20px 0 20px 1px",
  },
  cardImg: {
    objectPosition: "center",
    verticalAlign: "middle",
    width: "100%",
    marginTop: "-20px",
    height: 210,
    background: "transparent 50% no-repeat",
    backgroundPosition: "50%",
    backgroundSize: "cover",
    objectFit: "cover",
    position: "relative",
    overflow: "hidden",
    borderRadius: 10,
  },
  cardImg2: {
    objectFit: "cover",
    objectPosition: "center",
    verticalAlign: "middle",
    width: "100%",
  },
  cardImgLoginMail: {
    objectFit: "cover",
    objectPosition: "center",
    verticalAlign: "middle",
    width: 250,
    height: 150,
  },
  cardImgLoginPass: {
    objectFit: "cover",
    objectPosition: "center",
    verticalAlign: "middle",
    width: 190,
    height: 125,
  },
  cardNoImageMechanics: {
    objectFit: "cover",
    objectPosition: "center",
    verticalAlign: "middle",
    width: "40%",
    opacity: "0.1",
  },
  imageMechanicsAdvertising: {
    objectFit: "cover",
    width: 300,
    height: 95,
    borderRadius: 6,
    cursor: "pointer",
    marginTop: 30,
    "&:hover": {
      backgroundColor: "rgba(" + hexToRgb(purpleColor) + ",.1)",
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(purpleColor) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(purpleColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(purpleColor) +
        ",.2)",
      ...transition,
      transform: "scale(0.97, 0.97)",
    },
  },
  cardNoImage: {
    objectFit: "cover",
    objectPosition: "center",
    verticalAlign: "middle",
    width: "40%",
    opacity: "0.1",
  },
  cardNoImageList: {
    objectFit: "cover",
    width: "85%",
    opacity: "0.2",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
  },
  cardImgUser: {
    objectFit: "cover",
    objectPosition: "center",
    verticalAlign: "middle",
    width: "100%",
  },
  cardAutoImg: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
  },
  cardImgVehicleWeb: {
    width: "100%",
    height: 210,
    background: "transparent 50% no-repeat",
    backgroundPosition: "50%",
    backgroundSize: "cover",
    objectFit: "cover",
    objectPosition: "center",
    verticalAlign: "middle",
    position: "relative",
    overflow: "hidden",
    borderRadius: 10,
  },
  cardImgMechanicsWeb: {
    width: 110,
    height: 98,
    background: "transparent 50% no-repeat",
    backgroundPosition: "50%",
    backgroundSize: "cover",
    objectFit: "cover",
    objectPosition: "center",
    verticalAlign: "middle",
    position: "relative",
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 10,
  },
  imgMechanicsDashboard: {
    objectFit: "cover",
    objectPosition: "center",
    verticalAlign: "middle",
    width: "80%",
  },
  importantAuto: {
    position: "absolute",
    //top: "-2px",
    //left: 0,
    width: "30px",
    height: "15px",
    color: "#fff",
    backgroundColor: warningColor[0],
    zIndex: "999",
  },
  cardBody: {
    padding: "0.9375rem 20px",
    flex: "1 1 auto",
    WebkitBoxFlex: "1",
    position: "relative",
  },
  cardBodyPlain: {
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  cardBodyProfile: {
    marginTop: "15px",
  },
  textField: {
    width: "90%",
    marginTop: "50px",
  },
  wrapperButtonProgress: {
    margin: 5,
    position: "relative",
  },
  buttonProgress: {
    color: successColor[0],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  buttonNextSteps: {
    width: 200,
    padding: "8px 20px",
    fontSize: 14,
    color: "#fff",
    ...defaultFontButtom,
    backgroundColor: purpleColor,
    borderColor: purpleColor,
    borderRadius: 1,
    "&:hover": {
      backgroundColor: blackColor,
    },
  },
  buttonLeftSteps: {
    padding: "8px 20px",
    fontSize: 14,
    ...defaultFontButtom,
    borderRadius: 1,
    backgroundColor: grayColor[0],
    color: whiteColor,
    "&:hover": {
      color: blackColor,
    },
  },
  buttonLeftSteps2: {
    padding: "8px 20px",
    fontSize: 14,
    ...defaultFontButtom,
    borderRadius: 1,
    backgroundColor: grayColor[11],
    color: blackColor,
    "&:hover": {
      color: blackColor,
    },
  },
  buttonRightViewMore: {
    float: "right",
    padding: "8px 20px",
    fontSize: 14,
    ...defaultFontButtom,
    backgroundColor: purpleColor,
    borderColor: purpleColor,
    borderRadius: 1,
    color: whiteColor,
    textDecoration: "none",
    "&:hover": {
      borderColor: blackColor,
      backgroundColor: blackColor,
      color: whiteColor,
      textDecoration: "none",
    },
    "&:focus": {
      color: whiteColor,
      textDecoration: "none",
    },
  },
  buttonExit: {
    color: blackColor,
    margin: "10px 20px 10px 10px",
    padding: "8px 15px",
    fontSize: 12,
    ...defaultFontButtom,
    backgroundColor: whiteColor,
    border: "1px solid " + blackColor,
    borderRadius: 10,
    "&:hover": {
      backgroundColor: blackColor,
      color: "#fff",
    },
  },
  buttonRight: {
    float: "right",
    color: blackColor,
    margin: "10px 5px",
    padding: "8px 10px",
    fontSize: 12,
    ...defaultFontButtom,
    borderRadius: 1,
    backgroundColor: whiteColor,
    border: "1px solid " + blackColor,
    "&:hover": {
      backgroundColor: blackColor,
      color: "#fff",
    },
    "&:disabled": {
      backgroundColor: grayColor[11],
    },
  },
  titleFilterAction: {
    ...defaultFont,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
    border: "1px solid rgb(241, 241, 241)",
    padding: 5,
  },
  titleNumber: {
    ...defaultFont,
    fontSize: 28,
  },
  textBotom: {
    marginTop: 40,
    ...defaultFontTitle,
    fontSize: 14,
    fontWeight: "bold",
  },
  subtextCard: {
    ...defaultFontTitle,
    fontSize: 14,
    color: purpleColor,
    fontWeight: "bold",
  },
  titleCard: {
    ...defaultFontTitle,
    fontSize: 24,
    marginTop: 25,
  },
  titleCardLogin: {
    ...defaultFontTitle,
    fontSize: 24,
    marginTop: 25,
    fontWeight: "bold",
    color: "#1A2128",
  },
  titleSlogan: {
    ...defaultFontSlogan,
    fontSize: 16,
    float: "right",
  },
  titleCardFilter: {
    ...defaultFontTitle,
    fontSize: 22,
    marginBottom: 5,
    "& small": {
      fontSize: 14,
      lineHeight: 0,
    },
  },
  titleCard404: {
    ...defaultFontTitle,
    fontSize: 28,
    marginTop: 20,
  },
  cardPrice: {
    ...defaultFont,
    fontSize: 16,
    float: "right",
    color: purpleColor,
  },
  cardTitle: {
    ...defaultFont,
    fontSize: 16,
    "& small": {
      float: "right",
      fontSize: 14,
    },
  },
  fontParagraph: {
    ...defaultFontParagraph,
    textAlign: "justify",
    fontSize: 14,
    "& small": {
      fontSize: 12,
    },
  },
  cardPriceDialog: {
    ...defaultFont,
    fontSize: 28,
    float: "right",
    color: purpleColor,
  },
  cardTitleDialog: {
    ...defaultFont,
    fontSize: 22,
    "& small": {
      fontSize: 18,
    },
  },
  cardTitleWhite: {
    ...defaultFontTitle,
    fontSize: 18,
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
  },
  cardTitleBlack: {
    ...defaultFontTitle,
    fontSize: 24,
    color: blackColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "bold",
  },
  cardSubTitleWhite: {
    ...defaultFontTitle,
    fontSize: 14,
    color: "rgba(255,255,255,.62)",
    margin: "0",
    minHeight: "auto",
  },
  actionTitleWhite: {
    ...defaultFontTitle,
    fontSize: 34,
    color: whiteColor,
    fontWeight: "bold",
    marginBottom: 30,
    "& small": {
      fontWeight: 400,
      lineHeight: 0,
      fontSize: 20,
      margin: "20px 0",
    },
  },
  cardSubTitle: {
    ...defaultFontTitle,
    fontSize: 14,
  },
  cardSubTitle2: {
    ...defaultFontTitle,
    fontSize: 12,
    "& small": {
      float: "right",
      fontWeight: "bold",
    },
  },
  lineBottom: {
    marginTop: 5,
    background: blackColor,
    padding: 1,
    borderRadius: 10,
    width: 100,
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(purpleColor) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(purpleColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(purpleColor) +
      ",.2)",
  },
  textField2: {
    width: "90%",
    marginTop: 30,
  },
  buttonSubmit1: {
    cursor: "pointer",
    padding: "5px 10px",
    fontSize: 12,
    color: "#fff",
    ...defaultFontButtom,
    backgroundColor: purpleColor,
    borderColor: purpleColor,
    borderRadius: 1,
    "&:hover": {
      backgroundColor: blackColor,
      textDecoration: "none",
      color: whiteColor,
    },
    "&:disabled": {
      backgroundColor: grayColor[11],
    },
    "&:focus": {
      color: whiteColor,
      textDecoration: "none",
      backgroundColor: purpleColor,
    },
  },
  buttonSubmit1Warninf: {
    cursor: "pointer",
    padding: "5px 10px",
    fontSize: 12,
    color: "#fff",
    ...defaultFontButtom,
    backgroundColor: warningColor[0],
    borderColor: warningColor[0],
    borderRadius: 1,
    "&:hover": {
      backgroundColor: blackColor,
      textDecoration: "none",
      color: whiteColor,
    },
    "&:disabled": {
      backgroundColor: grayColor[11],
    },
    "&:focus": {
      color: whiteColor,
      textDecoration: "none",
      backgroundColor: purpleColor,
    },
  },
  buttonSubmitUpload: {
    cursor: "pointer",
    width: 150,
    padding: "8px 20px",
    fontSize: 10,
    color: blackColor,
    ...defaultFontButtom,
    backgroundColor: grayColor[10],
    borderColor: grayColor[11],
    borderRadius: 10,
    "&:hover": {
      backgroundColor: purpleColor,
      textDecoration: "none",
      color: whiteColor,
    },
    "&:disabled": {
      backgroundColor: grayColor[11],
    },
    "&:focus": {
      color: whiteColor,
      textDecoration: "none",
      backgroundColor: blackColor,
    },
  },
  buttonSubmit2: {
    cursor: "pointer",
    width: 150,
    padding: "8px 20px",
    fontSize: 10,
    color: "#fff",
    ...defaultFontButtom,
    backgroundColor: blackColor,
    borderColor: blackColor,
    borderRadius: 10,
    "&:hover": {
      backgroundColor: purpleColor,
      textDecoration: "none",
      color: whiteColor,
    },
    "&:disabled": {
      backgroundColor: grayColor[11],
    },
    "&:focus": {
      color: whiteColor,
      textDecoration: "none",
      backgroundColor: blackColor,
    },
  },
  buttonSubmit3: {
    margin: "5px 15px 0",
    padding: "8px 20px",
    width: 100,
    fontSize: 12,
    color: "#fff",
    ...defaultFontButtom,
    backgroundColor: purpleColor,
    borderColor: purpleColor,
    borderRadius: 1,
    "&:hover": {
      backgroundColor: blackColor,
      color: "#fff",
    },
    "&:disabled": {
      backgroundColor: grayColor[11],
    },
  },
  buttonSubmit4: {
    width: 120,
    fontSize: 12,
    color: "#fff",
    ...defaultFontButtom,
    backgroundColor: purpleColor,
    borderColor: purpleColor,
    borderRadius: 1,
    "&:hover": {
      backgroundColor: blackColor,
      color: "#fff",
    },
    "&:disabled": {
      backgroundColor: grayColor[11],
    },
  },
  buttonSubmit5: {
    width: 80,
    fontSize: 10,
    padding: "3px 15px",
    color: "#000",
    ...defaultFontButtom,
    backgroundColor: "orange",
    borderColor: "orange",
    borderRadius: 1,
    "&:hover": {
      backgroundColor: blackColor,
      color: "#fff",
    },
    "&:disabled": {
      backgroundColor: grayColor[11],
    },
  },
  buttonSubmit6: {
    width: 80,
    fontSize: 10,
    padding: "3px 15px",
    color: "#fff",
    ...defaultFontButtom,
    backgroundColor: purpleColor,
    borderColor: purpleColor,
    borderRadius: 1,
    "&:hover": {
      backgroundColor: blackColor,
      color: "#fff",
    },
    "&:disabled": {
      backgroundColor: grayColor[11],
    },
  },
  buttonBlack: {
    margin: "5px 15px 0",
    padding: "8px 20px",
    width: 200,
    fontSize: 14,
    color: "#fff",
    ...defaultFontButtom,
    backgroundColor: blackColor,
    borderColor: blackColor,
    borderRadius: 1,
    "&:hover": {
      backgroundColor: whiteColor,
      color: blackColor,
    },
  },
  lineBottomGreen: {
    background: successColor[0],
    padding: 1,
    borderRadius: 10,
    width: 200,
    marginTop: 10,
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(successColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(successColor[0]) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(successColor[0]) +
      ",.2)",
  },
  cardSliderHome: {
    width: 400,
    padding: 10,
    borderRadius: 10,
    top: 120,
    left: 50,
    position: "absolute",
    zIndex: 999,
    backgroundColor: "rgb(247, 247, 247, 0.95)",
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 50,
  },
  cardMobil: {
    margin: "15px 0",
    background: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  cardFilter: {
    padding: 15,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#FFF",
  },
  cardTopBlack: {
    padding: 60,
    marginTop: 15,
    borderRadius: 6,
    background: blackColor,
  },
  iconFilter: {
    fontSize: 24,
    color: purpleColor,
    verticalAlign: "middle",
  },
  iconInput: {
    color: blackColor,
  },
  iconDelete: {
    fontSize: 63,
    verticalAlign: "middle",
  },

  pagination: {
    justifyContent: "center",
    display: "flex",
    marginTop: 30,
  },

  cardAutosMoreSearch: {
    padding: 10,
    border: "1px solid rgb(241, 241, 241)",
    borderRadius: 6,
    background: "#fff",
    width: "100%",
    display: "flex",
    margin: "30px 0",
    justifyContent: "center",
  },
  actionviewHome: {
    padding: 60,
    //border: "1px solid rgb(241, 241, 241)",
    borderRadius: 20,
    background: "#67BCDF",
    width: "100%",
    height: "auto",
    margin: "60px 0 30px 0",
    //display: "flex",
    //justifyContent: "center",
  },
  cardBrancheViewTitle: {
    padding: 10,
    border: "1px solid rgb(241, 241, 241)",
    borderRadius: 6,
    background: "#fff",
    marginBottom: 5,
  },
  cardAutosView: {
    padding: 10,
    border: "1px solid rgb(241, 241, 241)",
    borderRadius: 6,
    background: "#fff",
    // width: "100%",
    display: "flex",
    margin: "10px 0",
    justifyContent: "center",
  },
  carDashboard: {
    padding: 10,
    border: "1px solid rgb(241, 241, 241)",
    borderRadius: 6,
    background: "#fff",
    width: "100%",
    display: "flex",
    margin: "15px 0",
  },
  carContacts: {
    padding: "30px 20px 20px 20px",
    border: "1px solid rgb(241, 241, 241)",
    borderRadius: 6,
    background: "#fff",
    width: "75%",
    margin: "30px 0 20px 0",
  },
  cartextCondition: {
    padding: "30px 20px 20px 20px",
    border: "1px solid rgb(241, 241, 241)",
    borderRadius: 6,
    background: "#fff",
    width: "100%",
    margin: "30px 0 20px 0",
  },
  image: {
    position: "relative",
    overflow: "hidden",
    display: "block",
    height: 200,
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
      ...transition,
      transform: "scale(0.97, 0.97)",
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: whiteColor,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: blackColor,
    opacity: 0.4,
    ...transition,
  },
  imageTitle: {
    position: "relative",
    padding: 10,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: whiteColor,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    ...transition,
  },
  // FOOTER

  blockReds: {
    color: "inherit",
    textTransform: "uppercase",
    textDecoration: "none",
    "&:hover": {
      color: purpleColor,
      textDecoration: "none",
      backgroundColor: "transparent",
    },
  },
  fontParagraphAlert: {
    ...defaultFont,
    fontSize: 12,
    fontWeight: "bold",
    color: dangerColor[1],
  },
  block: {
    color: "inherit",
    padding: "15px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
    ...defaultFont,
    fontWeight: "500",
    fontSize: "12px",
    "&:hover": {
      color: purpleColor,
      textDecoration: "none",
      backgroundColor: "transparent",
    },
  },
  left: {
    float: "left!important",
    display: "block",
  },
  right: {
    marginRight: 50,
    fontSize: "12px",
    // float: "right!important",
    textAlign: "center",
  },
  footer: {
    bottom: 0,
    marginTop: 35,
    borderTop: "1px solid rgb(241, 241, 241)",
    padding: 10,
    ...defaultFont,
    width: "100%",
    backgroundColor: "#fff",
    //position: "fixed",
  },
  footer2: {
    bottom: 0,
    borderTop: "1px solid rgb(241, 241, 241)",
    padding: 10,
    ...defaultFont,
    width: "100%",
    backgroundColor: "#fff",
    position: "absolute",
  },
  footer3: {
    bottom: 0,
    borderTop: "1px solid rgb(241, 241, 241)",
    padding: "10px 0",
    //paddingLeft: 250,
    ...defaultFont,
    backgroundColor: "#fff",
    height: 40,
    // position: "relative",
    // width: "100%",
    marginTop: 50,
  },
  footer4: {
    bottom: 0,
    borderTop: "1px solid rgb(241, 241, 241)",
    padding: "10px 0",
    paddingLeft: 250,
    ...defaultFont,
    backgroundColor: "#fff",
    position: "relative",
    width: "100%",
    top: 100,
  },
  contentList: {
    paddingLeft: 270,
    paddingRight: 20,
  },
  NoimgContentList: {
    marginLeft: 200,
    padding: 20,
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0",
    backgroundColor: "#fff",
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto",
  },
  a: {
    color: purpleColor,
    textDecoration: "none",
    backgroundColor: "transparent",
    "&:hover": {
      color: blackColor,
    },
  },
  iconWhite: {
    color: whiteColor,
    verticalAlign: "middle",
  },
  iconGreen: {
    color: successColor[0],
    verticalAlign: "middle",
  },
  iconTheme: {
    color: purpleColor,
    verticalAlign: "middle",
    "&:hover": {
      color: "green",
      textDecoration: "none",
      cursor: "pointer",
      fontSize: 22,
    },
  },
  iconThemeHover: {
    color: purpleColor,
    verticalAlign: "middle",
    "&:hover": {
      color: "green",
      textDecoration: "none",
      cursor: "pointer",
      fontSize: 22,
    },
  },
  iconWarning: { verticalAlign: "middle" },
  containerStep: {
    background: whiteColor,
    border: "1px solid rgb(241, 241, 241)",
    borderRadius: 6,
  },
  imageList: {
    flexWrap: "wrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    display: "flex",
    justifyContent: "left",
  },
  colorIcon: {
    color: dangerColor[4],
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  imgUpload: {
    height: "-webkit-fill-available",
    objectFit: "cover",
  },
  cardHeaderPricin: {
    backgroundColor: grayColor[11],
    ...defaultFont,
    fontSize: 14,
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    margin: 10,
  },
  cardDescriptionPricing: {
    display: "flex",
    textAlign: "justify",
    alignItems: "baseline",
    ...defaultFontParagraph,
    fontSize: 16,
    margin: 10,
  },
  containerPublicCar: {
    background: "#FFF",
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    border: "1px solid rgb(241, 241, 241)",
    borderRadius: 6,
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 2,
  },
  containerProfile: {
    background: "#FFF",
    padding: 20,
    border: "1px solid rgb(241, 241, 241)",
    borderRadius: 6,
    width: "100%",
  },
  iconImgUser: {
    backgroundColor: "#F2F2F2",
    //top: "-50px",
    color: blackColor,
  },
  input: {
    display: "none",
  },
  containerImg: {
    backgroundColor: "rgba(" + hexToRgb(purpleColor) + ",.1)",
    width: "100%",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    padding: 20,
  },
  imgUserProfile: {
    marginBottom: 20,
    width: "150px",
    height: "150px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    objectFit: "cover",
    borderRadius: "50%",
    boxShadow:
      " 0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(76, 175, 80,.4)",
  },
  imgUserProfileList: {
    width: "40px",
    height: "40px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    objectFit: "cover",
    borderRadius: "50%",
    boxShadow:
      " 0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(76, 175, 80,.4)",
  },
  imgLogoCompany: {
    marginBottom: 1,
    width: 250,
    height: 150,
    padding: 5,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    objectFit: "contain",
    borderRadius: "10%",
    boxShadow:
      " 0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(76, 175, 80,.4)",
  },
  imgMechanicsProfile: {
    width: "65%",
    height: "auto",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    objectFit: "cover",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    margin: "5px 0",
  },
  imageDialogCar: {
    margin: 0,
    padding: 0,
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    flexDirection: "row",
  },
  tabsThemeAppBar: {
    backgroundColor: whiteColor,
    borderTopLeftRadius: 1,
    borderBottomLeftRadius: 1,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
    border: "1px solid rgb(241, 241, 241)",
  },
  styleDialogContent: {
    background: "rgb(247, 247, 247)",
    padding: "20px 20px 10px 29px !important",
  },
  btnGreen: {
    padding: 5,
    width: 100,
    height: 28,
    borderRadius: 1,
    background: successColor[0],
    color: whiteColor,
    border: "1px solid " + successColor[0],
    textAlign: "center",
    ...defaultFontButtom,
    cursor: "Pointer",
    fontSize: 12,
    display: "inline-block",
    "&:hover": {
      background: purpleColor,
      color: whiteColor,
      border: "1px solid " + purpleColor,
    },
  },
  btnFacebook: {
    width: 170,
    height: 28,
    background: whiteColor,
    color: "rgb(34, 34, 34)",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    textAlign: "center",
    display: "inline-block",
    borderRadius: 1,
    padding: 5,
    ...defaultFontButtom,
    cursor: "Pointer",
    fontSize: 10,
    margin: 5,
    "&:hover": {
      background: "#3b5998",
      color: whiteColor,
      border: "1px solid #3b5998",
    },
  },
  btnGoogle: {
    padding: "2px 20px 2px 5px",
    width: 170,
    color: "rgb(34, 34, 34)",
    textAlign: "center",
    ...defaultFontButtom,
    cursor: "Pointer",
    fontSize: 12,
    display: "inline-block",
    "&:hover": {
      color: "black",
    },
  },
  btnPasswordRecovery: {
    cursor: "pointer",
    float: "right",
    fontStyle: "oblique",
    color: "white !important",
    ...defaultFontButtom,
    "&:hover": {
      color: "black !important",
    },
  },
  containerMap: {
    position: "relative",
    flexWrap: "inherit",
    height: "300px",
    width: "100%",
  },
  styleMechanicsSectionHome: {
    borderRadius: "8%",
    boxShadow:
      "0 12px 20px -10px rgba(255,255,255,.28), 0 4px 20px 0 rgba(" +
      hexToRgb(purpleColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(purpleColor) +
      ",.2)",
    height: 240,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(" + hexToRgb(purpleColor) + ",.1)",
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(purpleColor) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(purpleColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(purpleColor) +
        ",.2)",
      ...transition,
      transform: "scale(0.97, 0.97)",
    },
  },
  tableSummary: {
    border: "1px solid rgb(241, 241, 241)",
    padding: 15,
    width: "80%",
    borderRadius: 10,
    backgroundColor: "rgb(241, 241, 241)",
  },
  fontTextTopSelect: {
    position: "absolute",
    zIndex: "777",
    color: whiteColor + " !important",
    background: "radial-gradient(black, transparent)",
    fontSize: 14,
    fontWeight: "bold",
  },
  labelExtraxViewCar: {
    border: 0,
    width: "35%",
  },
  dataExtraxViewCar: {
    border: 0,
    width: "65%",
  },
  conyainerExtraxViewCar: {
    borderLeft: "1px solid rgb(241, 241, 241)",
    width: "100%",
  },
  branchesViewCar: {
    width: 50,
    height: 40,
    cursor: "pointer",
    borderRadius: 10,
    "&:hover": {
      background: purpleColor,
      borderRadius: 10,
      transition: "all 0.7s ease-out",
    },
  },
  Link: {
    cursor: "pointer",
    "&:hover": {
      textDecoration: "none",
    },
  },
  imageGallery: {
    width: "100%",
    // height: 650,
    objectFit: "cover",
  },
  chipStyle: {
    fontSize: 10,
    fontWeight: "bold",
    color: blackColor,
  },
  cardSubscriptionPrice: {
    textAlign: "center",
    alignItems: "center",
    ...defaultFont,
    fontSize: 18,
    color: purpleColor,
  },
  circleWarningDashboard: {
    ...defaultFontTitle,
    width: 150,
    height: 150,
    background: warningColor[0],
    borderRadius: 100,
    margin: "0px 0 10px 0px",
    lineHeight: "145px !important",
    fontSize: 28,
    letterSpacing: 2,
    color: "#FFFFFF !important",
    fontWeight: "600 !important",
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(warningColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(warningColor[0]) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(warningColor[0]) +
      ",.2)",
  },
});

const progressLinear = {
  colorPrimary: {
    backgroundColor: purpleColor,
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(purpleColor) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(purpleColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(purpleColor) +
      ",.2)",
  },
};

const ColorConnector = {
  alternativeLabel: {
    verticalAlign: "middle",
  },
  active: {
    "& $line": {
      ...dangerCardHeader,
    },
  },
  completed: {
    "& $line": {
      ...successCardHeader,
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: grayColor[11],
    borderRadius: 1,
  },
};

const themeCss = {
  palette: {
    primary: {
      main: purpleColor,
      contrastText: "#fff",
    },
  },
};

const themeTabs = {
  root: {
    // borderBottom: '1px solid #e8e8e8',
    // border: "1px solid rgb(241, 241, 241)",
    borderTopLeftRadius: 1,
    borderBottomLeftRadius: 1,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
    color: blackColor,
  },
  indicator: {
    backgroundColor: blackColor,
    height: 3,
  },
};

const themeTab = {
  root: {
    textTransform: "none",
    ...defaultFontButtom,
    // minWidth: 72,
    // marginRight: theme.spacing(4),
    /*fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),*/
    "&:hover": {
      color: purpleColor,
      fontWeight: "bold",
      //opacity: 1,
    },
    "&$selected": {
      color: whiteColor,
      fontWeight: "bold",
      backgroundColor: purpleColor,
      transition: "all 0.7s ease-out",
    },
    "&:focus": {},
  },
  selected: {},
};

const themeTab2 = {
  root: {
    textTransform: "none",
    ...defaultFontButtom,
    // minWidth: 72,
    // marginRight: theme.spacing(4),
    /*fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),*/
    "&:hover": {
      color: purpleColor,
      fontWeight: "bold",
      //opacity: 1,
    },
    "&$selected": {
      color: purpleColor,
      backgroundColor: "rgba(" + hexToRgb(purpleColor) + ",.1)",
      fontWeight: "bold",
      transition: "all 0.7s ease-out",
    },
    "&:focus": {},
  },
  selected: {},
};

const selectedTableCell = {
  tableRow: {
    cursor: "pointer",
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: "rgba(" + hexToRgb(purpleColor) + ",.1)",
      "& > .MuiTableCell-root": {
        color: blackColor,
      },
    },
  },
};

const GreenCheckboxSelected = {
  root: {
    color: successColor[0],
    "&$checked": {
      color: successColor[0],
    },
  },
  checked: {},
};

const TooltipStyle = {
  tooltip: {
    fontSize: 14,
    fontWeight: "400",
  },
};

const TabsTheme = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: purpleColor,
  },
  "& .MuiButtonBase-root.MuiTab-root": {
    color: "black",
    // transition: "color 0.2s ease-in-out",
    textTransform: "none",
    fontSize: 16,
    "&:hover": {
      color: "green)",
    },
    "&.Mui-selected": {
      color: "#000",
    },
  },
}));

const ButtonStyle0 = styled(Button)(({ theme }) => ({
  width: 200,
  padding: "8px 20px",
  fontSize: 14,
  color: "#fff",
  ...defaultFontButtom,
  backgroundColor: purpleColor,
  borderColor: purpleColor,
  borderRadius: 10,
  "&:hover": {
    backgroundColor: infoColor[4],
  },
  "&:disabled": {
    backgroundColor: grayColor[11],
  },
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  marginTop: 10,
  width: 400,
  padding: "8px 20px",
  fontSize: 14,
  color: "#fff",
  ...defaultFontButtom,
  backgroundColor: "black",
  borderColor: "black",
  borderRadius: 10,
  "&:hover": {
    backgroundColor: purpleColor,
    color: whiteColor,
  },
  "&:disabled": {
    backgroundColor: grayColor[11],
  },
}));

const ButtonExit = styled(Button)(({ theme }) => ({
  color: blackColor,
  margin: "10px 20px 10px 10px",
  padding: "8px 15px",
  fontSize: 12,
  ...defaultFontButtom,
  backgroundColor: whiteColor,
  border: "1px solid " + blackColor,
  borderRadius: 10,
  "&:hover": {
    backgroundColor: blackColor,
    color: "#fff",
  },
}));

const ButtonTableGrid1 = styled(Button)(({ theme }) => ({
  padding: "5px 20px",
  with: 150,
  fontSize: 10,
  ...defaultFontButtom,
  borderRadius: 5,
  backgroundColor: purpleColor,
  color: whiteColor,
  "&:hover": {
    backgroundColor: whiteColor,
    color: blackColor,
  },
}));

const ButtonTableGrid2 = styled(Button)(({ theme }) => ({
  padding: "5px 20px",
  with: 150,
  fontSize: 10,
  ...defaultFontButtom,
  borderRadius: 5,
  backgroundColor: blackColor,
  color: whiteColor,
  "&:hover": {
    backgroundColor: whiteColor,
    color: blackColor,
  },
}));

const ButtonContactGreen = styled(Button)(({ theme }) => ({
  width: 150,
  padding: "8px 20px",
  fontSize: 14,
  color: whiteColor,
  ...defaultFontButtom,
  backgroundColor: successColor[0],
  borderColor: successColor[0],
  borderRadius: 1,
  "&:hover": {
    backgroundColor: blackColor,
    textDecoration: "none",
    color: whiteColor,
  },
  "&:focus": {
    textDecoration: "none",
    color: whiteColor,
  },
}));

const ButtonLeftSteps2 = styled(Button)(({ theme }) => ({
  padding: "8px 20px",
  fontSize: 14,
  ...defaultFontButtom,
  borderRadius: 1,
  backgroundColor: grayColor[11],
  color: blackColor,
  "&:hover": {
    color: blackColor,
  },
}));

const AppBarStyle = styled(AppBar)(({ theme }) => ({
  background: "#fff",
  borderBottom: "1px solid rgb(241, 241, 241)",
  boxShadow:
    "0px 2px 4px -1px rgb(241 241 241 / 60%), 0px 4px 5px 0px rgb(241 241 241 / 50%), 0px 1px 10px 0px rgb(241 241 241 / 50%)",
}));

const ColorLinearProgress = styled(LinearProgress)(({ theme }) => ({
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: purpleColor,
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(purpleColor) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(purpleColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(purpleColor) +
      ",.2)",
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: whiteColor,
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(whiteColor) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(whiteColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(whiteColor) +
      ",.2)",
  },
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor:
          theme.palette.mode === "dark" ? "#177ddc" : purpleColor,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 25,
  height: 25,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    background: purpleColor,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    width: 40,
    height: 40,
  }),
  ...(ownerState.completed && {
    background: "yellowgreen",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
}));

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 18,
  fontWeight: "500",
  color: "#000",
}));

const TitleTextPage = styled("div")(({ theme }) => ({
  color: blackColor,
  fontSize: 36,
  fontWeight: "bold",
  letterSpacing: ".011em",
  fontFamily: "sans-serif",
}));

const ParagraphTextPage = styled("div")(({ theme }) => ({
  fontSize: 18,
  letterSpacing: ".011em",
  color: blackColor,
  fontFamily: "sans-serif",
}));

const TextMenuLink = styled("a")(({ theme }) => ({
  fontSize: 16,
  letterSpacing: ".011em",
  fontFamily: "sans-serif",
  textDecoration: "none",
  fontWeight: "600",
  marginLeft: 10,
  marginRight: 10,
}));

const CircularProgressTheme = styled(CircularProgress)(({ theme }) => ({
  [`& .${circularProgressClasses.circle}`]: {
    color: blackColor,
  },
}));

export {
  TitleTextPage,
  ParagraphTextPage,
  TextMenuLink,
  blackColor,
  AntSwitch,
  ButtonExit,
  ButtonTableGrid1,
  ButtonTableGrid2,
  ButtonContactGreen,
  ButtonLeftSteps2,
  ButtonStyle0,
  ButtonStyle,
  AppBarStyle,
  cardBodyStyle,
  ColorLinearProgress,
  progressLinear,
  ColorConnector,
  themeCss,
  themeTabs,
  themeTab,
  themeTab2,
  selectedTableCell,
  GreenCheckboxSelected,
  TooltipStyle,
  TabsTheme,
  QontoStepIconRoot,
  ColorlibStepIconRoot,
  purpleColor,
  StyledText,
  CircularProgressTheme,
};
