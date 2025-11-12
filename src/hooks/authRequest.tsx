import { axiosInstance, publicAxios } from "@/lib/axiosInstanct";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { AxiosError } from "axios";

export const useSignIn = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      publicAxios.post("/auth/login", data),
    onSuccess: () => {
      toast({
        title: "Login successful",
        description: "You have been logged in successfully",
      });
      window.location.href = "/login";
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast({
        variant: "destructive",
        title: "Login failed",
        description:
          error.response?.data?.message ||
          "Please check your information and try again",
      });
    },
  });
};

export const useFetchUserProfile = () => {
  const access_token = sessionStorage.getItem("access_token");
  return useQuery({
    queryKey: ["auth_user"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/auth/me`);
      return response.data;
    },
    enabled: !!access_token, // Only run if accessToken exists
    retry: 1, // Limit retries to avoid infinite loops on failure
    staleTime: 5 * 60 * 1000,
  });
};
