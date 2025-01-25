import React from "react";
import Sectiontitle from "../../Layout/Sectiontitle/Sectiontitle";
import featuredimg from "../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
  return (
    <div className="featured-item  relative pt-8 my-20 bg-fixed bg-cover bg-center">
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="relative z-10">
        <Sectiontitle
          subtitle={"---Check it out---"}
          title={"FROM OUR MENU"}
          text={"text-white"}
        ></Sectiontitle>
        <div className="md:flex justify-between items-center pb-20 pt-12 lg:px-36 px-6">
          <div>
            <img src={featuredimg} alt="" />
          </div>
          <div className="md:ml-10 text-white">
            <p>March 20, 2023</p>
            <p className="uppercase">WHERE CAN I GET SOME?</p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              eius corporis hic eveniet molestiae expedita quibusdam, asperiores
              temporibus veniam laudantium ullam nulla officiis. Ex tempora
              magnam molestiae, perspiciatis voluptatem quasi repellendus
              dolorum officia! Quae sint accusantium, pariatur nihil totam
              accusamus possimus, velit animi, laudantium voluptas beatae
              officia quia laborum obcaecati.
            </p>
            <button className="btn btn-outline text-white border-0 border-b-4 mt-4">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
