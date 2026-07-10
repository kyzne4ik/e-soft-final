import {
  LoginPage,
  ActivatePage,
  ChangePasswordPage,
  ConfirmEnrollmentPage,
} from "@/pages/public";
import type { TRouterNode } from "../routesConfigs";
import { ProtectedRoute } from "../../libs/ProtectedRoute";
import { HomeEntry } from "../../libs/HomeEntry";

export const publicRoutesFullPaths = {
  HOME: "/",
  LOGIN: "/login",
  ACTIVATE: "/activate",
  CONFIRM_ENROLLMENT: "/confirm-enrollment",
  CHANGE_PASSWORD: "/change-password",
} as const;

export const publicRoutes: readonly TRouterNode[] = [
  {
    path: publicRoutesFullPaths.HOME,
    element: <HomeEntry />,
  },
  {
    path: publicRoutesFullPaths.LOGIN,
    element: <LoginPage />,
  },
  {
    path: publicRoutesFullPaths.ACTIVATE,
    element: <ActivatePage />,
  },
  {
    path: publicRoutesFullPaths.CONFIRM_ENROLLMENT,
    element: <ConfirmEnrollmentPage />,
  },
  {
    path: publicRoutesFullPaths.CHANGE_PASSWORD,
    element: (
      <ProtectedRoute withAuth>
        <ChangePasswordPage />
      </ProtectedRoute>
    ),
  },
];
