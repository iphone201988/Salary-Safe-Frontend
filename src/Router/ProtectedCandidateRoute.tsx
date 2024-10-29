import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedCandidateRouteProps {
  element: JSX.Element; 
}

const ProtectedCandidateRoute: React.FC<ProtectedCandidateRouteProps> = ({ element }) => {
  const role = localStorage.getItem('role');
  const access_token = localStorage.getItem('access_token');
  if (!access_token || role !== "candidate") {
    return <Navigate to="/login-employee" replace />;
  }

  return element;
};

export default ProtectedCandidateRoute;
