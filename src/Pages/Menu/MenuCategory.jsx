import React from "react";
import Menuitem from "../../Layout/Menuitem/Menuitem";
import Cover from "../Cover/Cover";
import { Link } from "react-router-dom";

const MenuCategory = ({ items, title, img }) => {
  return (
    <div className="pt-16 ">
      {title && <Cover img={img} title={title}></Cover>}
      <div className="grid md:grid-cols-2 gap-12  my-12 md:w-3/4 mx-auto px-6">
        {items.map((item) => (
          <Menuitem key={item._id} item={item}></Menuitem>
        ))}
      </div>
      <div className=" flex justify-center items-center">
        <Link
          to={`/order/${title ? title : "salad"}`}
          className="btn btn-outline text-black border-0 border-b-4 my-4"
        >
          ORDER YOUR FAVOURITE FOOD
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
