import {
  GridView,
} from "@mui/icons-material";

// PAGES
import DashboardPage from "views/Dashboard/Dashboard.js";
import Users from "views/Admin/UsersListAdmin";

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

export default dashboardRoutes;
