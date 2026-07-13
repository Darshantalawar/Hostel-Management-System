import { Navigate } from "react-router-dom";
import { getToken, isAdmin } from "../services/auth";

// Guards every /admin/* route. A student token (or no token at all) is
// redirected straight to the admin login page — it never reaches any
// admin dashboard, navigation, or component.
function ProtectedAdminRoute({ children }) {

  if (!getToken() || !isAdmin()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedAdminRoute;
