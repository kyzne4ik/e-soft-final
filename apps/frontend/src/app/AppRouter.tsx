import { Suspense } from "react";
import { renderRoutes, routerConfig } from "@/shared/config/routes";
import { Routes } from "react-router";
import { BrowserRouter } from "react-router";

export function AppRouter() {
  return (
    <Suspense fallback="">
      <BrowserRouter>
        <Routes>{renderRoutes(routerConfig)}</Routes>
      </BrowserRouter>
    </Suspense>
  );
}
