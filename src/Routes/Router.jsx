import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import Allusers from "../Pages/AllUsers/Allusers";
import Adminroute from "../Pages/Adminroute/Adminroute";
import Privateroute from "../Pages/Privateroute/Privateroute";
import Additems from "../Pages/Additems/Additems";
import Manageitems from "../Pages/Manageitems/Manageitems";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/order/:category",
        element: <Order></Order>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <Privateroute><Dashboard></Dashboard></Privateroute>,
    children: [
      {
        path: 'cart',
        element: <Cart></Cart>
      }, {
        path: 'manageusers',
        element: <Adminroute><Allusers></Allusers></Adminroute>
      },
      {
        path: 'additems',
        element: <Adminroute><Additems></Additems></Adminroute>
      },
      {
        path: 'manageitems',
        element: <Adminroute><Manageitems></Manageitems></Adminroute>

      }
    ]
  }
]);
export default router;
