import axiosInstance from "./axiosInstance";

// Define types for keyword operations
export interface KeywordData {
  keyword: string;
}

// Create a new keyword
export const createKeyword = async (data: KeywordData) => {
  const response = await axiosInstance.post("/keyword", data);
  return response.data;
};

// Delete a keyword by ID
export const deleteKeyword = async (id: string) => {
  const response = await axiosInstance.delete(`/keyword/${id}`);
  return response.data;
};

// Update a keyword by ID
export const updateKeyword = async (id: string, data: KeywordData) => {
  const response = await axiosInstance.put(`/keyword/${id}`, data);
  return response.data;
};

// Get all keywords
export const getKeywords = async () => {
  const response = await axiosInstance.get("/keyword");
  return response.data;
};

// Get a single keyword by ID
export const getKeywordById = async (id: string) => {
  const response = await axiosInstance.get(`/keyword/${id}`);
  return response.data;
};