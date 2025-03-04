import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Authprovider/Authprovider';
import { ChefHat, Truck, Users, Wallet } from 'lucide-react';
import ProfileCard from './ProfileCard';
import { FaPhone, FaStore, FaWallet } from 'react-icons/fa6';
import Card from './Card';
import ActivityCard from './ActivityCard';
import useMenu from '../useMenu/useMenu';
import { useQuery } from '@tanstack/react-query';
import axiosPublic from '../axiosPublic/axiosPublic';

const UserHome = () => {
    const { user } = useContext(AuthContext)
    const [menu] = useMenu()

    const [reviews, setReviews] = useState([]);
    const axiospublic = axiosPublic()


    // const allaxiospublic = axiosPublic()

    useEffect(() => {
        fetch(`https://bistro-boss-server-a7ed.onrender.com/review`)
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);

    const { data: mybooking = [], refetch, isLoading } = useQuery({
        queryKey: ['mybooking'],
        queryFn: async () => {
            const res = await axiospublic.get(`/booking?email=${user?.email}`)
            return res.data;
        },
        enabled: !!user?.email
    })

    const delivered = mybooking.filter(p => p.status === 'delivered')

    const review = reviews.filter(r => r.name === user?.displayName)

    const payment = mybooking.length
    console.log(mybooking)
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Welcome Message */}
            <h1 className="text-2xl font-semibold mb-4">Hi, Welcome Back!</h1>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card icon={<FaWallet />} number={menu.length} title="Menu" color="from-purple-400 to-pink-300" />
                <Card icon={<FaStore />} number="103" title="Shop" color="from-yellow-500 to-orange-300" />
                <Card icon={<FaPhone />} number="03" title="Contact" color="from-red-400 to-pink-300" />
            </div>

            {/* Profile & Activities Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <ProfileCard name={user?.displayName} img={user?.photoURL} />
                <ActivityCard orders={mybooking?.length} reviews={review.length} bookings={delivered.length} payments={payment} />
            </div>
        </div>
    );
};

export default UserHome;