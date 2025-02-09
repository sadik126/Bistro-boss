import React, { useState } from 'react';
import Useaxiossecure from '../Useaxiossecure/Useaxiossecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashCan, FaUsers } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const Allusers = () => {
    const axiosSecure = Useaxiossecure();
    const [role, setRole] = useState("");
    const {data: users =[] , refetch} = useQuery({
        queryKey:['users'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/users' , {
              headers:{
                authorization: `Bearer ${localStorage.getItem('access-token')}`
              }
            });
            return res.data;
        }
    })

    const handleadmin = (user)=> {
        if (!role) {
            alert("⚠ Please select a role first!");
            return;
          }
        console.log(role)
        axiosSecure.patch(`/users/${user._id}` , {role})
        .then(res=> {
            console.log(res.data)
            refetch()
            if(res.data.modifiedCount > 0){
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
                        .then(res=> {
                         if(res.data.deletedCount > 0){
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

            <div  className="overflow-x-auto h-screen p-5">
  <table className="table w-full ">
    {/* head */}
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
      {/* row 1 */}
      {
        users.map((user , index) => <tr className="bg-base-200" key={user._id}>
            <th>{index + 1}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td className='flex'>
                {
                    user.role === 'Admin' ? <span className='bg-red-700 text-white p-3 rounded-md'>Admin</span> : 
                    user.role === 'Moderator' ? <span className='bg-blue-700 text-white p-3 rounded-md'>Moderator</span> : 
                    <span className='bg-green-700 text-white p-3 rounded-md'>Member</span>
                }
           {user.role === 'Admin' ? 
           <span></span> : user.role === 'Moderator' ?
           <span></span> : 
           <select className="select select-ghost w-full max-w-xs ml-2"  onChange={(e) => setRole(e.target.value)}>
           <option disabled selected>Choose your role</option>
           <option value="Admin">Admin</option>
           <option value="Moderator">Moderator</option>
           <option value="Member">Member</option>
         </select>} 
<td>
{user.role === 'Admin' ? 
           <span></span> : user.role === 'Moderator' ?
           <span></span> : <button onClick={()=>handleadmin(user)}  className="btn bg-red-700 text-white btn-xs">Confirm</button>
          }
  
 </td>
      </td>
            <td><button onClick={()=> handleDelete(user._id)} className="btn bg-red-700 text-white btn-md"><FaTrashCan width={'200px'} /></button></td>
          </tr>)
      }
      
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Allusers;