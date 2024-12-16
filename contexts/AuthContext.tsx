import React, { createContext } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { AuthContextType } from "@/types";
import axios from "axios";
import { useRouter } from "expo-router";

// Create a context with default values
export const AuthContext = createContext<AuthContextType>({
  token: null,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
});

// The AuthProvider component will wrap our app and provide the auth state and functions
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  /* Use the custom storage state hook to manage the token across sessions.
     storedToken is the persisted token value.
     loading is initially true until the token is retrieved from storage.
     We don't specifically need loading here, but it's available if needed. */
  const [[loading, storedToken], setStoredToken] = useStorageState("authToken");
  const router = useRouter();
  const API_BASE_URL = "https://pigeon-api-ca-1.vercel.app";

  // A function to handle user registration
  // Makes a POST request to the API and, if successful, stores the returned token
  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user`, {
        username,
        email,
        password,
      });

      // Extract token from response data
      const { token } = response.data;
      setStoredToken(token);
    } catch (error: any) {
      // Extract and throw a meaningful error message
      const message = error.response?.data?.message || "Registration failed";
      throw new Error(message);
    }
  };

  // A function to handle user login
  // Similar to register, it posts credentials and stores the returned token
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signin`, {
        email,
        password,
      });

      const { token } = response.data;
      // Store the token
      setStoredToken(token);
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      throw new Error(message);
    }
  };

  // A function to handle logging out
  // Simply clears the token from storage
  const logout = async () => {
    setStoredToken(null);
  };

  // Return the AuthContext.Provider with the token and auth functions as its value
  // `children` are all the descendant components that will use this context.
  return (
    <AuthContext.Provider value={{ token: storedToken, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
