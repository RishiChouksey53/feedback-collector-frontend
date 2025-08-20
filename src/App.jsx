import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import AdminPanel from "./pages/AdminPanel";
import { MyContext } from "./MyContext";
import DashboardPage from "./pages/DashboardPage";
import { ToastContainer } from "react-toastify";
import NotFound from "./components/NotFound";
import { getProfile } from "./services/authServices";
import Loader from "./components/Loader";
import Profile from "./components/Profile";

const App = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [count, setCount] = useState(0);
  const [feedbackEntries, setFeedbackEntries] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filterData, setFilterData] = useState(false);
  const providerValue = {
    user,
    setUser,
    count,
    setCount,
    feedbackEntries,
    setFeedbackEntries,
    filterData,
    setFilterData,
  };

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await getProfile();
        setUser(response?.profile);
        if (user?.role === "admin") {
          navigate("/admin");
        } else if (user?.role === "user") {
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    token && fetchProfile();
  }, [token]);

  return (
    <MyContext.Provider value={providerValue}>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/profile" element={<Profile />} />
            {user?.role === "admin" && (
              <Route path="/admin" element={<AdminPanel />} />
            )}
            <Route path="/login" element={<Auth isLoginPage={isLoginPage} />} />
            <Route
              path="/register"
              element={<Auth isLoginPage={!isLoginPage} />}
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
          />
        </>
      )}
    </MyContext.Provider>
  );
};

export default App;
