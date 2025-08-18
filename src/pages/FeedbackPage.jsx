import FeedbackForm from "../components/FeedbackForm";
import Styles from "./FeedbackPage.module.css";
import FeedbackFilter from "../components/FeedbackFilter";
import FeedbackEntries from "../components/FeedbackEntries";
import { useEffect, useState } from "react";
import { getFeedbacksFromLocalStorage } from "../services/feedbackServices";

const FeedbackPage = ({ setCount }) => {
  const [feedbackEntries, setFeedbackEntries] = useState([]); // State to store all feedback

  /**
   * Getting all feedbackData on first render
   * Set coutn to display total feedback
   */
  useEffect(() => {
    const data = getFeedbacksFromLocalStorage(); // get all feedback from localStorage
    setFeedbackEntries(data); // store feedbacke in state variable
    setCount(data.length); // count the total no. of feedback
  }, []);

  return (
    <div className={`${Styles.parent}`}>
      <div className={Styles.div1}>
        <FeedbackForm
          setFeedbackEntries={setFeedbackEntries} // to add new feedback
          setCount={setCount} // to track count on add new feedback
        />
      </div>
      <div className={Styles.div2}>
        <FeedbackFilter
          setFeedbackEntries={setFeedbackEntries} // to set filtered data
        />

        <FeedbackEntries
          setCount={setCount} // to track count on delete feedback
          feedbackEntries={feedbackEntries} // to show all feedback
          setFeedbackEntries={setFeedbackEntries} // to set data after delete feedback
        />
      </div>
    </div>
  );
};

export default FeedbackPage;
