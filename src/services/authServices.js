import { toast } from "react-toastify";
import { clientServer } from "../config";

// Login user
export const loginUser = async ({ email, password }) => {
  try {
    const response = await clientServer.post("/user/login", {
      email,
      password,
    });
    if (response.status === 200) {
      toast.success("Login successfull!", { autoClose: 1000 });
    }
    return response.data;
  } catch (error) {
    throw error?.response?.data || error.message;
  }
};

// Register user
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
    throw error?.response?.data || error.message;
  }
};

// Get user profile
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
