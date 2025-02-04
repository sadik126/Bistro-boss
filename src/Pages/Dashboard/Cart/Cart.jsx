import React from 'react';
import Usecart from '../../Usecart/Usecart';
import { FaTrashCan } from 'react-icons/fa6';
import Loading from '../../Loading/Loading';

const Cart = () => {
    const [cart , isPending] = Usecart()
    const totalprice = cart.reduce((total , item)=> total + item.price , 0)

    if(isPending){
        return <Loading></Loading>
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
              cart.map((item, index) => <tr key={item._id} className="bg-base-200">
                  <th>{index +1}</th>
                  <td> <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={item.image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div></td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td> <button className="btn bg-red-700 text-white btn-xs"><FaTrashCan width={'200px'} /></button></td>
                </tr>)
          }
    
   
  </tbody>
</table>
</div>
        </>
      
    );
};

export default Cart;