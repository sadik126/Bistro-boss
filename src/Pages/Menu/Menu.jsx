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
      <Cover img={menuImg} title={"Our Menu"}></Cover>
      <Sectiontitle
        title="TODAY'S OFFER"
        subtitle={"---Don't miss---"}
      ></Sectiontitle>
      {/* {console.log(offered)} */}
      <MenuCategory items={offered}></MenuCategory>

      <div className=" flex justify-center items-center">
        <button className="btn btn-outline text-black border-0 border-b-4 my-4">
          ORDER YOUR FAVOURITE FOOD
        </button>
      </div>

      <MenuCategory
        items={dessert}
        title={"dessert"}
        img={dessertimg}
      ></MenuCategory>
      <div className=" flex justify-center items-center">
        <button className="btn btn-outline text-black border-0 border-b-4 my-4">
          ORDER YOUR FAVOURITE FOOD
        </button>
      </div>

      <MenuCategory items={pizza} title={"pizza"} img={pizzaimg}></MenuCategory>
      <div className=" flex justify-center items-center">
        <button className="btn btn-outline text-black border-0 border-b-4 my-4">
          ORDER YOUR FAVOURITE FOOD
        </button>
      </div>
      <MenuCategory items={salad} title={"salad"} img={saladimg}></MenuCategory>
      <div className=" flex justify-center items-center">
        <button className="btn btn-outline text-black border-0 border-b-4 my-4">
          ORDER YOUR FAVOURITE FOOD
        </button>
      </div>
      <MenuCategory items={soup} title={"soup"} img={soupimg}></MenuCategory>
    </div>
  );
};

export default Menu;
