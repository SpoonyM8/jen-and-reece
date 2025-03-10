import { FC } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const LoginRedirect: FC = () => {
  const { token } = useAuthContext();

  if (token) {
    return <Navigate to={'/home'} replace />;
  }

  return <Outlet />;
};

export default LoginRedirect;