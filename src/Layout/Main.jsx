import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import Navber from "./Navber/Navber";

const Main = () => {
  const location = useLocation();
  const noheader = location.pathname.includes("login");
  return (
    <div>
      {noheader || <Navber></Navber>}

      <Outlet></Outlet>

      {noheader || <Footer></Footer>}
    </div>
  );
};

export default Main;
