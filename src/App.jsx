import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import FeedbackPage from "./pages/FeedbackPage";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar count={count} />
      <FeedbackPage setCount={setCount} />
    </>
  );
};

export default App;
