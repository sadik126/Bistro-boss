import React from "react";
import Foodcard from "../Foodcard/Foodcard";

const Ordertab = ({ items }) => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {items.map((item) => (
        <Foodcard key={item._id} item={item}></Foodcard>
      ))}
    </div>
  );
};

export default Ordertab;
