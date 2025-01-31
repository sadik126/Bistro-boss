import React from "react";
import { Atom } from "react-loading-indicators";

const Loading = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh", // Full height to center vertically
      width: "100%", // Full width to center horizontally
    }}>
      <Atom color="orange" size="large" text="" textColor="" />
    </div>
  );
};

export default Loading;
