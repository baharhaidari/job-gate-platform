import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://job-gate-repo-1-2.onrender.com/api", // Change this to your backend URL
});

// Optional: Automatically add token if it's stored in localStorage or Redux store
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Replace this with Redux token if applicable
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
