import { Navigate } from "react-router-dom";
import "./ProtectedRoute.css";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  return (
    <>
      {!token && <Navigate to="/login"></Navigate>}

      {token && children}
    </>
  );
}

export default ProtectedRoute;
