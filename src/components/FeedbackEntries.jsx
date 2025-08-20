// Branch: feature/add-comment

import { useContext, useEffect, useState } from "react";
import Styles from "./FeedbackEntries.module.css";
import ConfirmDelete from "./ConfirmDelete";
import { deleteFeedback, getFeedback } from "../services/feedbackServices";
import { MyContext } from "../MyContext";

/**
 * FeedbackEntries Component
 * Displays feedback list and allows delete option
 */
const FeedbackEntries = () => {
  // get global values from context
  const { feedbackEntries, setFeedbackEntries, filterData, setCount } =
    useContext(MyContext);

  // store feedback selected for delete
  const [selectFeedback, setSelectFeedback] = useState(null);

  // track confirm delete modal open/close
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Close the delete modal
   * Reset selected feedback
   */
  function onCloseHandler() {
    setIsOpen(false);
    setSelectFeedback(null);
  }

  /**
   * Fetch feedback list from backend
   * Update context state
   */
  const fetchData = async () => {
    const response = await getFeedback();
    setFeedbackEntries(response.feedback || []);
  };

  // load feedback data when no filter is applied
  useEffect(() => {
    if (!filterData) {
      fetchData();
    }
  }, [feedbackEntries, filterData]);

  /**
   * Delete the selected feedback
   * Refresh the list after deletion
   */
  async function onDeleteHandler() {
    try {
      await deleteFeedback(selectFeedback._id);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {/* container for feedback list */}
      <div className={`container ${Styles.feedbackListContainer}`}>
        {/* header section */}
        <div className={Styles.header}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          <div>
            <h2>
              Feedback Entries{" "}
              <span className={Styles.entriesCount}>
                (entries {feedbackEntries?.length})
              </span>
            </h2>
          </div>
        </div>

        {/* feedback cards container */}
        <div className={Styles.cardContainer}>
          {/* if no feedback is found */}
          {feedbackEntries?.length === 0 && (
            <div className={Styles.notFound}>
              <i className="fa-regular fa-message"></i>
              <h3>No feedback found</h3>
            </div>
          )}

          {/* if feedback exists, map and show */}
          {feedbackEntries?.length !== 0 &&
            feedbackEntries?.map((feedback) => (
              <div key={feedback._id} className={Styles.card}>
                {/* card header with info and delete */}
                <div className={Styles.cardHeading}>
                  <div className={Styles.cardInfo}>
                    <h4>
                      <i className="fa-regular fa-user"></i>&nbsp;
                      {feedback?.name}
                    </h4>
                    <p>
                      <i className="fa-regular fa-envelope"></i>&nbsp;
                      {feedback?.email}
                    </p>
                  </div>

                  {/* delete button - opens confirm modal */}
                  <div
                    onClick={() => {
                      setSelectFeedback(feedback);
                      setIsOpen(true);
                    }}
                    className={`secondaryButton ${Styles.deleteBtn}`}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </div>
                </div>

                {/* feedback message */}
                <p className={Styles.cardBody}>{feedback?.message}</p>

                {/* feedback created date */}
                <p className={Styles.cardDate}>
                  <i className="fa-regular fa-calendar"></i>
                  {new Date(feedback?.createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* show confirm delete modal only when isOpen is true */}
      {isOpen && (
        <ConfirmDelete
          onCloseHandler={onCloseHandler}
          onDeleteHandler={onDeleteHandler}
          selectFeedback={selectFeedback}
        />
      )}
    </>
  );
};

export default FeedbackEntries;
