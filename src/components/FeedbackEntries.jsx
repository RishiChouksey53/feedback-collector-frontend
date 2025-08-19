import { useEffect, useState } from "react";
import Styles from "./FeedbackEntries.module.css";
import ConfirmDelete from "./ConfirmDelete";
import { deleteFeedback } from "../services/feedbackServices";
import NotFound from "./NotFound";
import { toast } from "react-toastify";

const FeedbackEntries = ({ feedbackEntries, setFeedbackEntries, setCount }) => {
  // State for tracking feedback to delete
  const [selectFeedback, setSelectFeedback] = useState(null);

  // State for showing/hiding the confirm delete modal
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Closes the delete confirm modal
   * Resets the selected feedback
   */
  function onCloseHandler() {
    setIsOpen(false);
    setSelectFeedback(null);
  }

  //Todo
  function onDeleteHandler() {
    setFeedbackEntries(deleteFeedback(selectFeedback.id));
    setCount((prev) => prev - 1);
    toast.success("Feedback deleted successfully!");
  }

  return (
    <>
      <div className={`container ${Styles.feedbackListContainer}`}>
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
        <div className={Styles.cardContainer}>
          {feedbackEntries?.length === 0 && (
            <NotFound
              text="No feedback found"
              fontAwesomIcon={<i className="fa-regular fa-message"></i>}
            />
          )}
          {feedbackEntries &&
            feedbackEntries?.map((feedback) => (
              <div key={feedback.id} className={Styles.card}>
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

                  <div
                    onClick={() => {
                      setSelectFeedback(feedback); // store the feedback
                      setIsOpen(true); // open the confirm delete modal
                    }}
                    className={`secondaryButton ${Styles.deleteBtn}`}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </div>
                </div>
                <p className={Styles.cardBody}>{feedback?.message}</p>
                <p className={Styles.cardDate}>
                  <i className="fa-regular fa-calendar"></i>
                  {new Date(feedback?.date).toLocaleDateString("en-GB")}
                </p>
              </div>
            ))}
        </div>
      </div>
      {/* Render ConfirmDelete modal only when isOpen is true */}
      {isOpen && (
        <ConfirmDelete
          onCloseHandler={onCloseHandler} // closes the modal
          onDeleteHandler={onDeleteHandler} // deletes feedback
          selectFeedback={selectFeedback} // the selected feedback item
        />
      )}
    </>
  );
};

export default FeedbackEntries;
