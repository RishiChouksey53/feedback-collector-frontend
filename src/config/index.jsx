import axios from "axios";

// Axios instance
export const clientServer = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // Backend base URL
});
