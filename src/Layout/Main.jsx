import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import Navber from "./Navber/Navber";
import Loading from "../Pages/Loading/Loading";

const Main = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay (e.g., fetching data, loading assets)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);
  const location = useLocation();
  const noheader =
    location.pathname.includes("login") || location.pathname.includes("signup");

  return (
    <div>

      {
        loading ? <Loading></Loading> : <>  {noheader || <Navber></Navber>}

          <div className="max-w-screen-xl mx-auto">
            <Outlet ></Outlet>
          </div>



          {noheader || <Footer></Footer>}</>
      }

    </div>
  );
};

export default Main;
