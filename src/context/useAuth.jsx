import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export const useAuth = () => {
  const { user, login, logout } = useContext(AuthContext);

  const isAuthorized = (requiredRole) => {
    return user && user.role === requiredRole;
  };

  return { user, login, logout, isAuthorized };
};