import React from "react";
import FeedbackFilter from "../../components/FeedbackFilter";
import FeedbackEntries from "../../components/FeedbackEntries";

const AdminDashboard = () => {
  return (
    <>
      <FeedbackFilter />
      <FeedbackEntries />
    </>
  );
};

export default AdminDashboard;
