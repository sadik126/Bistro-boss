import React, { useContext } from "react";
import { AuthContext } from "../Authprovider/Authprovider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const Foodcard = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handlecart = (food) => {
    if (user && user.email) {
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };
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
            onClick={() => handlecart(item)}
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
