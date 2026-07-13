import { Navigate } from "react-router-dom";
import { getToken, isStudent } from "../services/auth";

// Guards every /student/* route. An admin token (or no token at all) is
// redirected straight to the student login page — an admin never lands
// on the student dashboard, even by mistake.
function ProtectedStudentRoute({ children }) {

  if (!getToken() || !isStudent()) {
    return <Navigate to="/student/login" replace />;
  }

  return children;
}

export default ProtectedStudentRoute;
