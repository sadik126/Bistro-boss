import React from 'react';
import Usecart from '../../Usecart/Usecart';
import { FaTrashCan } from 'react-icons/fa6';
import Loading from '../../Loading/Loading';
import { axiosSecure } from '../../Useaxiossecure/Useaxiossecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, refetch, isPending, error] = Usecart()
  const totalprice = cart.reduce((total, item) => total + item.price, 0)
  console.log(cart)

  if (isPending) {
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
    <>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-10 p-4">
        <h2 className="text-xl md:text-3xl font-extrabold text-center">
          Items: {cart.length > 0 ? cart.length : "Sorry, you don't have any item right now"}
        </h2>

        <h2 className="text-xl md:text-3xl font-extrabold text-center">
          Total price: $ <span className="text-orange-500">{totalprice}</span>
        </h2>

        {/* Payment Button */}
        <Link to="/dashboard/payment">
          <button
            disabled={cart.length === 0}
            className={`btn px-6 py-2 text-white border-black transition-all ${cart.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
              }`}
          >
            Pay
          </button>
        </Link>
      </div>

      {/* Table Responsive Container */}
      <div className="overflow-x-auto px-4 sm:px-10">
        <table className="table w-full text-sm md:text-base uppercase">
          {/* Table Head */}
          <thead className="bg-orange-500 text-white">
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {cart.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-lg py-4">
                  Sorry, you don't have any product right now.
                </td>
              </tr>
            ) : (
              cart.map((item, index) => (
                <tr key={item._id} className="bg-base-200">
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item?.image} alt="Product" />
                      </div>
                    </div>
                  </td>
                  <td>{item?.name}</td>
                  <td>${item?.price}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn bg-red-700 text-white btn-xs"
                    >
                      <FaTrashCan width={"200px"} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>

  );
};

export default Cart;