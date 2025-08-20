import React, { useContext, useState } from "react";
import FeedbackForm from "../components/FeedbackForm";
import { MyContext } from "../MyContext";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/authServices";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(MyContext);
  return (
    <div style={{ padding: "1rem" }}>
      <FeedbackForm />
    </div>
  );
};

export default DashboardPage;
