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
        display: "flex",              // Use flexbox layout
        justifyContent: "center",     // Center horizontally
        alignItems: "center",         // Center vertically
        position: "absolute",         // Position relative to the screen
        inset: "0",                   // Stretch to cover full screen
      }}
    >
      {/* HashLoader is the spinner animation */}
      <HashLoader size={60} color={"#3b82f6"} />
    </div>
  );
};

export default Loader;
