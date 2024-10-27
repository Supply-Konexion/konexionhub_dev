// Este archivo define la vista del Dashboard para los Clientes en la aplicación.
// Importa varios componentes y librerías necesarias para su funcionamiento.

// @material-ui/core
import { makeStyles } from "@mui/styles";
import { ArrowRightAlt } from "@mui/icons-material";
// Componentes principales
import { Stack, Grid } from "@mui/material";

// Importación de gráficos
import BarChartPropertiesCities from "views/Graphs/BarChartPropertiesCities";
import PieChartPropertiesType from "views/Graphs/PieChartPropertiesType";

// Importación de estilos y componentes personalizados
import {
  dashboardStyle,
  ButtonExit,
  TitleTextPage,
} from "components/dashboardStyle.js";

// Definición de estilos
const useStyles = makeStyles(dashboardStyle);

// Componente principal del Dashboard de Clientes
export default function DashboardCustomers() {
  const classes = useStyles();

  // Definición de estados
  const [buttonProperties, setButtonProperties] = useState(false);

  // Efecto para el scroll al inicializar el componente
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Navegación basada en estado
  if (buttonProperties) {
    return <Navigate to="/account/properties" />;
  }

  // Renderizado del componente
  return (
    <div>
    </div>
  );
}