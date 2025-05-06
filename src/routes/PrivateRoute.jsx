import  { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../components/Shared/Utilities/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // Show a loading spinner while authentication state is being determined
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  // If the user is authenticated, render the protected content (children)
  if (user) {
    return children;
  }

  // Redirect To The Log-In Page If User Is Not Logged In & Return To The Current Page After Log-In
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
