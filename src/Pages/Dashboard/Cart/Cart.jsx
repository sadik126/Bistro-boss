import React from 'react';
import Usecart from '../../Usecart/Usecart';

const Cart = () => {
    const [cart] = Usecart()
    const totalprice = cart.reduce((total , item)=> total + item.price , 0)
    return (
        <>
          <div className='flex justify-evenly'>
            <h2 className='text-4xl  font-extrabold'>Items: {cart.length>0 ? cart.length :'Sorry you dont have any item right now'}</h2>
            <h2 className='text-4xl'>Total price:${totalprice}</h2>
            <button className="btn-primary btn">Pay</button>
           
        
        </div>

<div className="overflow-x-auto px-10">
<table className="table">
  {/* head */}
  <thead>
    <tr>
      <th></th>
      <th>Image</th>
      <th>Name</th>
      <th>Favorite Color</th>
    </tr>
  </thead>
  <tbody>
    {/* row 1 */}
    {
              cart.map(item => <tr key={item._id} className="bg-base-200">
                  <th>1</th>
                  <td> <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={item.image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div></td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>Blue</td>
                </tr>)
          }
    
   
  </tbody>
</table>
</div>
        </>
      
    );
};

export default Cart;