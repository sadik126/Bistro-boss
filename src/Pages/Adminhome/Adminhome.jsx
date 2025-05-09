import React, { useContext } from 'react';
import { AuthContext } from '../Authprovider/Authprovider';
import Useaxiossecure from '../Useaxiossecure/Useaxiossecure';
import { useQuery } from '@tanstack/react-query';
import { ChefHat, Truck, Users, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const Adminhome = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = Useaxiossecure();



    const { data: stats = [] } = useQuery({
        queryKey: ['payment-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payment-stats');
            return res.data;
        }
    })

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats')
            // console.log(chartData)
            return res.data;
        }
    })


    const statsadmin = [
        { icon: <Wallet size={40} />, value: stats.revenue, label: "Revenue", color: "from-purple-500 to-pink-300" },
        { icon: <Users size={40} />, value: stats.users, label: "Customers", color: "from-yellow-500 to-orange-800" },
        { icon: <ChefHat size={40} />, value: stats.menuItems, label: "Products", color: "from-pink-500 to-pink-300" },
        { icon: <Truck size={40} />, value: stats.orders, label: "Orders", color: "from-blue-500 to-blue-300" },
    ];





    const COLORS = ["#4285F4", "#EA4335", "#FB8C00", "#34A853", "#9C27B0"];
    return (
        <div className='min-h-screen p-5 bg-gray-100'>
            <h2 className='text-3xl font-bold text-center mb-6'>Hi, Welcome {user.displayName}</h2>

            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
                {statsadmin.map((stat, index) => (
                    <div
                        key={index}
                        className={`flex items-center p-6 w-full sm:w-64 rounded-2xl shadow-lg text-white bg-gradient-to-r ${stat.color}`}
                    >
                        <div className="mr-4 text-3xl">{stat.icon}</div>
                        <div>
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-sm">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="flex flex-col lg:flex-row justify-center items-center gap-10 mt-10">
                {/* Bar Chart */}
                <div className="bg-white shadow-lg rounded-xl p-5 w-full sm:w-96">
                    <h2 className="text-xl font-semibold mb-3 text-center">Quantity Sold</h2>
                    <BarChart width={350} height={300} data={chartData} className="mx-auto">
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="quantity" fill="#8884d8">
                            {chartData?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>

                {/* Pie Chart */}
                <div className="bg-white shadow-lg rounded-xl p-5 w-full sm:w-80">
                    <h2 className="text-xl font-semibold mb-3 text-center">Revenue Distribution</h2>
                    <PieChart width={300} height={300} className="mx-auto">
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="revenue"
                            label
                        >
                            {chartData?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </div>
            </div>
        </div>

    );
};

export default Adminhome;