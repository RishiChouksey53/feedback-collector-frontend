import React from "react";
import Styles from "./NotFound.module.css";

const NotFound = ({ fontAwesomIcon, text }) => {
  return (
    <div className={Styles.notFound}>
      {fontAwesomIcon}
      <h3>{text}</h3>
    </div>
  );
};

export default NotFound;
