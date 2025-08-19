import React, { useState } from "react";
import Styles from "./FeedbackForm.module.css";
import { v4 as uuidv4 } from "uuid";
import { addFeedback } from "../services/feedbackServices";
import { toast } from "react-toastify";

const FeedbackForm = ({ setFeedbackEntries, setCount }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    date: "",
    id: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const newFeedback = {
      ...formData,
      date: new Date().toLocaleDateString("en-CA"),
      id: uuidv4(),
    };
    toast.success("Feedback added successfully!");
    setFeedbackEntries(addFeedback(newFeedback));
    setCount((prev) => prev + 1);
    setFormData({
      name: "",
      email: "",
      message: "",
      date: "",
      id: "",
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className={`${Styles.mainContainer} container`}>
      <h2 className={Styles.header}>Share Your Feedback </h2>
      <form onSubmit={handleSubmit} className={Styles.feedbackForm}>
        <div className={Styles.userDetails}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              placeholder="Your full name"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              placeholder="your email@gmail.com"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <label htmlFor="message">Message</label>
        <textarea
          placeholder="Share your feedback"
          id="message"
          type="text"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className={Styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
