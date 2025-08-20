import React from "react";
import Styles from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";

// Component to show when a page is not found (404 error)
const NotFound = ({ fontAwesomIcon, text }) => {
  // useNavigate hook helps to navigate programmatically
  const navigate = useNavigate();

  return (
    <div className={Styles.notFound}>
      {/* Error code */}
      <h1>404</h1>

      {/* Message for the user */}
      <p>Oops! Page not found.</p>

      {/* Button to go back to home page */}
      <button
        onClick={() => {
          navigate("/"); // Redirect to home page when clicked
        }}
      >
        Go Home
      </button>
    </div>
  );
};

// Exporting NotFound component so it can be used in other files
export default NotFound;
