import axiosInstance from "./axiosInstance";

interface LoginData {
  email: string;
  password: string;
}

interface ResetPasswordData {
  email: string;
  currentPassword: string;
  newPassword: string;
}

// Login API call
export const login = async (data: LoginData) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

// Reset Password API call
export const resetPassword = async (data: ResetPasswordData) => {
  const response = await axiosInstance.post("/auth/reset-password", data);
  return response.data;
};