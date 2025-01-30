import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Authprovider/Authprovider";
import Loading from "../Loading/Loading";

const Semiprotected = () => {
  const { loading, user } = useContext(AuthContext);

  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return children;
  }
  return <Navigate state={location.pathname} to="/error"></Navigate>;
};

export default Semiprotected;
