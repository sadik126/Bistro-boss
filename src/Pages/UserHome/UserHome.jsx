import React, { useContext } from 'react';
import { AuthContext } from '../Authprovider/Authprovider';
import { ChefHat, Truck, Users, Wallet } from 'lucide-react';
import ProfileCard from './ProfileCard';
import { FaPhone, FaStore, FaWallet } from 'react-icons/fa6';
import Card from './Card';
import ActivityCard from './ActivityCard';

const UserHome = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Welcome Message */}
            <h1 className="text-2xl font-semibold mb-4">Hi, Welcome Back!</h1>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card icon={<FaWallet />} number="205" title="Menu" color="from-purple-400 to-pink-300" />
                <Card icon={<FaStore />} number="103" title="Shop" color="from-yellow-500 to-orange-300" />
                <Card icon={<FaPhone />} number="03" title="Contact" color="from-red-400 to-pink-300" />
            </div>

            {/* Profile & Activities Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <ProfileCard name={user?.displayName} img={user?.photoURL} />
                <ActivityCard orders={6} reviews={2} bookings={1} payments={3} />
            </div>
        </div>
    );
};

export default UserHome;