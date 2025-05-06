import axios from "axios";
import axiosInstance from "./axiosInstance";

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
  contentBlocks: ContentBlock[];
}

export interface ContentBlock {
  type: "paragraph" | "image" | "video";
  id: number;
  content?: string;
  file?: File;
}

// Get all content
export const getContent = async () => {
  const response = await axiosInstance.get("/content");
  return response.data;
};

// Submit content (Create or Update)
export const submitContent = async (content: {
  headline1: string;
  headline2: string;
  headline3: string;
  url: string;
  category: string | null;
  keywords: string[];
  status: "Draft" | "Published";
  headlineImage: File | null;
  contentBlocks: {
    type: "paragraph" | "image" | "video";
    id: number;
    content?: string;
    file?: File;
  }[];
}) => {
  const formData = new FormData();

  // Generate URL if not provided
  const generatedUrl = content.headline1
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  // Add headline and other fields
  formData.append("headline1", content.headline1);
  formData.append("headline2", content.headline2);
  formData.append("headline3", content.headline3);
  formData.append("url", content.url || generatedUrl);
  formData.append("category", content.category || "");
  formData.append("keywords", JSON.stringify(content.keywords));
  formData.append("status", content.status);

  // Add headline image
  if (content.headlineImage) {
    formData.append("image", content.headlineImage);
  }

  // Add content blocks
  content.contentBlocks.forEach((block, index) => {
    formData.append(`contentBlocks[${index}][type]`, block.type);
    formData.append(`contentBlocks[${index}][order]`, (index + 1).toString());
    if (block.type === "paragraph" || block.type === "video") {
      formData.append(`contentBlocks[${index}][data]`, block.content || "");
    } else if (block.type === "image" && block.file) {
      formData.append(`contentBlocks[${index}][data]`, block.file);
    }
  });

  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/content",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Content submitted successfully:", response.data);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "Error submitting content:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getContentById = async (id: string) => {
  const response = await axiosInstance.get(`/content/${id}`);
  return response.data;
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
