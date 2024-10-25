import { styled } from "@mui/material/styles";

import { AppBar } from "@mui/material";

import {
  container,
  defaultFont,
  defaultFontTitle,
  defaultFontButtom,
  defaultFontSlogan,
  defaultFontParagraph,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor,
  purpleColor,
  hexToRgb,
  blackColor,
} from "./material-dashboard-react.js";

const headerStyle = () => ({
  toolbarMobil: {
    background: "white",
    borderBottom: "1px solid rgb(241, 241, 241)",
    width: "100%",
    display: "block",
  },
  toolbar: {
    background: "white",
    borderBottom: "1px solid rgb(241, 241, 241)",
  },
  appBar: {
    backgroundColor: "transparent",
    boxShadow: "none",
    borderBottom: "0",
    marginBottom: "0",
    position: "absolute",
    width: "100%",
    paddingTop: "10px",
    zIndex: "1029",
    color: grayColor[7],
    border: "0",
    borderRadius: "3px",
    padding: "10px 0",
    transition: "all 150ms ease 0s",
    minHeight: "50px",
    display: "block",
  },
  container: {
    ...container,
    minHeight: "50px",
  },
  flex: {
    flex: 1,
  },
  title: {
    ...defaultFont,
    letterSpacing: "unset",
    lineHeight: "30px",
    fontSize: "16px",
    borderRadius: "3px",
    margin: "0",
    "&:hover,&:focus": {
      background: "transparent",
    },
  },
  titleFiltro: {
    ...defaultFont,
    letterSpacing: "unset",
    lineHeight: "30px",
    fontSize: "16px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    margin: "0",
    marginRight: 5,
    "&:hover,&:focus": {
      background: "transparent",
    },
  },
  nameLogo: {
    ...defaultFont,
    letterSpacing: "unset",
    fontSize: 22,
    color: purpleColor,
    padding: "5px 0",
  },
  nameLogoMobil: {
    ...defaultFont,
    letterSpacing: "unset",
    fontSize: 16,
    color: purpleColor,
    paddingTop: 15,
  },

  appResponsive: {
    top: "8px",
  },
  primary: {
    backgroundColor: primaryColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  info: {
    backgroundColor: infoColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  success: {
    backgroundColor: successColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  warning: {
    backgroundColor: warningColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  danger: {
    backgroundColor: dangerColor[0],
    color: whiteColor,
    ...defaultBoxShadow,
  },
  buttomGroup: { float: "right", marginTop: 5 },
  buttonGray: {
    padding: "8px 20px",
    fontSize: 14,
    ...defaultFontButtom,
    color: "#fff",
    backgroundColor: grayColor[11],
    borderColor: grayColor[11],
    borderRadius: 1,
  },
  buttonBlack: {
    padding: "8px 20px",
    fontSize: 14,
    ...defaultFontButtom,
    color: "#fff",
    borderRadius: 1,
    borderColor: blackColor,
    backgroundColor: blackColor,
    "&:hover": {
      color: "#fff",
      borderColor: blackColor,
      backgroundColor: blackColor,
    },
  },
  buttonRightRed: {
    padding: "0 20px",
    fontSize: 12,
    ...defaultFontButtom,
    color: dangerColor[4],
    borderColor: dangerColor[4],
    borderRadius: 1,
    borderRightColor: dangerColor[4] + " !important",
    "&:hover": {
      borderColor: dangerColor[4],
      backgroundColor: dangerColor[4],
      color: whiteColor,
    },
  },
  buttonRightRedCancel: {
    padding: "5px 10px",
    fontSize: 10,
    ...defaultFontButtom,
    color: whiteColor,
    borderColor: dangerColor[4],
    borderRadius: 1,
    backgroundColor: dangerColor[4],
    marginLeft: 10,
    "&:hover": {
      borderColor: blackColor,
      backgroundColor: blackColor,
      color: whiteColor,
    },
  },
  buttonRightRedCancelMobil: {
    padding: "5px 10px",
    fontSize: 10,
    ...defaultFontButtom,
    color: whiteColor,
    borderColor: dangerColor[4],
    borderRadius: 1,
    backgroundColor: dangerColor[4],
    margin: "10px 0",
    "&:hover": {
      borderColor: blackColor,
      backgroundColor: blackColor,
      color: whiteColor,
    },
  },
  buttonRightGreen: {
    padding: "8px 20px",
    fontSize: 14,
    ...defaultFontButtom,
    backgroundColor: "rgba(" + hexToRgb(successColor[0]) + ",.6)",
    borderColor: successColor[0],
    borderRadius: 1,
    color: whiteColor,
    "&:hover": {
      borderColor: purpleColor,
      backgroundColor: purpleColor,
      color: whiteColor,
    },
  },
  buttonLeft: {
    padding: "10px 20px",
    fontSize: 12,
    ...defaultFontButtom,
    borderRadius: 1,
  },
  buttonRight: {
    padding: "10px 20px",
    fontSize: 14,
    ...defaultFontButtom,
    color: "#fff",
    backgroundColor: purpleColor,
    borderColor: purpleColor,
    borderRadius: 1,
    "&:hover": {
      borderColor: blackColor,
      backgroundColor: blackColor,
    },
  },
  buttonRightSubmit: {
    padding: "8px 20px",
    fontSize: 14,
    ...defaultFontButtom,
    color: "#fff",
    backgroundColor: purpleColor,
    borderColor: purpleColor,
    borderRadius: 1,
    "&:hover": {
      borderColor: blackColor,
      backgroundColor: blackColor,
    },
  },
  scrollTop: {
    color: "#fff",
    backgroundColor: purpleColor,
    "&:hover": {
      backgroundColor: blackColor,
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(blackColor) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(blackColor) +
        ",.2)",
    },
  },
  rootScrollTop: {
    position: "fixed",
    bottom: 20,
    right: 20,
    zIndex: 999,
  },
  iconButtom: {
    fontSize: 14,
    margin: "0 5px",
  },
  titleButtom: {
    ...defaultFont,
    marginTop: 2,
    fontSize: 14,
    color: "#fff",
  },
  buttonLeftLogo: {
    marginLeft: 30,
  },
  cardImgUser: {
    objectFit: "cover",
    objectPosition: "center",
    verticalAlign: "middle",
    width: 230,
  },
  cardImgPatio: {
    objectFit: "cover",
    objectPosition: "center",
    verticalAlign: "middle",
    width: 280,
  },
  cardImgMechanic: {
    objectFit: "cover",
    objectPosition: "center",
    verticalAlign: "middle",
    width: 200,
  },
  cardHeader: {
    backgroundColor: grayColor[11],
    ...defaultFont,
    fontSize: 14,
  },
  cardDescription: {
    display: "flex",
    textAlign: "justify",
    alignItems: "baseline",
    ...defaultFontParagraph,
    fontSize: 16,
    margin: 10,
  },
  cardSubscriptionPrice: {
    textAlign: "center",
    alignItems: "center",
    ...defaultFont,
    fontSize: 28,
    color: purpleColor,
    margin: 10,
  },
  cardSubscriptionShadow: {
    backgroundColor: whiteColor,
    "&:hover": {
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(purpleColor) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(purpleColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(purpleColor) +
        ",.2)",
    },
  },
  cardShadow: {
    backgroundColor: whiteColor,
    "&:hover": {
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(purpleColor) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(purpleColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(purpleColor) +
        ",.2)",
    },
  },
  cardShadowActiveSelected: {
    backgroundColor: "rgba(" + hexToRgb(purpleColor) + ",.6)",
    borderColor: purpleColor,
    borderRadius: 1,
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(purpleColor) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(purpleColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(purpleColor) +
      ",.2)",
  },
  cardShadowActive: {
    backgroundColor: "rgba(" + hexToRgb(successColor[0]) + ",.6)",
    borderColor: successColor[0],
    borderRadius: 1,
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(successColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(successColor[0]) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(successColor[0]) +
      ",.2)",
  },
  Icongreen: {
    color: successColor[0],
  },
  iconMovilRight: {
    verticalAlign: "middle",
    fontSize: 36,
    color: blackColor,
  },
  icons: {
    fontSize: 22,
    marginRight: 5,
  },
  iconsSuccess: {
    color: successColor[0],
  },
  chipsuccess: {
    color: successColor[0],
    borderColor: successColor[0],
  },
  rootBody: {
    padding: 25,
    border: "1px solid rgb(241, 241, 241)",
    borderRadius: 6,
    background: whiteColor,
    width: "100%",
    margin: "20px 0 20px 1px",
  },
  textCard: {
    ...defaultFontTitle,
    fontSize: 16,
  },
  titleCardRoot: {
    ...defaultFontTitle,
    fontSize: 24,
    marginBottom: 5,
  },
  lineBottom: {
    marginTop: 5,
    background: purpleColor,
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
  lineBottomMenu: {
    marginTop: 8,
    background: purpleColor,
    padding: 1,
    borderRadius: 10,
    width: "100%",
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(purpleColor) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(purpleColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(purpleColor) +
      ",.2)",
  },
  titleSlogan: {
    ...defaultFontSlogan,
    fontSize: 12,
    marginLeft: 50,
  },

  search: {
    width: "100%",
    marginTop: 6,
    position: "relative",
    padding: "2px 0",
    justifyContent: "center",
    display: "flex",
  },
  searchIcon: {
    margin: 0,
    padding: "4px 5px 0 7px",
    background: purpleColor,
    border: "1px solid " + purpleColor,
    zIndex: 100,
    cursor: "pointer",
    color: whiteColor,
    "&:hover": {
      backgroundColor: blackColor,
      border: "1px solid " + blackColor,
      color: whiteColor,
    },
  },
  iconThemeMenu: {
    color: whiteColor,
    verticalAlign: "middle",
    borderRadius: 50,
    padding: 8,
    background: purpleColor,
    fontSize: 32,
    marginRight: 15,
  },
  inputInput: {
    padding: "9px 10px",
    width: 250,
    height: 20,
    fontSize: 14,
    borderRadius: 0,
    border: "1px solid rgba(0, 0, 0, 0.23)",
    color: blackColor,
    float: "left",
    "&:hover": {
      border: "1px solid " + purpleColor,
    },
  },
  inputRoot: {
    color: "inherit",
    display: "block",
  },
  filterSearchHome: {
    padding: 10,
    border: "1px solid rgb(241, 241, 241)",
    borderRadius: 6,
    background: "#fff",
    width: "100%",
    display: "flex",
    margin: "30px 0px 0px 0px",
    justifyContent: "center",
  },
  selectFilterSearchHome: {
    fontSize: 16,
    height: 40,
    borderRadius: 1,
  },
  linkMenu: {
    color: "inherit",
    textTransform: "uppercase",
    textDecoration: "none",
    "&:hover": {
      color: purpleColor,
      textDecoration: "none",
      backgroundColor: "transparent",
    },
  },
});

const drawerMenu = {
  drawer: {
    width: 250,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 250,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
};

const AppBarStyle = styled(AppBar)(({ theme }) => ({
  background: "#fff",
  borderBottom: "1px solid rgb(241, 241, 241)",
  boxShadow:
    "0px 2px 4px -1px rgb(241 241 241 / 60%), 0px 4px 5px 0px rgb(241 241 241 / 50%), 0px 1px 10px 0px rgb(241 241 241 / 50%)",
}));

export { headerStyle, drawerMenu, AppBarStyle };
