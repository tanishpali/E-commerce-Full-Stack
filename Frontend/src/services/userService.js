import axios from "./axiosConfig";

// Login API Call
export const loginUser = async (userData) => {
  return await axios.post("/login", userData);
};

// Signup API Call
export const signupUser = async (userData) => {
  return await axios.post("/addUser", userData);
};
