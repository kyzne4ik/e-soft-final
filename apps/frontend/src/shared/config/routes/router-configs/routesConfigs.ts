import type { ReactNode } from "react";
import { authRoutes, mainRoutes, publicRoutes } from "./routes-data";

export type TRouterNode = {
  path: string;
  element: ReactNode;
  children?: TRouterNode[];
};

export type TRole = "STUDENT" | "MENTOR" | "MANAGER" | "ADMIN";

export const routerConfig: readonly TRouterNode[] = [
  ...publicRoutes,
  ...mainRoutes,
  ...authRoutes,
];
