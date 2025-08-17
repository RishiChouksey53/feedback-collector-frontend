import { useState } from "react";
import Styles from "./FeedbackEntries.module.css";
import ConfirmDelete from "./ConfirmDelete";

const FeedbackEntries = () => {
  // State for tracking feedback to delete
  const [selectFeedback, setSelectFeedback] = useState(null);

  // State for showing/hiding the confirm delete modal
  const [isOpen, setIsOpen] = useState(false);

  //State for storing all feedback entries
  const [filterEntries, setFilterEntries] = useState([
    {
      name: "Rishi Chouksey",
      email: "rishi@gmail.com",
      message: "nice work",
      date: "29/07/2023",
      id: "123",
    },
  ]);

  /**
   * Closes the delete confirm modal
   * Resets the selected feedback
   */
  function onCloseHandler() {
    setIsOpen(false);
    setSelectFeedback(null);
  }

  /**
   * Filter the feedback
   */
  function onDeleteHandler() {
    setFilterEntries([]);
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
          <h2>Feedback Entries</h2>
        </div>
        <div className={Styles.cardContainer}>
          {filterEntries.length === 0 && (
            <div className={Styles.notFound}>
              <i className="fa-regular fa-message"></i>
              <h3>No feedback found</h3>
            </div>
          )}
          {filterEntries.map((feedback) => (
            <div key={feedback.id} className={Styles.card}>
              <div className={Styles.cardHeading}>
                <div className={Styles.cardInfo}>
                  <h4>
                    <i className="fa-regular fa-user"></i>&nbsp;{feedback.name}
                  </h4>
                  <p>
                    <i className="fa-regular fa-envelope"></i>&nbsp;
                    {feedback.email}
                  </p>
                </div>
                <div className={Styles.headingRight}>
                  <span>{feedback.date}</span>
                  <svg
                    onClick={() => {
                      setSelectFeedback(feedback); // store the feedback
                      setIsOpen(true); // open the confirm delete modal
                    }}
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </div>
              <p className={Styles.cardBody}>{feedback.message}</p>
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
