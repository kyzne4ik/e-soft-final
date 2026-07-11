import type { TRouterNode } from "../routesConfigs";
import { ManagerCrmBoardPage, ManagerSchedulePage } from "@/pages/manager";

export const managerRoutesFullPaths = {
  CRM_BOARD: "/crm",
  SCHEDULE: "/schedule",
} as const;

export const managerRoutes: readonly TRouterNode[] = [
  { path: managerRoutesFullPaths.CRM_BOARD, element: <ManagerCrmBoardPage /> },
  { path: managerRoutesFullPaths.SCHEDULE, element: <ManagerSchedulePage /> },
];
