import React from 'react';
import { Navigate } from 'react-router-dom';
import { RootState } from '../Redux/store';
import { useSelector } from 'react-redux';

interface ProtectedCompanyRouteProps {
  element: JSX.Element; 
}

const ProtectedCompanyRoute: React.FC<ProtectedCompanyRouteProps> = ({ element }) => {
  const role = useSelector((state:RootState ) => state.auth.role);
  const access_token = useSelector((state:RootState ) => state.auth.token);
  if (!access_token || role !== "employeer") {
    return <Navigate to="/login-company" replace />;
  }

  return element;
};

export default ProtectedCompanyRoute;
