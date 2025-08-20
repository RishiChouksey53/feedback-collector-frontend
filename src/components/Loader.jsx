import React from "react";
import { HashLoader } from "react-spinners";

/**
 * Loader component
 * Shows a centered loading spinner when something is loading
 */
const Loader = () => {
  return (
    // Container div to center the loader in the screen
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        inset: "0",
      }}
    >
      {/* HashLoader is the spinner animation */}
      <HashLoader size={60} color={"#3b82f6"} />
    </div>
  );
};

export default Loader;
