import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedCompanyRouteProps {
  element: JSX.Element; // The component to render if the user is authorized
  allowedRoles: string[]; // An array of allowed roles
}

const ProtectedCompanyRoute: React.FC<ProtectedCompanyRouteProps> = ({ element, allowedRoles }) => {
  const role = localStorage.getItem('role'); // Get the user role from localStorage

  // Check if the user's role is one of the allowed roles
  if (!allowedRoles.includes(role || '')) {
    return <Navigate to="/" replace />; // Redirect to home if unauthorized
  }

  return element; // Render the protected component
};

export default ProtectedCompanyRoute;
