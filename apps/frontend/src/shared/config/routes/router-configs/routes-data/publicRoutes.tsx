import type { TRouterNode } from "../routesConfigs";
import { LandingPage } from "@/pages/public/LandingPage";
import { ApplyPage } from "@/pages/public/ApplyPage";

export const publicRoutesFullPaths = {
  LANDING: "/",
  APPLY: "/apply",
} as const;

export const publicRoutes: readonly TRouterNode[] = [
  { path: publicRoutesFullPaths.LANDING, element: <LandingPage /> },
  { path: publicRoutesFullPaths.APPLY, element: <ApplyPage /> },
];
