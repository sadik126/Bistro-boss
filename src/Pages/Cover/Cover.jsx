import React from "react";
import { Parallax, Background } from "react-parallax";

const Cover = ({ img, title, para }) => {
  return (
    <div>
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={img}
        bgImageAlt="the dog"
        strength={-200}
      >
        <div
          className="hero h-[500px] my-8 "
          style={{
            backgroundImage: `url("${img}")`,
          }}
        >
          <div className="hero-overlay md:w-[40rem] w-[20rem] h-[16rem] bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
              <p className="mb-5">
                {para
                  ? para
                  : "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
              </p>
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default Cover;
