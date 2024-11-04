import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

export const isAuthenticated = () => {
  const token = useSelector((state:RootState ) => state.auth.token);
    return !!token; // Returns true if token exists, false otherwise
  };
  