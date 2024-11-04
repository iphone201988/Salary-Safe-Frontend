import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../Redux/store';

interface ProtectedCandidateRouteProps {
  element: JSX.Element; 
}

const ProtectedCandidateRoute: React.FC<ProtectedCandidateRouteProps> = ({ element }) => {
  const role = useSelector((state:RootState ) => state.auth.role);
  const access_token = useSelector((state:RootState ) => state.auth.token);
  if (!access_token || role !== "candidate") {
    return <Navigate to="/login-employee" replace />;
  }

  return element;
};

export default ProtectedCandidateRoute;
