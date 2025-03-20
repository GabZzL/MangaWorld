import axios, { AxiosRequestConfig } from "axios";
import handleApiError from "./api-error";

const API_URL = "http://localhost:3000";

const apiRequest = async <T>(
  method: "GET" | "POST" | "PATCH" | "DELETE",
  endpoint: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T | null> => {
  try {
    const res = await axios({
      method,
      url: `${API_URL}${endpoint}`,
      data,
      ...config,
    });
    
    return res.data as T;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

export default apiRequest;
