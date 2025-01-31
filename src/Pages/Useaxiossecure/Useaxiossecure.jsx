import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: "http://localhost:7065",
});
const Useaxiossecure = () => {
  return axiosSecure;
};

export default Useaxiossecure;
