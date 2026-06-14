import type { TRouterNode } from "../routesConfigs";
import { ProtectedRoute } from "../../libs/ProtectedRoute";
import { RoleGuard } from "../../libs/RoleGuard";
import { ProfilePage } from "@/pages/profile/ProfilePage";
import { SchedulePage } from "@/pages/schedule";
import { StudentDashboardPage } from "@/pages/dashboard";
import { StudentTasksPage } from "@/pages/tasks/student-tasks";
import { GradesPage } from "@/pages/grades";
import { ReviewBoardPage } from "@/pages/review-board";
import { GradebookPage } from "@/pages/gradebook";
import { CrmBoardPage } from "@/pages/crm-board";
import { StreamsPage } from "@/pages/streams";
import { AdminTasksPage } from "@/pages/tasks/admin-tasks";
import { UsersPage } from "@/pages/users";
import { ForbiddenPage } from "@/pages/errors/ForbiddenPage";
import { NotFoundPage } from "@/pages/errors/NotFoundPage";

export const mainRoutesFullPaths = {
  DASHBOARD: "/",
  TASKS: "/tasks",
  TASK_DETAIL: "/tasks/:id",
  GRADES: "/grades",
  REVIEW: "/review",
  GRADEBOOK: "/gradebook",
  CRM: "/crm",
  STREAMS: "/streams",
  STREAM_DETAIL: "/streams/:id",
  ADMIN_TASKS: "/admin/tasks",
  USERS: "/users",
  PROFILE: "/profile",
  SCHEDULE: "/schedule",
  E403: "/403",
  E404: "*",
} as const;

export const mainRoutes: readonly TRouterNode[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute withAuth>
        {/*<AppShell />*/}
        <span>app-shell</span>
      </ProtectedRoute>
    ),
    children: [
      {
        path: mainRoutesFullPaths.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: mainRoutesFullPaths.SCHEDULE,
        element: <SchedulePage />,
      },
      {
        path: mainRoutesFullPaths.DASHBOARD,
        element: (
          <RoleGuard roles={["STUDENT"]}>
            <StudentDashboardPage />
          </RoleGuard>
        ),
      },
      {
        path: mainRoutesFullPaths.TASKS,
        element: (
          <RoleGuard roles={["STUDENT"]}>
            <StudentTasksPage />
          </RoleGuard>
        ),
      },
      {
        path: mainRoutesFullPaths.TASK_DETAIL,
        element: (
          <RoleGuard roles={["STUDENT"]}>
            <StudentTasksPage />
          </RoleGuard>
        ),
      },
      {
        path: mainRoutesFullPaths.GRADES,
        element: (
          <RoleGuard roles={["STUDENT"]}>
            <GradesPage />
          </RoleGuard>
        ),
      },
      {
        path: mainRoutesFullPaths.REVIEW,
        element: (
          <RoleGuard roles={["MENTOR", "ADMIN"]}>
            <ReviewBoardPage />
          </RoleGuard>
        ),
      },
      {
        path: mainRoutesFullPaths.GRADEBOOK,
        element: (
          <RoleGuard roles={["MENTOR"]}>
            <GradebookPage />
          </RoleGuard>
        ),
      },
      {
        path: mainRoutesFullPaths.CRM,
        element: (
          <RoleGuard roles={["MANAGER", "ADMIN"]}>
            <CrmBoardPage />
          </RoleGuard>
        ),
      },
      {
        path: mainRoutesFullPaths.STREAMS,
        element: (
          <RoleGuard roles={["ADMIN"]}>
            <StreamsPage />
          </RoleGuard>
        ),
      },
      {
        path: mainRoutesFullPaths.STREAM_DETAIL,
        element: (
          <RoleGuard roles={["ADMIN"]}>
            <StreamsPage />
          </RoleGuard>
        ),
      },
      {
        path: mainRoutesFullPaths.ADMIN_TASKS,
        element: (
          <RoleGuard roles={["ADMIN"]}>
            <AdminTasksPage />
          </RoleGuard>
        ),
      },
      {
        path: mainRoutesFullPaths.USERS,
        element: (
          <RoleGuard roles={["ADMIN"]}>
            <UsersPage />
          </RoleGuard>
        ),
      },
      { path: mainRoutesFullPaths.E403, element: <ForbiddenPage /> },
      { path: mainRoutesFullPaths.E404, element: <NotFoundPage /> },
    ],
  },
];
