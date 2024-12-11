import axios from "axios";
import { useState, useCallback } from "react";

export default function useAPI<T = any>() {
  const [data, setData] = useState<T | null>(null); // Store the API response data
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [error, setError] = useState<string | null>(null); // Store error messages

  const request = useCallback(
    async (
      method: "GET" | "POST" | "PUT" | "DELETE", // HTTP method
      url: string, // API endpoint
      options: { headers?: object; body?: object } = {}, // Additional options
      onSuccess?: (responseData: T) => void, // Optional callback
    ) => {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors

      try {
        // Perform the API request
        const response = await axios({
          method,
          url,
          headers: options.headers || {},
          data: options.body || null,
        });

        setData(response.data); // Update data state
        console.log("API Response:", response.data); // Log for debugging

        // Call success callback if provided
        if (onSuccess) {
          onSuccess(response.data);
        }
      } catch (e: any) {
        // Handle errors
        const errorMessage = e.response?.data?.message || e.message || "An error occurred";
        setError(errorMessage);
        console.error("API Error:", errorMessage); // Log for debugging
      } finally {
        setLoading(false); // End loading
      }
    },
    [],
  );

  return {
    data,
    loading,
    error,
    // Helper functions for specific HTTP methods
    getRequest: (url: string, headers?: object, onSuccess?: (data: T) => void) =>
      request("GET", url, { headers }, onSuccess),
    postRequest: (url: string, body: object, token?: string, onSuccess?: (data: T) => void) =>
      request(
        "POST",
        url,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body },
        onSuccess,
      ),
    putRequest: (url: string, body: object, token?: string, onSuccess?: (data: T) => void) =>
      request(
        "PUT",
        url,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body },
        onSuccess,
      ),
    deleteRequest: (url: string, token?: string, onSuccess?: (data: T) => void) =>
      request("DELETE", url, { headers: { Authorization: `Bearer ${token}` } }, onSuccess),
  };
}
