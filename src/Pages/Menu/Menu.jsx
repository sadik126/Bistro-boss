import React from "react";
import { Helmet } from "react-helmet-async";
import menuImg from "../../assets/menu/banner3.jpg";
import Cover from "../Cover/Cover";
import useMenu from "../useMenu/useMenu";
import MenuCategory from "./MenuCategory";
import Sectiontitle from "../../Layout/Sectiontitle/Sectiontitle";
import dessertimg from "../../assets/menu/dessert-bg.jpeg";
import pizzaimg from "../../assets/menu/pizza-bg.jpg";
import saladimg from "../../assets/menu/salad-bg.jpg";
import soupimg from "../../assets/menu/soup-bg.jpg";
import { Link } from "react-router-dom";

const Menu = () => {
  const [menu] = useMenu();
  // console.log(menu);
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const offered = menu.filter((item) => item.category === "offered");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  return (
    <div>
      <Helmet>
        <title>Menu</title>
      </Helmet>
      <Cover
        img={menuImg}
        title={"Our Menu"}
        para="Would you like to try a dish?"
      ></Cover>
      <Sectiontitle
        title="TODAY'S OFFER"
        subtitle={"---Don't miss---"}
      ></Sectiontitle>
      {/* {console.log(offered)} */}
      <MenuCategory items={offered}></MenuCategory>

      <MenuCategory
        items={dessert}
        title={"dessert"}
        img={dessertimg}
      ></MenuCategory>

      <MenuCategory items={pizza} title={"pizza"} img={pizzaimg}></MenuCategory>

      <MenuCategory items={salad} title={"salad"} img={saladimg}></MenuCategory>

      <MenuCategory items={soup} title={"soup"} img={soupimg}></MenuCategory>
    </div>
  );
};

export default Menu;
