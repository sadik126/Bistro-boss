import React from "react";
import Menuitem from "../../Layout/Menuitem/Menuitem";
import Cover from "../Cover/Cover";

const MenuCategory = ({ items, title, img }) => {
  return (
    <div className="pt-16 ">
      {title && <Cover img={img} title={title}></Cover>}
      <div className="grid md:grid-cols-2 gap-12  my-12 md:w-3/4 mx-auto px-6">
        {items.map((item) => (
          <Menuitem key={item._id} item={item}></Menuitem>
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
