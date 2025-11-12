import { toast } from "@/hooks/use-toast";
import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bear ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      sessionStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login page
      toast({
        title: "Session expired",
        description: "Please log in again.",
        variant: "destructive",
      });
    }
    return Promise.reject(error);
  }
);

export const publicAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
});

publicAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      toast({
        title: "Unauthorized",
        description: "Please log in to continue.",
        variant: "destructive",
      });
    }
    return Promise.reject(error);
  }
);
