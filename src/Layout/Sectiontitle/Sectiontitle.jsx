import React from "react";

const Sectiontitle = ({ title, subtitle, text }) => {
  return (
    <div className="my-8">
      <p className="text-yellow-500 text-center">{subtitle}</p>
      <h3
        className={`text-4xl uppercase border-y-4  w-80 mx-auto  py-4 text-center ${text}`}
      >
        {title}
      </h3>
    </div>
  );
};

export default Sectiontitle;
