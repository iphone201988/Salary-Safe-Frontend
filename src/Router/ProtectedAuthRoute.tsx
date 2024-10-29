import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedAuthRoute = ({ element }: { element: JSX.Element }) => {
  if (isAuthenticated()) {
    console.log("jksdahgjkh");
    const role = localStorage.getItem("role");
    if (role === "candidate") {
      return <Navigate to="/candidate/dashboard" replace />;
    } else {
      return <Navigate to="/employeer/dashboard" replace />;
    }
  }

  return element;
};

export default ProtectedAuthRoute;
