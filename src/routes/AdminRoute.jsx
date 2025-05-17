import LoadingSpinner from "../components/Shared/Utilities/LoadingSpinner";
import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;
  if (role.role === "Admin" && role.isAdmin) return children;
  return <Navigate to="/dashboard" replace="true" />;
};

export default AdminRoute;
