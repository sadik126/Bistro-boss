import React, { useEffect, useState } from "react";
import Sectiontitle from "../../Layout/Sectiontitle/Sectiontitle";
import Menuitem from "../../Layout/Menuitem/Menuitem";
import useMenu from "../useMenu/useMenu";

const Popularmenu = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");
  // const [menuData, setMenuData] = useState([]);
  // useEffect(() => {
  //   fetch("Menu.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const popularItems = data.filter((item) => item.category == "popular");
  //       setMenuData(popularItems);
  //     });
  // }, []);
  return (
    <section className="my-12 md:w-3/4 mx-auto px-6">
      <Sectiontitle
        subtitle={"---Check it out---"}
        title={"FROM OUR MENU"}
      ></Sectiontitle>
      <div className="grid md:grid-cols-2 gap-12">
        {popular.map((item) => (
          <Menuitem key={item._id} item={item}></Menuitem>
        ))}
      </div>
    </section>
  );
};

export default Popularmenu;
