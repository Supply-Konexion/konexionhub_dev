import { createStyles } from "@mui/styles";

import {
  defaultFontButtom,
  defaultFont,
  dangerColor,
  whiteColor,
  purpleColor,
  blackColor,
} from "./material-dashboard-react.js";

import dropdownStyle from "components/dropdownStyle.js";

const headerLinksStyle = createStyles({
  ...dropdownStyle(),
  search: {
    "& > div": {
      marginTop: "0",
    },
    /* [theme.breakpoints.down("sm")]: {
      margin: "10px 15px !important",
      float: "none !important",
      paddingTop: "1px",
      paddingBottom: "1px",
      padding: "0!important",
      width: "60%",
      marginTop: "40px",
      "& input": {
        color: whiteColor,
      },
    },*/
    // Estilos específicos para pantallas de tamaño pequeño
    "@media (max-width: 959px)": {
      margin: "10px 15px !important",
      float: "none !important",
      paddingTop: "1px",
      paddingBottom: "1px",
      padding: "0!important",
      width: "60%",
      marginTop: "40px",
      "& input": {
        color: whiteColor,
      },
    },
  },
  linkText: {
    ...defaultFont,
    fontSize: 10,
    marginTop: 20,
    float: "right",
  },
  buttonSubmit2: {
    margin: "10px 15px 0",
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
  },
  buttonLeft: {
    color: blackColor,
    margin: "10px 1px 0",
    padding: "8px 20px",
    fontSize: 12,
    ...defaultFontButtom,
    borderRadius: 1,
    backgroundColor: whiteColor,
    border: "1px solid " + blackColor,
    "&:hover": {
      backgroundColor: blackColor,
      color: "#fff",
    },
  },
  buttonLink: {
    /* [theme.breakpoints.down("sm")]: {
      display: "flex",
      margin: "10px 15px 0",
      width: "-webkit-fill-available",
      "& svg": {
        width: "24px",
        height: "30px",
        marginRight: "15px",
        marginLeft: "-15px",
      },
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "24px",
        lineHeight: "30px",
        width: "24px",
        height: "30px",
        marginRight: "15px",
        marginLeft: "-15px",
      },
      "& > span": {
        justifyContent: "flex-start",
        width: "100%",
      },
    },*/
    // Estilos específicos para pantallas de tamaño pequeño
    "@media (max-width: 959px)": {
      display: "flex",
      margin: "10px 15px 0",
      width: "-webkit-fill-available",
      "& svg": {
        width: "24px",
        height: "30px",
        marginRight: "15px",
        marginLeft: "-15px",
      },
      "& .fab,& .fas,& .far,& .fal,& .material-icons": {
        fontSize: "24px",
        lineHeight: "30px",
        width: "24px",
        height: "30px",
        marginRight: "15px",
        marginLeft: "-15px",
      },
      "& > span": {
        justifyContent: "flex-start",
        width: "100%",
      },
    },
  },
  searchButton: {
    /*[theme.breakpoints.down("sm")]: {
      top: "-50px !important",
      marginRight: "22px",
      float: "right",
    },*/
    // Estilos específicos para pantallas de tamaño pequeño
    "@media (max-width: 959px)": {
      top: "-50px !important",
      marginRight: "22px",
      float: "right",
    },
  },
  margin: {
    zIndex: "4",
    margin: "0",
  },
  searchIcon: {
    width: "17px",
    zIndex: "4",
  },
  notifications: {
    zIndex: "4",
    /*[theme.breakpoints.up("md")]: {
      position: "absolute",
      top: "2px",
      border: "1px solid " + whiteColor,
      right: "4px",
      fontSize: "9px",
      background: dangerColor[0],
      color: whiteColor,
      minWidth: "16px",
      height: "16px",
      borderRadius: "10px",
      textAlign: "center",
      lineHeight: "16px",
      verticalAlign: "middle",
      display: "block",
    },
    [theme.breakpoints.down("sm")]: {
      ...defaultFont,
      fontSize: "14px",
      marginRight: "8px",
    },*/
    // Estilos específicos para pantallas de tamaño mediano y superior
    "@media (min-width: 960px)": {
      position: "absolute",
      top: "2px",
      border: "1px solid " + whiteColor,
      right: "4px",
      fontSize: "9px",
      background: dangerColor[0],
      color: whiteColor,
      minWidth: "16px",
      height: "16px",
      borderRadius: "10px",
      textAlign: "center",
      lineHeight: "16px",
      verticalAlign: "middle",
      display: "block",
    },
    // Estilos específicos para pantallas de tamaño pequeño
    "@media (max-width: 959px)": {
      ...defaultFont,
      fontSize: "14px",
      marginRight: "8px",
    },
  },
  manager: {
    /*[theme.breakpoints.down("sm")]: {
      width: "100%",
    },*/
    // Estilos específicos para pantallas de tamaño pequeño
    "@media (max-width: 959px)": {
      width: "100%",
    },
    display: "inline-block",
  },
  searchWrapper: {
    /*[theme.breakpoints.down("sm")]: {
      width: "-webkit-fill-available",
      margin: "10px 15px 0",
    },*/
    // Estilos específicos para pantallas de tamaño pequeño
    "@media (max-width: 959px)": {
      width: "-webkit-fill-available",
      margin: "10px 15px 0",
    },
    display: "inline-block",
  },
});

export { headerLinksStyle, blackColor };
