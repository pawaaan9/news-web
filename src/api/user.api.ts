import axiosInstance from "./axiosInstance";

// Define types for user creation and update
export interface UserData {
  fullname: string;
  username: string;
  email: string;
  password: string;
  userRole: string;
  userRoleNo: number;
  category: string[];
}

export interface UpdateUserData {
  fullname?: string;
  username?: string;
  email?: string;
  password?: string;
  userRole?: string;
  userRoleNo?: number;
  category?: string[];
}

// Create a new user
export const createUser = async (data: UserData) => {
  const response = await axiosInstance.post("/user", data);
  return response.data;
};

// Delete a user by ID
export const deleteUser = async (id: string) => {
  const response = await axiosInstance.delete(`/user/${id}`);
  return response.data;
};

// Update a user by ID
export const updateUser = async (id: string, data: UpdateUserData) => {
  const response = await axiosInstance.put(`/user/${id}`, data);
  return response.data;
};

// Get all users
export const getUsers = async () => {
  const response = await axiosInstance.get("/user");
  return response.data;
};

// Get a single user by ID
export const getUserById = async (id: string) => {
  const response = await axiosInstance.get(`/user/${id}`);
  return response.data;
};
