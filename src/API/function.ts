import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";

const useApiCall = () => {
  const token = useSelector((state: any) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiCall = async (
    method: "get" | "post" | "put" | "delete" | "patch" ,
    url: string,
    data?: any
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method,
        url,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err: any) {
      setError(err.message || "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { apiCall, loading, error };
};

export default useApiCall;
