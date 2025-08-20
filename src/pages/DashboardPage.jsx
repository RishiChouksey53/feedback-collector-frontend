import React, { useContext, useState } from "react";
import FeedbackForm from "../components/FeedbackForm";
import { MyContext } from "../MyContext";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/authServices";

const DashboardPage = () => {
  const navigate = useNavigate(); // hook for navigation
  const { setUser } = useContext(MyContext); // access context to set user

  return (
    <div style={{ padding: "1rem" }}>
      <FeedbackForm /> {/* feedback form component */}
    </div>
  );
};

export default DashboardPage; // export component
