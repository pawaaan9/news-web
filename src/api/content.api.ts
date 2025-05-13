import axios from "axios";
import axiosInstance from "./axiosInstance";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export interface ContentData {
  _id: string;
  headline1: string;
  headline2: string;
  headline3?: string;
  url: string;
  headlineImage: string;
  author: string;
  createdTime: string;
  category: string;
  status: string;
  isFeatured: boolean;
  isSpecial: boolean;
  content: string;
  
}


interface ContentResponse {
  data: ContentData[];
}

// Get all content
export const getContent = async (): Promise<ContentResponse> => {
  const response = await axiosInstance.get<ContentResponse>("/content");
  return response.data;
};

// Submit content (Create or Update)
export const submitContent = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/content`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getContentById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/content/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateContent = async (
  id: string,
  updateData: Partial<ContentData>
) => {
  const response = await axiosInstance.put(`/content/${id}`, updateData);
  return response.data;
};

export const deleteContent = async (id: string) => {
  const response = await axiosInstance.delete(`/content/${id}`);
  console.log("Content deleted successfully:", response.data);
  return response.data;
};

export const changeContentStatus = async (
  id: string,
  status: "Draft" | "Published" | "Canceled"
) => {
  const response = await axiosInstance.patch(`/content/${id}/status`, {
    status,
  });
  return response.data;
};

// Get content by URL
export const getContentByUrl = async (url: string): Promise<ContentData> => {
  const response = await axiosInstance.get<ContentData>(`/content/url/${url}`);
  return response.data;
};

// Get all contents by URL
export const getAllContentsByUrl = async (
  url: string
): Promise<ContentData[]> => {
  const response = await axiosInstance.get<ContentData[]>(
    `/content/all-by-url/${url}`
  );
  return response.data;
};
