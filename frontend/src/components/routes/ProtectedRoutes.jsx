import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isLoggedInUser, role } = useAuthContext();

  if (!isLoggedInUser) {
    return <Navigate to="/" replace />;
  }

  const currentRole = user?.role || role;
  if (!allowedRoles.includes(currentRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
