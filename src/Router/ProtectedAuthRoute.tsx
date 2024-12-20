import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from '../Redux/store';

const ProtectedAuthRoute = ({ element }: { element: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const role = useSelector((state: RootState) => state.auth.role);

  if (!token) {
    return element;
  }

  if (role === "candidate") {
    return <Navigate to="/candidate/dashboard" replace />;
  } else {
    return <Navigate to="/employeer/dashboard" replace />;
  }
};

export default ProtectedAuthRoute;
