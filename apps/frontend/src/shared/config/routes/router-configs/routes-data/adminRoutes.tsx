import type { TRouterNode } from "../routesConfigs";
import {
  AdminStreamsPage,
  AdminTasksPage,
  AdminUsersPage,
  AdminCoursesPage,
  AdminSchedulePage,
} from "@/pages/admin";

export const adminRoutesFullPaths = {
  STREAMS: "/streams",
  TASKS: "/admin/tasks",
  USERS: "/users",
  COURSES: "/courses",
  SCHEDULE: "/schedule",
} as const;

export const adminRoutes: readonly TRouterNode[] = [
  { path: adminRoutesFullPaths.STREAMS, element: <AdminStreamsPage /> },
  { path: adminRoutesFullPaths.TASKS, element: <AdminTasksPage /> },
  { path: adminRoutesFullPaths.USERS, element: <AdminUsersPage /> },
  { path: adminRoutesFullPaths.COURSES, element: <AdminCoursesPage /> },
  { path: adminRoutesFullPaths.SCHEDULE, element: <AdminSchedulePage /> },
];
