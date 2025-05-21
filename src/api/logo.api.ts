import axiosInstance from "./axiosInstance";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export interface LogoApiResponse {
  status: string;
  data: {
    _id: string;
    url: string;
    uploadedAt: string;
    [key: string]: any;
  };
}

// Upload a new logo
export const uploadLogo = async (logoFile: File) => {
  const formData = new FormData();
  formData.append("logo", logoFile);

  const response = await axios.post<LogoApiResponse>(
    `${API_URL}/logo/upload-logo`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// Get the current logo
export const getLogo = async (): Promise<LogoApiResponse> => {
  const response = await axiosInstance.get<LogoApiResponse>("/logo/logo");
  return response.data;
};
