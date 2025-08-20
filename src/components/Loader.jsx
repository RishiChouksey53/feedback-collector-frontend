import React from "react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        inset: "0",
      }}
    >
      <HashLoader size={60} color={"#3b82f6"}/>
    </div>
  );
};

export default Loader;
