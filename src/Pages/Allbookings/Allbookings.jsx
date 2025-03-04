import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Useaxiossecure from '../Useaxiossecure/Useaxiossecure';
import Sectiontitle from '../../Layout/Sectiontitle/Sectiontitle';
import { SiTicktick } from 'react-icons/si';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import Loading from '../Loading/Loading';

const Allbookings = () => {
    const allaxiossecure = Useaxiossecure()
    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await allaxiossecure.get('/bookings')
            console.log(res.data)
            return res.data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }



    const handlePending = async (id) => {
        await allaxiossecure.patch(`/bookings/admin/${id}`, {

        })
            .then(res => {
                console.log(res.data)
                refetch()
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Thanks for updating!",
                        text: `the item  has been delivered`,
                        icon: "success"
                    });
                }
            })
    }
    return (
        <div>
            <Sectiontitle title={"MANAGE ALL BOOKINGS"} subtitle={"---Hurry Up!---"}></Sectiontitle>
            <>
                <div className="overflow-x-auto h-screen p-5">
                    <table className="table w-full table-auto text-sm md:text-base">
                        {/* head */}
                        <thead className='bg-gray-800 text-white'>
                            <tr>
                                <th></th>


                                <th>Email</th>
                                <th>Price</th>

                                <th>Date</th>
                                <th>Product status</th>
                                <th>Transaction Id</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                bookings.slice().reverse().map((m, index) =>
                                    <tr key={m._id} className="bg-base-200">
                                        <th>{index + 1}</th>


                                        <td>{m.email}</td>
                                        <td>{m.price}</td>
                                        <td>
                                            {format(new Date(m.date), "EEEE, MMMM do, yyyy, h:mm:ss a")
                                            }
                                        </td>
                                        <td>
                                            {m.status === 'pending' ? <button onClick={() => handlePending(m._id)} className="btn btn-active btn-success">Pending</button> : <button className="btn btn-active bg-green-600">Delivered</button>}
                                        </td>
                                        <td>
                                            {m.transationId}
                                        </td>
                                        <td>
                                            {
                                                m.status === 'pending' ? <button className="btn bg-yellow-300 btn-circle">
                                                    <SiTicktick />
                                                </button> : <button className="btn bg-green-700 btn-circle">
                                                    <SiTicktick />
                                                </button>
                                            }
                                        </td>

                                    </tr>)
                            }


                        </tbody>
                    </table>
                </div>

            </>
        </div>
    );
};

export default Allbookings;