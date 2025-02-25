import React from "react";

const Menuitem = ({ item }) => {
  const { image, name, price, recipe } = item;
  return (
    <div className="flex space-x-4">
      <img
        style={{ borderRadius: "0px 200px 200px 200px" }}
        className="w-[120px] h-[100px]"
        src={image}
        alt=""
      />
      <div>
        <h3 className="uppercase">{name}---------</h3>
        <p>{recipe?.substring(0, 50)}...</p>
      </div>
      <p className="text-yellow-500">${price}</p>
    </div>
  );
};

export default Menuitem;
