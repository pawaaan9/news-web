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
  provinces: string[];
  status: string;
  isFeatured: boolean;
  isSpecial: boolean;
  isBreaking: boolean;
  content: string;
  scheduledPublishDate?: string;
  keywords?: string[];
}

interface ContentResponse {
  data: ContentData[];
}

// Get all content
export const getContent = async (page: number = 1, limit: number = 10): Promise<ContentResponse> => {
  try {
    const response = await axiosInstance.get<ContentResponse>(`/content?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching content:', error);
    throw error;
  }
};

// Submit content (Create or Update)
export const submitContent = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/content`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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

// Get content by URL
export const getContentByUrl = async (url: string) => {
  const response = await axiosInstance.get(`/content/url/${url}`);
  return response.data;
};

export const updateContent = async (id: string, formData: FormData) => {
  try {
    const response = await axios.put(`${API_URL}/content/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
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

// Get all contents by URL
export const getAllContentsByUrl = async (
  url: string
): Promise<ContentData[]> => {
  const response = await axiosInstance.get<ContentData[]>(
    `/content/all-by-url/${url}`
  );
  return response.data;
};

// Get all scheduled content
export const getScheduledContent = async (): Promise<ContentResponse> => {
  const response = await axiosInstance.get<ContentResponse>(
    "/content/scheduled"
  );
  return response.data;
};

// Process scheduled content
export const processScheduledContent = async (): Promise<ContentResponse> => {
  const response = await axiosInstance.post<ContentResponse>(
    "/content/scheduled/process"
  );
  return response.data;
};

export const getContentsByKeyword = async (keyword: string) => {
  try {
    const response = await fetch(`${API_URL}/content/keyword/${keyword}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching contents by keyword:", error);
    throw error;
  }
};
