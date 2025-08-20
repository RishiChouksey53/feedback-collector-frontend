import React, { useContext, useState } from "react";
import Styles from "./FeedbackForm.module.css";
import { addFeedback } from "../services/feedbackServices"; // API call to add feedback
import { MyContext } from "../MyContext"; // Global context
import { ScaleLoader } from "react-spinners";
const FeedbackForm = () => {
  // Access context values (functions to update feedback entries and count)
  const { setFeedbackEntries, setCount } = useContext(MyContext);

  // Loading state (used to disable button while submitting)
  const [isLoading, setIsLoading] = useState(false);

  // Form state (name, email, message)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  /**
   * Handles form submission
   * - Prevents page reload
   * - Sends feedback data to API
   * - Updates context with new feedback list
   * - Resets form fields after submission
   */
  async function handleSubmit(e) {
    e.preventDefault(); // Prevents default form submit behavior (refresh)
    try {
      setIsLoading(true); // Show loading state
      const data = await addFeedback(formData); // Call API with form data
      setFeedbackEntries(data.feedback); // Update feedback list in context
    } catch (err) {
      console.error(err); // Log error
    } finally {
      setIsLoading(false); // Remove loading state
    }

    // Reset form fields after submission
    setFormData({
      name: "",
      email: "",
      message: "",
      date: "",
      id: "",
    });
  }

  /**
   * Handles input changes
   * - Updates formData state dynamically based on input field name
   */
  function handleChange(e) {
    const { name, value } = e.target;
    // Spread previous state and update only the changed field
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className={`${Styles.mainContainer} container`}>
      {/* Header */}
      <h2 className={Styles.header}>Share Your Feedback </h2>

      {/* Feedback form */}
      <form onSubmit={handleSubmit} className={Styles.feedbackForm}>
        <div className={Styles.userDetails}>
          {/* Name input */}
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

          {/* Email input */}
          <div>
            <label htmlFor="email">Email</label>
            <input
              placeholder="Your email@gmail.com"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Message input */}
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

        {/* Submit button */}
        <button type="submit" disabled={isLoading} className={Styles.btn}>
          {isLoading ? <div className={Styles.loader}></div> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
