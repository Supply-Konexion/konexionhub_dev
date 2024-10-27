// Este archivo define la vista del Dashboard en la aplicación.
// Importa varios componentes y librerías necesarias para su funcionamiento.

// Importaciones de librerías y componentes
import { Navigate } from "react-router-dom";
// @material-ui/core
import { makeStyles } from "@mui/styles";
import { ArrowRightAlt, MapsHomeWork } from "@mui/icons-material";
// Componentes principales
import { Stack, Grid, Alert } from "@mui/material";
import axios from "axios";

// Importación de recursos y estilos
import construction from "assets/img/undraw_under_construction_46pa.png";
import {
  dashboardStyle,
  ButtonExit,
  ColorLinearProgress,
} from "components/dashboardStyle.js";
import { blackColor } from "components/material-dashboard-react";

// Definición de estilos
const useStyles = makeStyles(dashboardStyle);

// Componente principal del Dashboard
export default function Dashboard() {
  const classes = useStyles();

  // Definición de estados
  const [returnLogin, setReturnLogin] = React.useState(false);
  const [error, setError] = useState(false);
  const [mensageSystem, setMensageSystem] = useState("");
  const [buttonUsers, setButtonUsers] = useState(false);
  const [buttonProperties, setButtonProperties] = useState(false);
  const [countProject, setCountProject] = useState(0);
  const [countPublication, setCountPublication] = useState(0);

  // Contexto y autorización
  const { urlServices, UserAuth } = useContext(UrlServicesContext);
  let keyAuthorization = UserAuth.Session;

  // Navegación basada en estado
  if (buttonUsers) {
    return <Navigate to="/account/users" />;
  }

  if (buttonProperties) {
    return <Navigate to="/account/properties" />;
  }

  if (returnLogin) {
    return <Navigate to="/" />;
  }

  // Renderizado del componente
  return (
    <div
      className={classes.carDashboard}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 0",
      }}
    >
      <img src={construction} alt="construction" style={{ width: 450 }} />
      <br />
      <br />
      <b> EN DESARROLLO...</b>
    </div>
  );
}