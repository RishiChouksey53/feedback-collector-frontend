import React, { useContext, useState } from "react";
import Styles from "./FeedbackFilter.module.css";
import {
  filterFeedbackData,
  getFeedback,
} from "../services/feedbackServices";
import { MyContext } from "../MyContext";

const FeedbackFilter = () => {
  const { setFeedbackEntries, setFilterData } = useContext(MyContext);

  // Filter state (keyword + date range)
  const [filter, setFilter] = useState({ from: "", to: "", keyword: "" });

  // Reset filter to default values
  function resetFilterHandler() {
    setFilter({ from: "", to: "", keyword: "" });
    setFilterData(false);
  }

  // Update filter state on input change
  function onChangeHandler(e) {
    const { value, name } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  }

  const filterFeedbackHandler = async () => {
    if (filter.from === "" && filter.to === "" && filter.keyword === "") {
      return;
    }
    try {
      const response = await filterFeedbackData(filter);
      setFeedbackEntries(response);
      setFilterData(true);
    } catch (err) {
      console.error(err);
    }
  };

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
        {/* Keyword search */}
        <div>
          <label htmlFor="keyword">Search&nbsp;Keyword</label>
          <input
            id="keyword"
            placeholder="Search in name, email and message..."
            value={filter.keyword}
            name="keyword"
            onChange={onChangeHandler}
            type="text"
          />
        </div>

        {/* Date range filter */}
        <div className={Styles.dateContainer}>
          <div>
            <label htmlFor="fromDate">From Date</label>
            <input
              id="fromDate"
              type="date"
              value={filter.from}
              name="from"
              onChange={onChangeHandler}
              max={filter.to || undefined}
            />
          </div>
          <div>
            <label htmlFor="toDate">To Date</label>
            <input
              id="toDate"
              type="date"
              value={filter.to}
              name="to"
              onChange={onChangeHandler}
              min={filter.from || undefined}
            />
          </div>
        </div>
      </div>

      <div className={Styles.filterBottom}>
        {/* Reset filter */}
        <button
          onClick={() => {
            resetFilterHandler();
            setFeedbackEntries(getFeedbacksFromLocalStorage());
          }}
          className="secondaryButton"
        >
          Reset
        </button>

        {/* Apply filter */}
        <button onClick={filterFeedbackHandler}>Apply</button>
      </div>
    </div>
  );
};

export default FeedbackFilter;
