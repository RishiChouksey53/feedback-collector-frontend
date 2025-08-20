import React, { useContext, useState } from "react";
import Styles from "./FeedbackFilter.module.css";
import { filterFeedbackData, getFeedback } from "../services/feedbackServices";
import { MyContext } from "../MyContext";

const FeedbackFilter = ({ isLoading, setIsLoading }) => {
  // Access global state and functions from context
  const { setFeedbackEntries, setFilterData } = useContext(MyContext);

  // Local state for filter inputs (keyword, from date, to date)
  const [filter, setFilter] = useState({ from: "", to: "", keyword: "" });

  /**
   * Resets filter values back to default (empty)
   * Also resets filterData state to false (means no filter applied)
   */
  async function resetFilterHandler() {
    setFilter({ from: "", to: "", keyword: "" });
    try {
      setIsLoading(true);
      const data = await getFeedback();
      setFeedbackEntries(data.feedback);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Updates filter state when input fields change
   * @param {Object} e - Input change event
   */
  function onChangeHandler(e) {
    const { value, name } = e.target;
    // Spread previous filter state and update only the changed field
    setFilter((prev) => ({ ...prev, [name]: value }));
  }

  /**
   * Applies filter based on entered data (date range or keyword)
   * Sends filter object to API and updates feedback entries
   */
  const filterFeedbackHandler = async () => {
    // If no filter values are entered, just return
    setIsLoading(true);
    if (filter.from === "" && filter.to === "" && filter.keyword === "") {
      setIsLoading(false);
      return;
    }
    try {
      const response = await filterFeedbackData(filter); // Call API with filter
      setFeedbackEntries(response); // Update entries in context
      setFilterData(true); // Mark that filter is applied
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${Styles.filterContainer}`}>
      {/* Header Section */}
      <div className={Styles.header}>
        <div>
          {/* Filter icon */}
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

      {/* Filter input section */}
      <div className={Styles.filterChoice}>
        {/* Keyword search input */}
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

        {/* Date range filter inputs */}
        <div className={Styles.dateContainer}>
          <div>
            <label htmlFor="fromDate">From Date</label>
            <input
              id="fromDate"
              type="date"
              value={filter.from}
              name="from"
              placeholder="YYYY-MM-DD"
              onChange={onChangeHandler}
              max={filter.to || undefined} // "from" date cannot be later than "to" date
            />
          </div>
          <div>
            <label htmlFor="toDate">To Date</label>
            <input
              id="toDate"
              type="date"
              value={filter.to}
              name="to"
              placeholder="YYYY-MM-DD"
              onChange={onChangeHandler}
              min={filter.from || undefined} // "to" date cannot be earlier than "from" date
            />
          </div>
        </div>
      </div>

      {/* Filter action buttons */}
      <div className={Styles.filterBottom}>
        {/* Reset filter button */}
        <button
          onClick={() => {
            resetFilterHandler();
          }}
          className="secondaryButton"
        >
          Reset
        </button>

        {/* Apply filter button */}
        <button onClick={filterFeedbackHandler}>Apply</button>
      </div>
    </div>
  );
};

export default FeedbackFilter;
