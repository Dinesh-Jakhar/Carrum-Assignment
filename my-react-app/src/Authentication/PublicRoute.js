import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  return !isAuthenticated ? Component : <Navigate to="/home" />;
};

export default PublicRoute;

// import React from 'react';
// import { Route, Navigate, Routes } from 'react-router-dom';

// const PublicRoute = ({ element: Component, ...rest }) => {
//   const isAuthenticated = !!localStorage.getItem('authToken');
//   return (
//     <Routes>
//     <Route
//       {...rest}
//       element={!isAuthenticated ? <Component {...rest} /> : <Navigate to="/home" />}
//     />
//     </Routes>
//   );
// };

// export default PublicRoute;
