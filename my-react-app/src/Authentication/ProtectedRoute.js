import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import CustomerHome from '../Components/CustomerHome';
import DriverHome from '../Components/DriverHome';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  const role = localStorage.getItem('role');
  const location = useLocation();
  


if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (role === 'customer') {
    return <CustomerHome {...rest} />;
  }

  if (role === 'driver') {
    return <DriverHome {...rest} />;
  }

  // Default to the original component if no specific role-based redirection is needed
  return <Component {...rest} />;

};

export default ProtectedRoute;



