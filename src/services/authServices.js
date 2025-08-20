import { toast } from "react-toastify";
import { clientServer } from "../config";
import { data } from "react-router-dom";

// 🔹 Login user
export const loginUser = async ({ email, password }) => {
  try {
    const response = await clientServer.post("/user/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const data = error.response?.data || error.message;
    return data;
  }
};

// 🔹 Register user
export const registerUser = async ({ name, username, email, password }) => {
  try {
    const response = await clientServer.post("/user/register", {
      username,
      name,
      email,
      password,
    });
    console.log(response);
    return response;
  } catch (error) {
    const data = error.response?.data || error.message;
    return data;
  }
};

// 🔹 Get user profile
export const getProfile = async () => {
  try {
    const response = await clientServer.get("user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
