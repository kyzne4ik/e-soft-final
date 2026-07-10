import type { TRouterNode } from "../routesConfigs";
import {
  StudentTasksPage,
  StudentGradesPage,
  StudentSchedulePage,
} from "@/pages/student";

export const studentRoutesFullPaths = {
  TASKS: "/tasks",
  GRADES: "/grades",
  SCHEDULE: "/schedule",
} as const;

export const studentRoutes: readonly TRouterNode[] = [
  { path: studentRoutesFullPaths.TASKS, element: <StudentTasksPage /> },
  { path: studentRoutesFullPaths.GRADES, element: <StudentGradesPage /> },
  { path: studentRoutesFullPaths.SCHEDULE, element: <StudentSchedulePage /> },
];
