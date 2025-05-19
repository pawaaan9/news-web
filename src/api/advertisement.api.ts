import axiosInstance from "./axiosInstance";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export interface AdvertisementData {
  _id?: string;
  title: string;
  description?: string;
  adImage: string | File; // URL of the advertisement image
  position: string;
  country: string;
  isWebsiteHave: boolean;
  adUrl?: string;
  email?: string;
  whatsappNo?: string;
  phoneNo?: string;
  fbProfile?: string;
  startDatetime: string;
  endDatetime: string;
  status: "draft" | "published" | "expired" | "toPublish";
}

// Create a new advertisement
export const createAdvertisement = async (advertisement: AdvertisementData) => {
  const formData = new FormData();

  // Add fields to FormData
  formData.append("title", advertisement.title);
  formData.append("description", advertisement.description || "");
  formData.append("position", advertisement.position);
  formData.append("country", advertisement.country);
  formData.append("isWebsiteHave", advertisement.isWebsiteHave.toString());
  formData.append("adUrl", advertisement.adUrl || "");
  formData.append("email", advertisement.email || "");
  formData.append("whatsappNo", advertisement.whatsappNo || "");
  formData.append("phoneNo", advertisement.phoneNo || "");
  formData.append("fbProfile", advertisement.fbProfile || "");
  formData.append("startDatetime", advertisement.startDatetime);
  formData.append("endDatetime", advertisement.endDatetime);
  formData.append("status", advertisement.status);

  // Add image file if provided
  if (advertisement.adImage instanceof File) {
    formData.append("image", advertisement.adImage);
  }

  const response = await axios.post(`${API_URL}/advertisement`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Get all advertisements
export const getAllAdvertisements = async (): Promise<{
  data: AdvertisementData[];
}> => {
  try {
    const response = await axiosInstance.get<{ data: AdvertisementData[] }>(
      "/advertisement"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching advertisements:", error);
    return { data: [] };
  }
};

// Get advertisement by ID
export const getAdvertisementById = async (id: string) => {
  const response = await axiosInstance.get(`/advertisement/${id}`);
  return response.data;
};

// Update an advertisement
export const updateAdvertisement = async (
  id: string,
  advertisement: AdvertisementData
) => {
  const formData = new FormData();

  // Add fields to FormData
  formData.append("title", advertisement.title);
  formData.append("description", advertisement.description || "");
  formData.append("position", advertisement.position);
  formData.append("country", advertisement.country);
  formData.append("isWebsiteHave", advertisement.isWebsiteHave.toString());
  formData.append("adUrl", advertisement.adUrl || "");
  formData.append("email", advertisement.email || "");
  formData.append("whatsappNo", advertisement.whatsappNo || "");
  formData.append("phoneNo", advertisement.phoneNo || "");
  formData.append("fbProfile", advertisement.fbProfile || "");
  formData.append("startDatetime", advertisement.startDatetime);
  formData.append("endDatetime", advertisement.endDatetime);
  formData.append("status", advertisement.status);

  // Add image file if provided
  if (advertisement.adImage instanceof File) {
    formData.append("image", advertisement.adImage);
  }

  const response = await axios.put(`${API_URL}/advertisement/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Delete an advertisement
export const deleteAdvertisement = async (id: string) => {
  const response = await axiosInstance.delete(`/advertisement/${id}`);
  return response.data;
};

// Change advertisement status
export const changeAdvertisementStatus = async (
  id: string,
  status: "draft" | "published" | "expired" | "toPublish"
) => {
  const response = await axiosInstance.patch(`/advertisement/${id}/status`, {
    status,
  });
  return response.data;
};
