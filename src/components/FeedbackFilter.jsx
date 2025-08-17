import React, { useState } from "react";
import Styles from "./FeedbackFilter.module.css";

const FeedbackFilter = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [keyword, setKeyword] = useState("");
  
  return (
    <div className={`container ${Styles.filterContainer}`}>
      <div className={Styles.header}>
        <div>
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
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>

          <h2>Filter Feedback</h2>
        </div>
        <p>Search and filter feedback</p>
      </div>
      <div className={Styles.filterChoice}>
        <div>
          <label htmlFor="keyword">Search&nbsp;Keyword</label>
          <input
            id="keyword"
            placeholder="Search in name, email and messaage..."
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            type="text"
          />
        </div>

        <div className={Styles.dateContainer}>
          {" "}
          <div>
            <label htmlFor="fromDate">From Date</label>
            <input
              id="fromDate"
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="toDate">To Date</label>
            <input
              id="toDate"
              type="date"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackFilter;
