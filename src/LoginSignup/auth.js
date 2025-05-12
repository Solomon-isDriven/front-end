import axiosInstance, { getCsrfToken } from "./axios";

export const registerUser = async (payload) => {
  await getCsrfToken();
  const response = await axiosInstance.post("/auth/register", payload);
  return response.data;
};

export const loginUser = async (payload) => {
  await getCsrfToken();
  const response = await axiosInstance.post("/auth/login", payload);
  return response.data;
};
