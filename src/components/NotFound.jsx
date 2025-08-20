import React from "react";
import Styles from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";

const NotFound = ({ fontAwesomIcon, text }) => {
  const navigate = useNavigate();
  return (
    <div className={Styles.notFound}>
      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
