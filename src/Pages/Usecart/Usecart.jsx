import { useQuery } from "@tanstack/react-query";
import Useaxiossecure from "../Useaxiossecure/Useaxiossecure";
import Authprovider, { AuthContext } from "../Authprovider/Authprovider";
import { useContext } from "react";


const Usecart = () => {
    const axiosSecure = Useaxiossecure()
    const {user} = useContext(AuthContext)
    const { refetch, data: cart =[] } = useQuery({
        queryKey:['cart' , user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`)
            console.log(res.data)
            return res.data;
        }
    })
    return [cart , refetch]
};

export default Usecart;