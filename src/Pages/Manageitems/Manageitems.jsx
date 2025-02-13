import React from 'react';
import Sectiontitle from '../../Layout/Sectiontitle/Sectiontitle';
import useMenu from '../useMenu/useMenu';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import Useaxiossecure, { axiosSecure } from '../Useaxiossecure/Useaxiossecure';
import axiosPublic from '../axiosPublic/axiosPublic';
import { Link } from 'react-router-dom';

const Manageitems = () => {
    const [menu, loading, refetch] = useMenu();
    const axiosSecure = Useaxiossecure()

    // const allaxios = axiosPublic()

    const handleedit = (item) => {
        console.log(item)
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
                <div className="overflow-x-auto h-screen p-5">
                    <table className="table w-full">
                        {/* head */}
                        <thead className='bg-orange-400'>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                menu.map((m, index) =>
                                    <tr key={m._id} className="bg-base-200">
                                        <th>{index + 1}</th>
                                        <td> <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={m.image}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div></td>
                                        <td>{m.name}</td>
                                        <td>{m.price}</td>
                                        <td>
                                            <Link to={`/dashboard/edititems/${m._id}`}>
                                                <button className="btn bg-yellow-700 text-white btn-md"> <FaRegEdit />Edit</button></Link>
                                        </td>
                                        <td><button onClick={() => handledelete(m)} className="btn bg-red-700 text-white btn-md"> <MdDelete /> Delete</button></td>
                                    </tr>)
                            }


                        </tbody>
                    </table>
                </div>

            </>
        </ >
    );
};

export default Manageitems;