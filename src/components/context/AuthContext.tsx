import {  useSignIn } from "@/hooks/authRequest";
import { toast } from "@/hooks/use-toast";
import { AxiosResponse } from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
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
  const [isLoading, setIsLoading] = useState(true);
  const { mutateAsync: signInMutation } = useSignIn();


const accessToken = sessionStorage.getItem("access_token");

  useEffect(() => {
    if (accessToken) {
      setIsLoading(false);
    }
  }, [accessToken]);



  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Replace with actual login API call
      const response = await signInMutation( {
        email,
        password,
      });
      if (response.status) {
        sessionStorage.setItem(
          "access_token",
          response?.data?.data?.authorization?.access_token
        );
        sessionStorage.setItem(
          "refresh_token",
          response?.data?.data?.authorization?.refresh_token
        );
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
    sessionStorage.removeItem("access_token");
    sessionStorage.clear();
  };


  const value = {
    isAuthenticated: !!accessToken,
    isLoading: isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
