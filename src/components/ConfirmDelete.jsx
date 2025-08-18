import React, { useEffect, useState } from "react";
import Styles from "./ConfirmDelete.module.css";

const ConfirmDelete = ({ onCloseHandler, onDeleteHandler, selectFeedback }) => {
  useEffect(() => {
    if (selectFeedback) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [selectFeedback]);

  return (
    <>
      <div
        onClick={() => {
          onCloseHandler();
        }}
        className={Styles.deleteContainer}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={Styles.mainContainer}
        >
          <div className={Styles.header}>
            <div className={Styles.alertIcon}>
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>

            <h2>Delete Feedback</h2>
          </div>
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
          <div className={Styles.btnContainer}>
            <button
              onClick={() => {
                onDeleteHandler();
                onCloseHandler();
              }}
              className={Styles.deleteBtn}
            >
              Delete
            </button>
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
