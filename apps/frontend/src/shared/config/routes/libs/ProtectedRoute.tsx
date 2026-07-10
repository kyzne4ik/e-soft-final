import type { ReactNode } from "react";
import { useAuth } from "@/features/auth";
import { Navigate, useLocation } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
  withAuth?: boolean;
  withoutAuth?: boolean;
}

export const ProtectedRoute = ({
  children,
  withAuth = false,
  withoutAuth = false,
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (withAuth && !isAuth) {
    return <Navigate replace to="/login" state={{ from: location.pathname }} />;
  }

  if (withoutAuth && isAuth) {
    return <Navigate replace to="/" />;
  }

  return <>{children}</>;
};
