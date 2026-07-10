import { type ReactNode } from "react";
import {
  publicRoutes,
  studentRoutes,
  mentorRoutes,
  managerRoutes,
  adminRoutes,
} from "./routes-data";

export type TRouterNode = {
  path?: string;
  element: ReactNode;
  children?: TRouterNode[];
};

export type TRole = "STUDENT" | "MENTOR" | "MANAGER" | "ADMIN";

export { publicRoutes };

export const roleRoutes: Record<TRole, readonly TRouterNode[]> = {
  STUDENT: studentRoutes,
  MENTOR: mentorRoutes,
  MANAGER: managerRoutes,
  ADMIN: adminRoutes,
};
