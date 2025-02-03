import React, { useContext, useState } from "react";
import { AuthContext } from "../Authprovider/Authprovider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";
import Useaxiossecure from "../Useaxiossecure/Useaxiossecure";
import Loading from "../Loading/Loading";
import Usecart from "../Usecart/Usecart";

const Foodcard = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const { user } = useContext(AuthContext);
  const [,refetch] = Usecart()
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = Useaxiossecure();
  const handlecart = (food) => {
    setLoading(true)
    if (user && user.email) {
      const cartItem = {
        menuId: _id,
        email: user.email,
        name: food.name,
        image: food.image,
        price: food.price,
      };
      console.log(cartItem);

      axiosSecure.post("/carts", cartItem).then((res) => {
        console.log(res.data);
        {res.data && setLoading(false)}
        
        if(res.data.insertedId){
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-orange-300  shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={`${image}`}
                      alt=""
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                     {name}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Added in your cart
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ))
        }
        refetch()
      })
      .catch((error) => {
        console.error("Error:", error.response?.data || error.message);
        Swal.fire("Error", "Failed to add item to cart.", "error");
      })

      // fetch("http://localhost:7065/carts", {
      //   method: "POST",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify(cartItem),
      // })
      //   .then((res) => res.json())
      //   .then((data) => console.log(data));
    } else {
      Swal.fire({
        title: "You are not logged in🍔",
        text: "Please login to add this 🍟 cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "orange",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  if(loading) {
    return <Loading></Loading>
  }
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={image} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <div className="badge badge-neutral absolute right-16 top-16">
          ${price}
        </div>
        <p>{recipe}</p>
        <div className="card-actions">
          <button
            onClick={handlecart}
            className="btn btn-outline text-orange-400 border-0 border-b-4 my-4"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Foodcard;
