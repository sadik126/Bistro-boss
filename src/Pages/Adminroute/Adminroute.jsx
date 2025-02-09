import React, { useContext } from 'react';
import Useadmin from '../Useadmin/Useadmin';
import { AuthContext } from '../Authprovider/Authprovider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Loading/Loading';

const Adminroute = ({children}) => {
    const [isAdmin , isAdminloading] = Useadmin();
    const {user , loading} = useContext(AuthContext)
    const location = useLocation();

    if (loading || isAdminloading) {
      return <Loading></Loading>;
    }
  
    if (user && isAdmin) {
      return children;
    }
    return <Navigate state={{ from: location }} replace to="/"></Navigate>;
};

export default Adminroute;