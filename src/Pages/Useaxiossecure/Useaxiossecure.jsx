import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Authprovider/Authprovider";

export const axiosSecure = axios.create({
  baseURL: "http://localhost:7065",
});
const Useaxiossecure = () => {
  const { logOut } = useContext(AuthContext)
  const navigate = useNavigate();
  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token');
    // console.log('request stopped by interceptors')
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }, function (error) {
    return Promise.reject(error);
  })

  axiosSecure.interceptors.response.use(function (response) {
    // console.log('response stopped by interceptors')
    return response;
  }, async (error) => {
    // console.log('status error in' , error)
    const status = error.response.status;
    // if(status === 401 ){
    //   // localStorage.removeItem('access-token');
    //   // window.location.href = '/login';
    //   await logOut();
    //   navigate('/login');

    // }
    if (status === 401 || status === 403) {
      await logOut();
      navigate("/login", { replace: true });
    }
    // else if (status === 403) {
    //   console.warn("Access denied: You do not have admin privileges");
    // }
    return Promise.reject(error)
  })
  return axiosSecure;
};

export default Useaxiossecure;
