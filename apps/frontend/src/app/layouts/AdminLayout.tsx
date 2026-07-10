import { RoleAppLayout } from "./RoleAppLayout";
import { navConfig } from "./navConfig";

export function AdminLayout() {
  return <RoleAppLayout nav={navConfig.ADMIN} />;
}
