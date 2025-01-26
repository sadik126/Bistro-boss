import React from "react";

const Foodcard = ({ item }) => {
  const { name, image, price, recipe } = item;
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
          <button className="btn btn-outline text-orange-400 border-0 border-b-4 my-4">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Foodcard;
