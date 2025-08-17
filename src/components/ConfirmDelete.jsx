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
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>

            <h2>Delete Feedback</h2>
          </div>
          <div className={Styles.cardBody}>
            <p>
              Are you sure you want to delete the feedback from{" "}
              <span className={Styles.feedbackName}>{selectFeedback.name}</span>
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
              Delete Feedback
            </button>
            <button
              onClick={() => {
                onCloseHandler();
              }}
              className={Styles.cancelBtn}
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
