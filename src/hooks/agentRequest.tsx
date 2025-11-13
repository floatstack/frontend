import { axiosInstance } from "@/lib/axiosInstanct";
import { useQuery } from "@tanstack/react-query";


export const useFetchAgent = () => {
  return useQuery({
    queryKey: ["agents"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/dashboard/agents`);
      return response.data;
    },
    retry: 3, // Limit retries to avoid infinite loops on failure
    staleTime: 5 * 60 * 100,
  });
};
