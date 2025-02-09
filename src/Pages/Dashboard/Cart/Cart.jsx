import React from 'react';
import Usecart from '../../Usecart/Usecart';
import { FaTrashCan } from 'react-icons/fa6';
import Loading from '../../Loading/Loading';
import { axiosSecure } from '../../Useaxiossecure/Useaxiossecure';
import Swal from 'sweetalert2';

const Cart = () => {
    const [cart , refetch , isPending , error] = Usecart()
    const totalprice = cart.reduce((total , item)=> total + item.price , 0)
    console.log(cart)

    if(isPending){
        return <Loading></Loading>
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
                axiosSecure.delete(`/carts/${id}`)
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
        <>
          <div className='flex justify-evenly'>
            <h2 className='text-4xl  font-extrabold'>Items: {cart.length>0 ? cart.length :'Sorry you dont have any item right now'}</h2>
            <h2 className='text-4xl font-extrabold'>Total price: $ <span className='text-orange-500'>{totalprice}</span>  </h2>
            <button className=" btn bg-orange-500 border-black hover:bg-slate-50 border-black">Pay</button>
           
        
        </div>

<div className="overflow-x-auto px-10">
<table className="table uppercase">
  {/* head */}
  <thead className='bg-orange-500 text-white'>
    <tr>
      <th></th>
      <th>Image</th>
      <th>Name</th>
      <th>Price</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {/* row 1 */}
    {
        cart.length === 0 ? 'sorry you dont have any product right now' :
              cart.map((item, index) => <tr key={item._id} className="bg-base-200">
                  <th>{index +1}</th>
                  <td> <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={item?.image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div></td>
                  <td>{item?.name}</td>
                  <td>{item?.price}</td>
                  <td> <button onClick={()=> handleDelete(item._id)} className="btn bg-red-700 text-white btn-xs"><FaTrashCan width={'200px'} /></button></td>
                </tr>)
          }
    
   
  </tbody>
</table>
</div>
        </>
      
    );
};

export default Cart;