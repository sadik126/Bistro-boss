import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../Authprovider/Authprovider';
import Useaxiossecure from '../Useaxiossecure/Useaxiossecure';

const Useadmin = () => {
    const { user } = useContext(AuthContext)
    console.log("User from AuthContext:", user);
    const axiosSecure = Useaxiossecure();
    const { data: isAdmin, isPending: isAdminloading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/admin/${user?.email}`)
            console.log("Admin Status Response:", res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminloading]
};

export default Useadmin;