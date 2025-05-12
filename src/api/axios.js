// src/api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, // ✅ required for Sanctum
});

export const getCsrfToken = () => axiosInstance.get("/sanctum/csrf-cookie");

export default axiosInstance;
