import React, { useEffect, useState } from "react";
import Styles from "./ConfirmDelete.module.css";

/**
 * ConfirmDelete Component
 * Shows a popup to confirm deleting a feedback
 * @param {Function} onCloseHandler - closes the popup
 * @param {Function} onDeleteHandler - deletes the feedback
 * @param {Object} selectFeedback - feedback data selected for deletion
 */
const ConfirmDelete = ({ onCloseHandler, onDeleteHandler, selectFeedback }) => {
  useEffect(() => {
    // stop page scroll when popup is open
    if (selectFeedback) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // cleanup: always remove no-scroll class
    return () => document.body.classList.remove("no-scroll");
  }, [selectFeedback]);

  return (
    <>
      {/* background overlay, closes popup on click */}
      <div
        onClick={() => {
          onCloseHandler();
        }}
        className={Styles.deleteContainer}
      >
        {/* stop click from closing popup when clicking inside */}
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={Styles.mainContainer}
        >
          {/* header with warning icon */}
          <div className={Styles.header}>
            <div className={Styles.alertIcon}>
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h2>Delete Feedback</h2>
          </div>

          {/* message body */}
          <div className={Styles.cardBody}>
            <p>
              Are you sure you want to delete the feedback from{" "}
              <span className={Styles.feedbackName}>
                {selectFeedback?.name}
              </span>
              ?
            </p>
            <p>This action cannot be undone.</p>
          </div>

          {/* action buttons */}
          <div className={Styles.btnContainer}>
            {/* delete and close popup */}
            <button
              onClick={() => {
                onDeleteHandler();
                onCloseHandler();
              }}
              className={Styles.deleteBtn}
            >
              Delete
            </button>

            {/* cancel button just closes popup */}
            <button
              onClick={() => {
                onCloseHandler();
              }}
              className="secondaryButton"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDelete;
