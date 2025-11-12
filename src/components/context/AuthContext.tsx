import { useFetchUserProfile, useSignIn } from "@/hooks/authRequest";
import { toast } from "@/hooks/use-toast";
import { AxiosResponse } from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AxiosResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { mutateAsync: signInMutation } = useSignIn();
  const { data: profileData, isLoading: isProfileLoading } =
    useFetchUserProfile();

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        sessionStorage.removeItem("user"); // Clear invalid data
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (profileData) {
      setUser(profileData);
      sessionStorage.setItem("user", JSON.stringify(profileData));
    }
  }, [profileData]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Replace with actual login API call
      const response = await signInMutation( {
        email,
        password,
      });
      if (response.status) {
        sessionStorage.setItem("access_token", response?.data?.access_token);
        setUser(profileData);
        sessionStorage.setItem("user", JSON.stringify(profileData));
      }
      return response;
    } catch (error) {
      toast({
        title: "Login failed",
        description:
          error.response?.data?.message ||
          "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw Error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };


  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("access_token");
    sessionStorage.clear();
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading: isLoading || isProfileLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
