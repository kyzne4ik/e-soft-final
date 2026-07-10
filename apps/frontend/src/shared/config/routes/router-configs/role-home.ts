import type { TRole } from "./routesConfigs";

export const roleHomePath: Record<TRole, string> = {
  STUDENT: "/schedule",
  MENTOR: "/review",
  MANAGER: "/crm",
  ADMIN: "/schedule",
};
