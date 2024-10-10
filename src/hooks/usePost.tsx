import axios from "axios";
import { getToken } from "../utils/helper";
import { useState } from "react";

interface usePostProps {
  url: string;
  body: any;
}
const usePost = async ({ url, body }: usePostProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const token = getToken();
  const config: Object = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    setIsLoading(true);
    const response = await axios.post(url, body, config);
    setData(response.data);
    setIsLoading(false);
  } catch (error: any) {
    setIsLoading(false);
    setError(error);
  }

  return { isLoading, data, error };
};

export default usePost;
