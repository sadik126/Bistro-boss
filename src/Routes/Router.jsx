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
import Edititems from "../Pages/Edititems/Edititems";
import Payment from "../Pages/Payment/Payment";
import Paymenthistory from "../Pages/Paymenthistory/Paymenthistory";
import Adminhome from "../Pages/Adminhome/Adminhome";

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
        element: <Privateroute><Order></Order></Privateroute>,
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
      },
      {
        path: 'adminhome',
        element: <Adminroute><Adminhome></Adminhome></Adminroute>
      },
      {
        path: 'manageusers',
        element: <Adminroute><Allusers></Allusers></Adminroute>
      },
      {
        path: 'additems',
        element: <Adminroute><Additems></Additems></Adminroute>
      },
      {
        path: 'edititems/:id',
        element: <Adminroute><Edititems></Edititems></Adminroute>,
        loader: ({ params }) => fetch(`http://localhost:7065/menu/${params.id}`)
      },
      {
        path: 'manageitems',
        element: <Adminroute><Manageitems></Manageitems></Adminroute>

      },
      {
        path: 'paymenthistory',
        element: <Privateroute><Paymenthistory></Paymenthistory></Privateroute>

      },
      {
        path: 'payment',
        element: <Privateroute><Payment></Payment></Privateroute>
      }
    ]
  }
]);
export default router;
