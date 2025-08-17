import React from "react";
import FeedbackForm from "../components/FeedbackForm";
import Styles from "./FeedbackPage.module.css";
import FeedbackFilter from "../components/FeedbackFilter";
import FeedbackEntries from "../components/FeedbackEntries";

const FeedbackPage = () => {
  return (
    <div className={`${Styles.parent}`}>
      <div className={Styles.div1}>
        <FeedbackForm />
      </div>
      <div className={Styles.div2}>
        <FeedbackFilter />
        <FeedbackEntries />
      </div>
    </div>
  );
};

export default FeedbackPage;
