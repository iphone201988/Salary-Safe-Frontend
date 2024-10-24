import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtesctedOtpRoute = ({ element }: { element: JSX.Element }) => {
  if (!isAuthenticated() && localStorage.getItem("type")!="1") {
    return <Navigate to="/" replace />;
  }
  return element;
};

export default ProtesctedOtpRoute;
