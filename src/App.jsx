import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import AdminPanel from "./pages/AdminPanel";
import { MyContext } from "./MyContext";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./components/NotFound";
import { getProfile } from "./services/authServices";
import Loader from "./components/Loader";
import Profile from "./components/Profile";

const App = () => {
  // App states
  const [isLoginPage, setIsLoginPage] = useState(true); // check if login page
  const [count, setCount] = useState(0); // feedback counter
  const [feedbackEntries, setFeedbackEntries] = useState([]); // store feedback
  const [user, setUser] = useState(null); // store logged-in user
  const [isLoading, setIsLoading] = useState(false); // loader state
  const [filterData, setFilterData] = useState(false); // filter toggle

  // ✅ Context values shared with all components
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
  const token = localStorage.getItem("token"); // get token from localStorage

  // ✅ Fetch profile when app loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true); // show loader
        const response = await getProfile(); // get user profile
        setUser(response?.profile);

        // redirect user based on role
        if (user?.role === "admin") {
          navigate("/admin");
        } else if (user?.role === "user") {
          navigate("/");
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token"); // remove invalid token
        navigate("/login"); // go to login page
      } finally {
        setIsLoading(false); // stop loader
      }
    };
    token && fetchProfile(); // run only if token exists
  }, [token]);

  return (
    // ✅ Provide context to whole app
    <MyContext.Provider value={providerValue}>
      <Navbar />
      {isLoading ? (
        <Loader /> // show loader while fetching
      ) : (
        <>
          {/* ✅ Define app routes */}
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
            <Route path="/*" element={<NotFound />} /> {/* 404 page */}
          </Routes>
        </>
      )}
    </MyContext.Provider>
  );
};

export default App;
