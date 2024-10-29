import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedCompanyRouteProps {
  element: JSX.Element; 
}

const ProtectedCompanyRoute: React.FC<ProtectedCompanyRouteProps> = ({ element }) => {
  const role = localStorage.getItem('role');
  const access_token = localStorage.getItem('access_token');
  if (!access_token || role !== "employeer") {
    return <Navigate to="/login-company" replace />;
  }

  return element;
};

export default ProtectedCompanyRoute;
