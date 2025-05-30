import React, { useEffect, useState } from 'react';
import Sectiontitle from '../../Layout/Sectiontitle/Sectiontitle';
import useMenu from '../useMenu/useMenu';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import Useaxiossecure, { axiosSecure } from '../Useaxiossecure/Useaxiossecure';
import axiosPublic from '../axiosPublic/axiosPublic';
import { Link, useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';

const Manageitems = () => {

    const [currentpage, setCurrentpage] = useState(0)
    const axiosSecure = Useaxiossecure()




    const { data: alldata = [], refetch: datafetch, isLoading: data_loading } = useQuery({
        queryKey: ['allstats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payment-stats')
            console.log(res.data.menuItems)
            return res.data.menuItems;
        }
    })

    const itemperPage = 6;
    const numberofpage = Math.ceil(alldata / itemperPage)

    const pages = [...Array(numberofpage).keys()]


    const { data: menu = [], refetch, isLoading } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allmenu?page=${currentpage}&size=${itemperPage}`)

            return res.data;
        }
    })


    useEffect(() => {
        refetch()
    }, [currentpage])


    if (isLoading || data_loading) {
        return <Loading></Loading>
    }




    const handledelete = (item) => {
        console.log(item._id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const result = await axiosSecure.delete(`/menu/${item._id}`)
                console.log(result.data)
                if (result.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }

            }
        });
    }
    return (
        <>
            <Sectiontitle title={"MANAGE ALL ITEMS"} subtitle={"---Hurry Up!---"}></Sectiontitle>
            <>
                <div className="overflow-x-auto sm:overflow-x-hidden  p-5">
                    <div className="w-full overflow-auto">
                        <table className="table min-w-full border-collapse border border-gray-300">
                            <thead className='bg-gray-800 text-white'>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menu.map((m, index) => (
                                    <tr key={m._id} className="bg-base-200 border-b border-gray-300">
                                        <th>{index + 1 + (currentpage * itemperPage)}</th>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={m.image} alt={m.name} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap">{m.name}</td>
                                        <td className="whitespace-nowrap">{m.price}</td>
                                        <td>
                                            <Link to={`/dashboard/edititems/${m._id}`}>
                                                <button className="btn bg-yellow-700 text-white w-[95px] flex items-center">
                                                    <FaRegEdit className="mr-1" /> Edit
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button onClick={() => handledelete(m)} className="btn bg-red-700 text-white w-[105px] flex items-center">
                                                <MdDelete className="mr-1" /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-center p-5 flex-wrap gap-2">
                    {pages.map(p => (
                        <input
                            key={p}
                            onClick={() => setCurrentpage(p)}
                            className="join-item btn btn-square text-sm sm:text-base"
                            type="radio"
                            name="options"
                            aria-label={p + 1}
                            checked={currentpage === p && "checked"}
                        />
                    ))}
                </div>
            </>
        </ >
    );
};

export default Manageitems;