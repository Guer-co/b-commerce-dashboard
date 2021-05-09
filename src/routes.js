import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
//import Icons from "views/examples/Icons.js";
import Products from "views/examples/Products.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Orders",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    icon: "ni ni-planet text-blue",
    component: Products,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Edit Company",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  }
];
export default routes;
