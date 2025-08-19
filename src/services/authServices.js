import { clientServer } from "../config";

export const loginUser = async ({ email, password }) => {
  try {
    const response = await clientServer.post("/user/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
};

export const registerUser = async ({ name, username, email, password }) => {
  try {
    const response = await clientServer.post("/user/register", {
      username,
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
};
