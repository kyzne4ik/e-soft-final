import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/features/auth";
import { NotFoundPage } from "@/pages/errors";

export const CatchAll = () => {
  const { isAuth, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (!isAuth) {
    return <Navigate replace to="/login" state={{ from: location.pathname }} />;
  }

  return <NotFoundPage />;
};
