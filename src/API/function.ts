import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearUserData } from "../Redux/reducer/userData";
import { logout } from "../Redux/reducer/authSlice";

const useApiCall = () => {
  const token = useSelector((state: any) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      if(err.response.status ===401){
        dispatch(clearUserData());
        dispatch(logout());
        navigate("/login-company");
        toast.error(err.response.data.message);
      }
      setError(err.message || "An error occurred");
      // throw err;
    } finally {
      setLoading(false);
    }
  };

  return { apiCall, loading, error };
};

export default useApiCall;
