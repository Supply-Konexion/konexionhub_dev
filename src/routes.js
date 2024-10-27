// Importaciones de iconos y componentes necesarios
import {
  GridView,
} from "@mui/icons-material";

// PÁGINAS
import DashboardPage from "views/Dashboard/Dashboard.js";
import Users from "views/Admin/UsersListAdmin";

// Definición de las rutas del dashboard
const dashboardRoutes = [
  {
    id: 0,
    subId: "",
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: GridView,
    component: DashboardPage,
    layout: "/account",
    submenu: [],
    margin: 0,
  },
  {
    id: 1,
    subId: "",
    path: "/users",
    name: "Usuarios",
    rtlName: "لوحة القيادة",
    icon: GridView,
    component: Users,
    layout: "/account",
    submenu: [],
    margin: 0,
  },
];

// Exportación de las rutas del dashboard
export default dashboardRoutes;