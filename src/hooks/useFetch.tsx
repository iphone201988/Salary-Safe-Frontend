import { useState } from "react";
import { getToken } from "../utils/helper";
import axios from "axios";

interface useFetchProps {
  url: string;
}

const useFetch = async ({ url }: useFetchProps) => {
  const [isLoading, setIsLoading] = useState<any>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    setIsLoading(true);
    const response = await axios.get(url, config);
    setData(response.data);
    setIsLoading(false);
  } catch (error: any) {
    setError(error);
    setIsLoading(false);
  }

  return { isLoading, data, error };
};

export default useFetch;
