import React from "react";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Popularmenu from "../Popularmenu/Popularmenu";
import menuImg from "../../assets/menu/banner3.jpg";
import Featured from "../Featured/Featured";
import Testimonial from "../Testimonial/Testimonial";
import { Helmet } from "react-helmet-async";
import Cover from "../Cover/Cover";
import Menucard from "../Menucard/Menucard";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home - Bistro Boss</title>
      </Helmet>
      <Banner></Banner>

      <Category></Category>
      <Cover
        img={menuImg}
        title={"Our Menu"}
        // para="Would you like to try a dish?"
        background="bg-white"
      ></Cover>
      <Popularmenu></Popularmenu>
      <Menucard></Menucard>
      <Featured></Featured>
      <Testimonial></Testimonial>
    </div>
  );
};

export default Home;
