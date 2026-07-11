import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Query the exact key used by your login and Google auth flows
  const token = localStorage.getItem('token'); 

  // If no token exists, redirect to login and replace the history stack
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the requested protected page
  return children;
};

export default ProtectedRoute;