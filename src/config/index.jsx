import axios from "axios";

// Backend base URL
export const base_URL = "https://feedback-collector-backend-jkt3.onrender.com";

// Axios instance
export const clientServer = axios.create({
  baseURL: base_URL,
});
