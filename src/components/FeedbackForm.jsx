import React, { useContext, useState } from "react";
import Styles from "./FeedbackForm.module.css";
import { v4 as uuidv4 } from "uuid";
import { addFeedback } from "../services/feedbackServices";
import { MyContext } from "../MyContext";
import { toast } from "react-toastify";

const FeedbackForm = () => {
  const { setFeedbackEntries, setCount } = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await addFeedback(formData);
      setFeedbackEntries(data.feedback);
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
        <button type="submit" disabled={isLoading} className={Styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
