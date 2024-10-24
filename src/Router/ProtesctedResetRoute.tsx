import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtesctedResetRoute = ({ element }: { element: JSX.Element }) => {
  if (!isAuthenticated() && localStorage.getItem("type")!="2") {
    return <Navigate to="/" replace />;
  }
  return element;
};

export default ProtesctedResetRoute;
