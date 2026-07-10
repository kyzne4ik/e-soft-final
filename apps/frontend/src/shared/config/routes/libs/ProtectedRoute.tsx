import type { ReactNode } from "react";
import { useLocation } from "react-router";
// import { useGetMe } from "@/shared/api/user/me";
// import { authRoutesFullPaths, mainRoutesFullPaths } from "../router-configs";

interface ProtectedRouteProps {
  withAuth?: boolean;
  children: ReactNode;
  withoutAuth?: boolean;
  allowedFrom?: string | string[];
}

export const ProtectedRoute = ({
  children,
  allowedFrom,
  // withAuth = false,
  // withoutAuth = false,
}: ProtectedRouteProps) => {
  const location = useLocation();
  // const { isAuth } = { isAuth: true }; // = useGetMe()

  // if (withAuth && !isAuth) {
  //   return <Navigate replace to={AuthRoutesFullPaths.AUTHORIZATION} />;
  // }

  if (location.state?.isPasswordReset) {
    return <>{children}</>;
  }

  // if (withoutAuth && isAuth) {
  //   return <Navigate replace to={mainRoutesFullPaths.HOME} />;
  // }

  if (allowedFrom) {
    // const referrer = location.state?.from;
    // const isAllowed = Array.isArray(allowedFrom)
    //   ? allowedFrom.includes(referrer)
    //   : referrer === allowedFrom;
    // if (!isAllowed) {
    //   return (
    //     <Navigate replace to={mainRoutesFullPaths.PROFILE} />
    //   );
    // }
  }
  return <>{children}</>;
};
