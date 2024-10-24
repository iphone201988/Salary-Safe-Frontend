import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedAuthRoute = ({ element }: { element: JSX.Element }) => {
  if (isAuthenticated()) {
    console.log("jksdahgjkh")
    // If user is logged in, redirect them to the homepage (or dashboard)
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, render the element (login/register page)
  return element;
};

export default ProtectedAuthRoute;
