import { Navigate } from "react-router";
import { useAuth } from "@/features/auth";
// import { HomePage } from "@/pages/public";
import { roleHomePath } from "../router-configs/role-home";

export const HomeEntry = () => {
  const { isAuth, isLoading, data } = useAuth();

  if (isLoading) return null;

  const role = data?.data.role;

  if (isAuth && role) {
    return <Navigate replace to={roleHomePath[role]} />;
  }

  // return <HomePage />;
  return <Navigate replace to="/login" />;
};
