import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import AdminPanel from "./pages/AdminPanel";
import { MyContext } from "./MyContext";
import DashboardPage from "./pages/DashboardPage";

const App = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [count, setCount] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [user, setUser] = useState(null);
  const providerValue = {
    user,
    setUser,
    count,
    setCount,
    feedback,
    setFeedback,
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <MyContext.Provider value={providerValue}>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/login" element={<Auth isLoginPage={isLoginPage} />} />
        <Route path="/register" element={<Auth isLoginPage={!isLoginPage} />} />
      </Routes>
    </MyContext.Provider>
  );
};

export default App;
