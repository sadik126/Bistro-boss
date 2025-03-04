import React, { useContext } from 'react';
import axiosPublic from '../axiosPublic/axiosPublic';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Authprovider/Authprovider';
import { format } from 'date-fns';
import Sectiontitle from '../../Layout/Sectiontitle/Sectiontitle';
import Loading from '../Loading/Loading';

const Mybooking = () => {
    const { user } = useContext(AuthContext)
    const axiospublic = axiosPublic()
    const { data: mybooking = [], refetch, isLoading } = useQuery({
        queryKey: ['mybooking'],
        queryFn: async () => {
            const res = await axiospublic.get(`/booking?email=${user?.email}`)
            return res.data;

        },
        enabled: !!user?.email
    })

    if (isLoading) {
        return <Loading></Loading>
    }

    refetch()
    return (
        <>
            <div className="px-4 py-6">
                {/* Title Section */}
                <div className='flex flex-col  justify-between items-center my-4'>
                    <Sectiontitle title="MANAGE ALL BOOKING" subtitle="---Hurry Up!---" />
                </div>

                {/* Responsive Table Container */}
                <div className="overflow-x-auto p-5">
                    <table className="min-w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                        <thead className="bg-gray-800 text-white text-sm md:text-base">
                            <tr>
                                <th className="py-3 px-4">#</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Price</th>
                                <th className="py-3 px-4">Transaction ID</th>
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm md:text-base">
                            {mybooking.map((booking, index) => (
                                <tr key={booking._id} className="border-b hover:bg-gray-100 transition-all">
                                    <td className="py-3 px-4 text-center">{index + 1}</td>
                                    <td className="py-3 px-4 whitespace-nowrap">{booking.email}</td>
                                    <td className="py-3 px-4 whitespace-nowrap">${booking.price}</td>
                                    <td className="py-3 px-4 whitespace-nowrap text-center">{booking.transationId}</td>
                                    <td className="py-3 px-4 whitespace-nowrap text-center">
                                        {format(new Date(booking.date), "EEEE, MMMM do, yyyy, h:mm:ss a")}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        {booking.status === 'pending' ? (
                                            <button className="btn btn-active bg-yellow-500 text-xs md:text-sm px-2 py-1 rounded-md">Pending</button>
                                        ) : (
                                            <button className="btn btn-active bg-green-700 text-xs md:text-sm px-2 py-1 rounded-md">Delivered</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Mybooking;