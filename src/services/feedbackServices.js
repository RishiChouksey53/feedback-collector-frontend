/**
 * Add new feedback to feedbackData in localStorage and return the updated array.
 *
 * @param {Object} newFeedback - Feedback object to add
 * @returns {Array} Updated feedback array
 */
export const addFeedback = (newFeedback) => {
  const existingFeedbacks =
    JSON.parse(localStorage.getItem("feedbackData")) || [];

  const updatedFeedbacks = [...existingFeedbacks, newFeedback];

  localStorage.setItem("feedbackData", JSON.stringify(updatedFeedbacks));

  return updatedFeedbacks;
};

/**
 * Get all feedbacks stored in localStorage.
 *
 * @returns {Array} Array of feedback objects from localStorage
 */
export const getFeedbacksFromLocalStorage = () => {
  const existingFeedbacks =
    JSON.parse(localStorage.getItem("feedbackData")) || [];
  return existingFeedbacks;
};

/**
 * Filter feedbacks from localStorage based on keyword and/or date range.
 *
 * @param {Object} filter - Filter object containing optional `keyword`, `from`, and `to` properties.
 * @returns {Array} Filtered array of feedback objects.
 */
export const filterFeedbackData = (filter) => {
  const existingData = JSON.parse(localStorage.getItem("feedbackData")) || [];

  const newKeyword = filter.keyword?.toLowerCase().trim() || "";
  const fromDate = filter.from ? new Date(filter.from) : null;
  const toDate = filter.to ? new Date(filter.to) : null;

  const filtered = existingData.filter((feedback) => {
    const feedbackDate = new Date(feedback.date);

    // Keyword matching
    const matchKeyword =
      !newKeyword ||
      String(feedback.name || "")
        .toLowerCase()
        .includes(newKeyword) ||
      String(feedback.email || "")
        .toLowerCase()
        .includes(newKeyword) ||
      String(feedback.message || "")
        .toLowerCase()
        .includes(newKeyword);

    // Date matching
    const matchDate =
      (fromDate &&
        toDate &&
        fromDate <= feedbackDate &&
        feedbackDate <= toDate) || // both dates
      (fromDate && !toDate && feedbackDate >= fromDate) || // from only
      (!fromDate && toDate && feedbackDate <= toDate) || // to only
      (!fromDate && !toDate); // no dates

    return matchKeyword && matchDate;
  });

  return filtered;
};

/**
 * Delete a feedback from localStorage by its ID and return the updated array.
 *
 * @param {string} id - The ID of the feedback to delete.
 * @returns {Array} Updated array of feedbacks after deletion.
 */
export const deleteFeedback = (id) => {
  const existingData = getFeedbacksFromLocalStorage();
  const filtered = existingData.filter((feedback) => feedback.id !== id);
  localStorage.setItem("feedbackData", JSON.stringify(filtered));
  return filtered;
};
