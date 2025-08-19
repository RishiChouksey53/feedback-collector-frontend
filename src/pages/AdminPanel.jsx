import React from "react";
import FeedbackFilter from "../components/FeedbackFilter";
import FeedbackEntries from "../components/FeedbackEntries";
const AdminPanel = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <h2 style={{color:"#808080", fontWeight:"400"}}>Manage User Feedbacks</h2>
      <FeedbackFilter />
      <FeedbackEntries />
    </div>
  );
};

export default AdminPanel;
