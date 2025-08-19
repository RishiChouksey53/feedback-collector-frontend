import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { MyContext } from "./contexts/MyContext";

const App = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [user, setUser] = useState(null);
  const providerValue = {
    user,
    setUser,
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
        <Route
          path="/login"
          element={<Auth setUser={setUser} isLoginPage={isLoginPage} />}
        />
        <Route path="/register" element={<Auth isLoginPage={!isLoginPage} />} />
        <Route path="/" element={<DashboardPage user={user} />} />
      </Routes>
    </MyContext.Provider>
  );
};

export default App;
