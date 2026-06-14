import { Route } from "react-router";

import type { TRouterNode } from "../router-configs/routesConfigs";

export const renderRoutes = (routes: readonly TRouterNode[]) => {
  return routes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
};
