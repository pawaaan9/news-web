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
interface LoginResponse {
  status: string;
  data: {
    token: string;
  };
}

interface User {
  id: string;
  fullname: string;
  username: string;
  email: string;
  userRole: string;
  // Add other fields returned by your API (excluding password)
}

interface GetProfileResponse {
  status: string;
  data: {
    user: User;
  };
}
// Login API call
export const login = async (data: LoginData) => {
  const response = await axiosInstance.post<LoginResponse>("/auth/login", data);
  const token = response.data.data.token;

  if (token) {
    localStorage.setItem("token", token);
  } else {
    console.warn("⚠️ Token not found in response");
  }

  return response.data;
};

// Get profile API call
export const getProfile = async (): Promise<GetProfileResponse> => {
  const response = await axiosInstance.get<GetProfileResponse>("/auth/profile");
  return response.data;
};

// Reset Password API call
export const resetPassword = async (data: ResetPasswordData) => {
  const response = await axiosInstance.post("/auth/reset-password", data);
  return response.data;
};

// Logout API call
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};
