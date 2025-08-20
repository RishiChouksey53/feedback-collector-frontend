import { toast } from "react-toastify";
import { clientServer } from "../config";

export const addFeedback = async (newFeedback) => {
  const { name, email, message } = newFeedback;
  try {
    const response = await clientServer.post("/feedback", {
      name,
      email,
      message,
    });
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
};

export const getFeedback = async () => {
  try {
    const response = await clientServer.get("/feedback");
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
};

export const filterFeedbackData = async (filter) => {
  const response = await getFeedback();
  const existingData = response?.feedback || [];
  const newKeyword = filter.keyword?.toLowerCase().trim() || "";
  const fromDate = filter.from ? new Date(filter.from) : null;
  const toDate = filter.to ? new Date(filter.to) : null;

  const filtered = existingData?.filter((feedback) => {
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

export const deleteFeedback = async (id) => {
  try {
    const response = await clientServer.delete(`/feedback/${id}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
};
