import { styled } from "@mui/material/styles";
import { createStyles } from "@mui/styles";

import { ListItem, Drawer } from "@mui/material";

import {
  drawerWidth,
  transition,
  purpleBoxShadow,
  defaultFont,
  primaryBoxShadow,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor,
  blackColor,
  hexToRgb,
  defaultFontButtom,
  purpleColor,
} from "./material-dashboard-react.js";

const sidebarStyle = createStyles({
  drawerPaper: {
    border: "none",
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    zIndex: "1",
    ...purpleBoxShadow,
    width: drawerWidth,
    /*[theme.breakpoints.up("md")]: {
      width: drawerWidth,
      position: "fixed",
      height: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
      ...purpleBoxShadow,
      position: "fixed",
      display: "block",
      top: "0",
      height: "100vh",
      right: "0",
      left: "auto",
      zIndex: "1032",
      visibility: "visible",
      overflowY: "visible",
      borderTop: "none",
      textAlign: "left",
      paddingRight: "0px",
      paddingLeft: "0",
      transform: `translate3d(${drawerWidth}px, 0, 0)`,
      ...transition,
    },*/
    // Estilos específicos para pantallas de tamaño mediano y superior
    "@media (min-width: 960px)": {
      width: drawerWidth,
      position: "fixed",
      height: "100%",
    },
    // Estilos específicos para pantallas de tamaño pequeño
    "@media (max-width: 959px)": {
      width: drawerWidth,
      ...purpleBoxShadow,
      position: "fixed",
      display: "block",
      top: "0",
      height: "100vh",
      right: "0",
      left: "auto",
      zIndex: "1032",
      visibility: "visible",
      overflowY: "visible",
      borderTop: "none",
      textAlign: "left",
      paddingRight: "0px",
      paddingLeft: "0",
      transform: `translate3d(${drawerWidth}px, 0, 0)`,
      ...transition,
    },
  },
  drawerPaperRTL: {
    /* [theme.breakpoints.up("md")]: {
      left: "auto !important",
      right: "0 !important",
    },
    [theme.breakpoints.down("sm")]: {
      left: "0  !important",
      right: "auto !important",
    },*/
    // Estilos específicos para pantallas de tamaño mediano y superior
    "@media (min-width: 960px)": {
      left: "auto !important",
      right: "0 !important",
    },

    // Estilos específicos para pantallas de tamaño pequeño
    "@media (max-width: 959px)": {
      left: "0 !important",
      right: "auto !important",
    },
  },
  logo: {
    position: "relative",
    padding: "40px 20px",
    zIndex: "4",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: "0",
      height: "1px",
      //width: "calc(100% - 30px)",
      backgroundColor: "rgba(" + hexToRgb(grayColor[6]) + ", 0.3)",
    },
  },
  logoLink: {
    ...defaultFont,
    textTransform: "uppercase",
    padding: "5px 0",
    display: "block",
    fontSize: "18px",
    textAlign: "left",
    fontWeight: "400",
    lineHeight: "30px",
    textDecoration: "none",
    backgroundColor: "transparent",
    "&,&:hover": {
      color: whiteColor,
    },
  },
  logoLinkRTL: {
    textAlign: "right",
  },
  logoImage: {
    display: "inline-block",
    maxHeight: "30px",
  },
  img: {
    width: "150px",
    verticalAlign: "middle",
    border: "0",
    marginLeft: "20px",
  },
  background: {
    position: "absolute",
    zIndex: "1",
    height: "100%",
    width: "100%",
    display: "block",
    top: "0",
    left: "0",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    "&:after": {
      position: "absolute",
      zIndex: "3",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      //  background: whiteColor,
      //background: "linear-gradient(60deg, #ffa726, #fb8c00);",
      // opacity: ".8"
    },
  },
  backgroundHome: {
    position: "absolute",
    zIndex: "1",
    height: "100%",
    width: "100%",
    display: "block",
    top: "0",
    left: "0",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    "&:after": {
      position: "absolute",
      zIndex: "3",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      background: "#FFF",
      // background: "linear-gradient(60deg, #ffa726, #fb8c00);",
      // opacity: ".8"
    },
  },
  list: {
    marginTop: "20px",
    paddingLeft: "0",
    paddingTop: "0",
    paddingBottom: "0",
    marginBottom: 50,
    listStyle: "none",
    position: "unset",
  },
  item: {
    position: "relative",
    display: "block",
    textDecoration: "none",
    "&:hover,&:focus,&:visited,&": {
      color: whiteColor,
    },
  },
  itemLink: {
    width: "auto",
    transition: "all 300ms linear",
    margin: "5px 15px 0",
    borderRadius: "3px",
    position: "relative",
    display: "block",
    padding: "10px 15px",
    backgroundColor: "red",
    ...defaultFont,
    "&:hover,&:focus,&:visited,&": {
      color: "red",
      backgroundColor: "#000",
    },
  },
  iconButtom: {
    fontSize: 14,
    margin: "0 5px",
    color: whiteColor,
  },
  itemLinkCollapseSubmenu: {
    width: "auto",
    transition: "all 300ms linear",
    margin: "8px 12px 0",
    borderRadius: "3px",
    position: "relative",
    display: "flex",
    padding: "3px 8px",
    backgroundColor: "#ffffff",
  },
  itemIconRTL: {
    marginRight: "3px",
    marginLeft: "15px",
    float: "right",
  },
  itemIcon: {
    lineHeight: "30px",
    float: "left",
    verticalAlign: "middle",
    padding: "3.5px 4px",
    // color: "rgba(" + hexToRgb(whiteColor) + ", 0.8)"
    color: whiteColor,
  },
  purpleIcon: {
    lineHeight: "30px",
    float: "left",
    textAlign: "center",
    verticalAlign: "middle",
    color: blackColor,
    backgroundColor: whiteColor,
    padding: "3.5px 4px",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  itemText: {
    ...defaultFont,
    margin: 0,
    lineHeight: "25px",
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "400",
    padding: "0px 0px 0px 8px",
  },
  itemTextPurple: {
    ...defaultFont,
    margin: 0,
    lineHeight: "25px",
    fontSize: 14,
    color: `${blackColor} !important`,
    backgroundColor: "#ffffff",
    fontWeight: "400",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    padding: "3px 0px 3px 8px",
  },
  itemText2: {
    ...defaultFont,
    marginTop: 70,
    padding: "20px 20px 0 20px",
    fontSize: 14,
    // color: whiteColor
    color: "#000",
    fontWeight: "bold",
  },
  itemText3: {
    ...defaultFont,
    marginTop: 10,
    padding: "20px 20px 0 20px",
    fontSize: "16px",
    // color: whiteColor
    color: "#000",
    fontWeight: "bold",
  },
  itemTextRTL: {
    textAlign: "right",
  },
  whiteFont: {
    color: whiteColor,
  },
  purple: {
    backgroundColor: purpleColor,
    ...primaryBoxShadow,
    color: whiteColor,
    marginRight: 0,
    padding: "5px 10px",
    "&:hover,&:focus": {
      backgroundColor: purpleColor,
      ...primaryBoxShadow,
    },
  },
  black: {
    backgroundColor: blackColor,
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(blackColor) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(blackColor) +
      ",.2)",
    "&:hover,&:focus": {
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
  green: {
    backgroundColor: successColor[0],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(successColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(successColor[0]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: successColor[0],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(successColor[0]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(successColor[0]) +
        ",.2)",
    },
  },
  orange: {
    backgroundColor: warningColor[0],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(warningColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(warningColor[0]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: blackColor,
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(warningColor[0]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(warningColor[0]) +
        ",.2)",
    },
  },
  red: {
    backgroundColor: dangerColor[0],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(dangerColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(blackColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(dangerColor[0]) +
      ",.2)",
    "&:hover,&:focus": {
      backgroundColor: dangerColor[0],
      boxShadow:
        "0 12px 20px -10px rgba(" +
        hexToRgb(dangerColor[0]) +
        ",.28), 0 4px 20px 0 rgba(" +
        hexToRgb(blackColor) +
        ",.12), 0 7px 8px -5px rgba(" +
        hexToRgb(dangerColor[0]) +
        ",.2)",
    },
  },
  sidebarWrapper: {
    position: "relative",
    height: "calc(100vh - 75px)",
    overflow: "auto",
    width: "230px",
    zIndex: "4",
    overflowScrolling: "touch",
  },
  sidebarWrapperHome: {
    position: "relative",
    height: "100%",
    overflow: "auto",
    width: "230px",
    zIndex: "4",
    overflowScrolling: "touch",
  },
  activePro: {
    /*[theme.breakpoints.up("md")]: {
      position: "absolute",
      width: "100%",
      bottom: "13px",
      "&:hover": {
        background: "#000",
      },
    },*/
    // Estilos específicos para pantallas de tamaño mediano y superior
    "@media (min-width: 960px)": {
      position: "absolute",
      width: "100%",
      bottom: "13px",
      "&:hover": {
        background: "#000",
      },
    },
  },
  titleButtom: {
    ...defaultFont,
    marginTop: 2,
    fontSize: 14,
  },
  buttonRight: {
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
  buttonLeft: {
    padding: "8px 20px",
    fontSize: 12,
    ...defaultFontButtom,
    borderRadius: 1,
  },
  buttomGroup: { float: "right", marginBottom: 20 },
  itemLinkCollapse: {
    width: "auto",
    transition: "all 300ms linear",
    borderRadius: "3px",
    position: "relative",
    display: "flex",
    padding: "10px 15px",
    backgroundColor: "transparent",
    //margin: "5px 15px 0",
  },
  itemLinkCollapseName: {
    ...defaultFont,
    fontSize: 14,
    fontWeight: 400,
    marginLeft: 10,
  },
  itemLinkCollapseNameSub: {
    ...defaultFont,
    fontSize: 13,
    marginLeft: 5,
  },
});

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  paddingTop: "5px !important",
  paddingBottom: "5px !important",
}));

const DrawerStyle = styled(Drawer)(({ theme }) => ({
  "&.MuiDrawer-root .MuiDrawer-paper": {
    background: `linear-gradient(to bottom, rgba(0, 132, 182, 0.9) 15%, rgba(11, 37, 69, 1))`,
  },
}));

export { sidebarStyle, ListItemStyle, purpleColor, DrawerStyle };
