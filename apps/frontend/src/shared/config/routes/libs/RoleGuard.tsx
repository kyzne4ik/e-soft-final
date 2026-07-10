import type { ReactNode } from "react";
import { Navigate } from "react-router";
import type { TRole } from "../router-configs/routesConfigs";
// import { useGetMe } from "@/shared/api/user/me";

interface RoleGuardProps {
  roles: TRole[];
  children: ReactNode;
}

export const RoleGuard = ({ roles, children }: RoleGuardProps) => {
  const { role } = { role: "STUDENT" as TRole }; // = useGetMe()

  if (!roles.includes(role)) {
    return <Navigate replace to="/403" />;
  }

  return <>{children}</>;
};
