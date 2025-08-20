import axios from "axios";

export const base_URL = "https://feedback-collector-backend-jkt3.onrender.com";

export const clientServer = axios.create({
  baseURL: base_URL,
});
