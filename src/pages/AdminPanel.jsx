import React, { useState } from "react";
import FeedbackFilter from "../components/FeedbackFilter";
import FeedbackEntries from "../components/FeedbackEntries";

// Admin panel page
const AdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
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
      {/* Page heading */}
      <h3 style={{ color: "#808080", fontWeight: "400" }}>
        Manage User Feedbacks
      </h3>

      {/* Filter section */}
      <FeedbackFilter isLoading={isLoading} setIsLoading={setIsLoading} />

      {/* Feedback list */}
      <FeedbackEntries isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
  );
};

export default AdminPanel;
