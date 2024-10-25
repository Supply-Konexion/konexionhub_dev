import { styled } from "@mui/material/styles";
import { createStyles } from "@mui/styles";

import { Button } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import {
  successColor,
  whiteColor,
  grayColor,
  hexToRgb,
  defaultFontTitle,
  defaultFont,
  purpleColor,
  blackColor,
  defaultFontButtom,
  warningColor,
  defaultFontParagraph,
} from "./material-dashboard-react";

const dashboardStyle = createStyles({
  successText: {
    color: successColor[0],
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px",
  },
  stats: {
    color: grayColor[0],
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
  },
  iconFilter: {
    fontSize: 24,
    color: purpleColor,
    verticalAlign: "middle",
  },
  cardCategory: {
    ...defaultFont,
    //color: grayColor[0],
    fontSize: 12,
    marginTop: 30,
    //padding: 10,
    marginBottom: 10,
    textAlign: "right",
    fontWeight: "600 !important",
  },
  cardCategoryWhite: {
    color: "rgba(" + hexToRgb(whiteColor) + ",.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitle: {
    ...defaultFont,
    color: blackColor,
    marginTop: "0px",
    minHeight: "auto",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: blackColor,
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardNameCompany: {
    minHeight: "auto",
    fontWeight: "600",
    color: "#333",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    textDecoration: "none",
    "& small": {
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardTitleWhite: {
    color: whiteColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
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
  cardDashboardTop: {
    background: blackColor,
    borderRadius: 10,
    padding: "20px 15px",
    width: "99%",
  },
  titleCard: {
    ...defaultFontTitle,
    fontSize: 24,
    marginTop: 25,
  },
  titleCardFilter: {
    ...defaultFontTitle,
    fontSize: 22,
    marginBottom: 5,
    "& small": {
      fontSize: 14,
    },
  },
  cardImg: {
    objectFit: "cover",
    objectPosition: "center",
    verticalAlign: "middle",
    width: "100%",
  },
  cardImg1: {
    objectFit: "cover",
    objectPosition: "center",
    verticalAlign: "middle",
    width: "65%",
  },
  cardTitleBlack: {
    ...defaultFontTitle,
    fontSize: 16,
    color: blackColor,
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "bold",
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
  circleBlueDashboard: {
    ...defaultFontTitle,
    width: 150,
    height: 150,
    background: "#67BCDF",
    borderRadius: 100,
    margin: "0px 0 10px 0px",
    lineHeight: "145px !important",
    fontSize: 28,
    letterSpacing: 2,
    color: "#FFFFFF !important",
    fontWeight: "600 !important",
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(purpleColor) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(purpleColor) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(purpleColor) +
      ",.2)",
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
  buttonSubmitWhite: {
    width: 150,
    padding: "8px 20px",
    fontSize: 14,
    color: "#000",
    ...defaultFontButtom,
    backgroundColor: whiteColor,
    borderColor: whiteColor,
    borderRadius: 10,
    "&:hover": {
      backgroundColor: purpleColor,
      color: whiteColor,
    },
    "&:disabled": {
      backgroundColor: grayColor[11],
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
});

const ButtonStyleWhite0 = styled(Button)(({ theme }) => ({
  width: 150,
  padding: "8px 20px",
  fontSize: 14,
  color: "#fff",
  ...defaultFontButtom,
  backgroundColor: blackColor,
  border: "1px solid",
  borderColor: whiteColor,
  borderRadius: 10,
  "&:hover": {
    backgroundColor: purpleColor,
  },
  "&:disabled": {
    backgroundColor: grayColor[11],
  },
}));

const ButtonStyle0 = styled(Button)(({ theme }) => ({
  width: 200,
  padding: "8px 20px",
  fontSize: 14,
  color: "#fff",
  ...defaultFontButtom,
  backgroundColor: blackColor,
  borderColor: blackColor,
  borderRadius: 10,
  "&:hover": {
    backgroundColor: purpleColor,
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

const TitleTextPage = styled("div")(({ theme }) => ({
  color: blackColor,
  fontSize: 36,
  fontWeight: "bold",
  letterSpacing: ".011em",
  fontFamily: "sans-serif",
}));

const ColorLinearProgress = styled(LinearProgress)(({ theme }) => ({
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: warningColor[0],
    boxShadow:
      "0 12px 20px -10px rgba(" +
      hexToRgb(warningColor[0]) +
      ",.28), 0 4px 20px 0 rgba(" +
      hexToRgb(warningColor[0]) +
      ",.12), 0 7px 8px -5px rgba(" +
      hexToRgb(warningColor[0]) +
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

export {
  dashboardStyle,
  ButtonStyleWhite0,
  ButtonStyle0,
  purpleColor,
  ButtonExit,
  TitleTextPage,
  ColorLinearProgress,
};
