import { styled } from "@mui/material/styles";
import { createStyles } from "@mui/styles";

import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

import {
  drawerWidth,
  transition,
  container,
  infoColor,
  blackColor,
} from "./material-dashboard-react.js";

const appStyle = createStyles({
  wrapper: {
    //position: "relative",
    top: "0",
    // height: "100vh",
  },
  mainPanel: {
    /*[theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },*/
    // Estilos específicos para pantallas de tamaño mediano y superior
    '@media (min-width: 960px)': {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",    
  },
  content: {
    padding: "10px 15px",
    minHeight: "calc(100vh - 123px)",
    background: "rgb(247, 247, 247);",
  },
  container,
  map: {
    padding: "1% 3%",
  },
  colorButtom: {
    background: infoColor,
  },
});

const CircularProgressTheme = styled(CircularProgress)(({ theme }) => ({
  [`& .${circularProgressClasses.circle}`]: {
    color: blackColor,
  },
}));

export { appStyle, CircularProgressTheme };
