import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from '../Redux/store';

const ProtectedAuthRoute = ({ element }: { element: JSX.Element }) => {
  const token = useSelector((state:RootState ) => state.auth.token);
  if (token) {
    const role = useSelector((state:RootState ) => state.auth.role);
    console.log("jksdahgjkh",token,role);
    if (role === "candidate") {
      return <Navigate to="/candidate/dashboard" replace />;
    } else {
      return <Navigate to="/employeer/dashboard" replace />;
    }
  }
  return element;
};

export default ProtectedAuthRoute;
