import { FC } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: FC = () => {
  const { token } = useAuthContext();

  if (!token) {
    return <Navigate to={'/login'} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;