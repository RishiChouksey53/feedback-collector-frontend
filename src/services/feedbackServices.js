import { toast } from "react-toastify";
import { clientServer } from "../config";

// Add new feedback
export const addFeedback = async (newFeedback) => {
  const { name, email, message } = newFeedback;
  try {
    const response = await clientServer.post("/feedback", {
      name,
      email,
      message,
    });
    toast.success(response.data.message); // show success message
    return response.data;
  } catch (error) {
    return error.response?.data || error.message; // return error
  }
};

// Get all feedback
export const getFeedback = async () => {
  try {
    const response = await clientServer.get("/feedback", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
};

// Filter feedback by keyword or date
export const filterFeedbackData = async (filter) => {
  const response = await getFeedback();
  const existingData = response?.feedback || [];

  const newKeyword = filter.keyword?.toLowerCase().trim() || "";
  const fromDate = filter.from ? new Date(filter.from) : null;
  const toDate = filter.to ? new Date(filter.to) : null;

  if (toDate) toDate.setHours(23, 59, 59, 999); // set to end of the day
  if (fromDate) fromDate.setHours(0, 0, 0, 0); // set to start of the day

  const filtered = existingData?.filter((feedback) => {
    const feedbackDate = new Date(feedback.createdAt);

    // keyword match
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

    // date match
    const matchDate =
      (fromDate &&
        toDate &&
        fromDate <= feedbackDate &&
        feedbackDate <= toDate) || // both
      (fromDate && !toDate && feedbackDate >= fromDate) || // from only
      (!fromDate && toDate && feedbackDate <= toDate) || // to only
      (!fromDate && !toDate); // no date filter

    return matchKeyword && matchDate;
  });
  return filtered;
};

// Delete feedback by id
export const deleteFeedback = async (id) => {
  try {
    const response = await clientServer.delete(`/feedback/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success(response.data.message); // show success message
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
};
