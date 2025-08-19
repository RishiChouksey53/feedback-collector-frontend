import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import FeedbackPage from "./pages/FeedbackPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar count={count} />
      <FeedbackPage setCount={setCount} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
};

export default App;
