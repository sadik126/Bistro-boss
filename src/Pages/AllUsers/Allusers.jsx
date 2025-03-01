import React, { useState } from 'react';
import Useaxiossecure from '../Useaxiossecure/Useaxiossecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashCan, FaUsers } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const Allusers = () => {
  const axiosSecure = Useaxiossecure();
  const [role, setRole] = useState("");
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users', {
        headers: {
          authorization: `Bearer ${localStorage.getItem('access-token')}`
        }
      });
      return res.data;
    }
  })

  const handleadmin = (user) => {
    if (!role) {
      Swal.fire("⚠ Please select a role first!", "", "warning");
      return;
    }
    console.log(role)
    axiosSecure.patch(`/users/${user._id}`, { role })
      .then(res => {
        console.log(res.data)
        refetch()
        if (res.data.modifiedCount > 0) {
          refetch()
          Swal.fire({
            title: "Thanks for updating!",
            text: `the user ${user.name} has been updated to ${role}`,
            icon: "success"
          });
        }
      })
  }


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch()
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          })

      }
    });
  }
  return (
    <div>
      <div className='flex justify-evenly my-4'>
        <h2 className='text-3xl'>All Users</h2>
        <h2 className='text-3xl'>Total Users : {users.length}</h2>

      </div>

      <div className="overflow-x-auto h-screen p-5">
        <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">Action</th>
              <th className="py-3 px-6">Delete</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user, index) => (
              <tr key={user._id} className="border-b hover:bg-gray-100 transition-all">
                <td className="py-3 px-6 text-center">{index + 1}</td>
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">
                  <span className={`p-2 rounded text-white ${user.role === 'Admin' ? 'bg-red-500' : user.role === 'Moderator' ? 'bg-blue-500' : 'bg-green-500'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-6 text-center flex">
                  {user.role === 'Admin' ?
                    <span></span> : user.role === 'Moderator' ?
                      <span></span> :
                      <select className="select select-ghost w-full max-w-xs ml-2" onChange={(e) => setRole(e.target.value)}>
                        <option disabled selected>Choose your role</option>
                        <option value="Admin">Admin</option>
                        <option value="Moderator">Moderator</option>
                        <option value="Member">Member</option>
                      </select>}
                  {user.role === 'Member' && (
                    <button onClick={() => handleadmin(user)} className="btn bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                      Confirm
                    </button>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  {
                    user.role !== 'Admin' && <button onClick={() => handleDelete(user._id)} className="btn bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                      <FaTrashCan />
                    </button>
                  }

                </td>
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
    </div>
  );
};

export default Allusers;