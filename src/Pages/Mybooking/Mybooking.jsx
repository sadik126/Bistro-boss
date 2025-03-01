import React, { useContext } from 'react';
import axiosPublic from '../axiosPublic/axiosPublic';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Authprovider/Authprovider';
import { format } from 'date-fns';
import Sectiontitle from '../../Layout/Sectiontitle/Sectiontitle';

const Mybooking = () => {
    const { user } = useContext(AuthContext)
    const axiospublic = axiosPublic()
    const { data: mybooking = [], refetch } = useQuery({
        queryKey: ['mybooking'],
        queryFn: async () => {
            const res = await axiospublic.get(`/booking?email=${user?.email}`)
            return res.data;
        },
        enabled: !!user?.email
    })
    return (
        <>

            <div className='flex justify-evenly my-4'>

                <Sectiontitle title={"MANAGE ALL BOOKING"} subtitle={"---Hurry Up!---"}></Sectiontitle>

            </div>

            <div className="overflow-x-auto h-screen p-5">
                <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6">#</th>

                            <th className="py-3 px-6">Email</th>
                            <th className="py-3 px-6">Price</th>
                            <th className="py-3 px-6">Transaction Id</th>
                            <th className="py-3 px-6">Date</th>
                            <th className="py-3 px-6">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {mybooking.map((booking, index) => (
                            <tr key={booking._id} className="border-b hover:bg-gray-100 transition-all">
                                <td className="py-3 px-6 text-center">{index + 1}</td>

                                <td className="py-3 px-6">{booking.email}</td>
                                <td className="py-3 px-6">
                                    ${
                                        booking.price
                                    }
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {
                                        booking.transationId
                                    }
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {
                                        format(new Date(booking.date), "EEEE, MMMM do, yyyy, h:mm:ss a")

                                    }
                                </td>
                                <td className="py-3 px-6">{booking.status === 'pending' ? <button className="btn btn-active bg-yellow-500">Pending</button> : <button className="btn btn-active bg-green-700">Delivered</button>}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <table className="table w-full ">
                    
                      <thead className='bg-orange-400'>
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                    
                        {
                          // users.map((user, index) => <tr className="bg-base-200" key={user._id}>
                          //   <th>{index + 1}</th>
                          //   <td>{user.name}</td>
                          //   <td>{user.email}</td>
                          //   <td className='flex'>
                          //     {
                          //       user.role === 'Admin' ? <span className='bg-red-700 text-white p-3 rounded-md'>Admin</span> :
                          //         user.role === 'Moderator' ? <span className='bg-blue-700 text-white p-3 rounded-md'>Moderator</span> :
                          //           <span className='bg-green-700 text-white p-3 rounded-md'>Member</span>
                          //     }
                          //     {user.role === 'Admin' ?
                          //       <span></span> : user.role === 'Moderator' ?
                          //         <span></span> :
                          //         <select className="select select-ghost w-full max-w-xs ml-2" onChange={(e) => setRole(e.target.value)}>
                          //           <option disabled selected>Choose your role</option>
                          //           <option value="Admin">Admin</option>
                          //           <option value="Moderator">Moderator</option>
                          //           <option value="Member">Member</option>
                          //         </select>}
                          //     <td>
                          //       {user.role === 'Admin' ?
                          //         <span></span> : user.role === 'Moderator' ?
                          //           <span></span> : <button onClick={() => handleadmin(user)} className="btn bg-red-700 text-white btn-xs">Confirm</button>
                          //       }
            
                              
            
                          //     </td>
                          //   </td>
                          //   <td><button onClick={() => handleDelete(user._id)} className="btn bg-red-700 text-white btn-md"><FaTrashCan width={'200px'} /></button></td>
                          // </tr>)
                        }
            
            
                      </tbody>
                    </table> */}
            </div>
        </>
    );
};

export default Mybooking;