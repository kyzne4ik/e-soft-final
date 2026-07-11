import { type ReactNode, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import {
  CatchAll,
  ProtectedRoute,
  publicRoutes,
  renderRoutes,
  roleRoutes,
  type TRole,
} from "@/shared/config/routes";
import { ForbiddenPage } from "@/pages/errors";
import { useAuth } from "@/features/auth";
import {
  AdminLayout,
  ManagerLayout,
  MentorLayout,
  StudentLayout,
} from "./layouts";

const ROLE_LAYOUT: Record<TRole, ReactNode> = {
  STUDENT: <StudentLayout />,
  MENTOR: <MentorLayout />,
  MANAGER: <ManagerLayout />,
  ADMIN: <AdminLayout />,
};

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback="">
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

function AppRoutes() {
  const { data } = useAuth();
  const role = data?.data?.role;

  return (
    <Routes>
      {renderRoutes(publicRoutes)}

      {role ? (
        <Route
          element={
            <ProtectedRoute withAuth>{ROLE_LAYOUT[role]}</ProtectedRoute>
          }
        >
          {renderRoutes(roleRoutes[role])}
        </Route>
      ) : null}

      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="*" element={<CatchAll />} />
    </Routes>
  );
}
