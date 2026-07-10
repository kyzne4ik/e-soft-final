import type { TRouterNode } from "../routesConfigs";
import { ProtectedRoute } from "../../libs/ProtectedRoute";
import { LoginPage } from "@/pages/auth/LoginPage";
import { InvitePage } from "@/pages/auth/InvitePage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";

export const authRoutesFullPaths = {
  LOGIN: "/login",
  INVITE: "/invite/:token",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token",
} as const;

export const authRoutes: readonly TRouterNode[] = [
  {
    path: authRoutesFullPaths.LOGIN,
    element: (
      <ProtectedRoute withoutAuth>
        <LoginPage />
      </ProtectedRoute>
    ),
  },
  {
    path: authRoutesFullPaths.INVITE,
    element: <InvitePage />,
  },
  {
    path: authRoutesFullPaths.FORGOT_PASSWORD,
    element: (
      <ProtectedRoute withoutAuth>
        <ForgotPasswordPage />
      </ProtectedRoute>
    ),
  },
  {
    path: authRoutesFullPaths.RESET_PASSWORD,
    element: <ResetPasswordPage />,
  },
];
