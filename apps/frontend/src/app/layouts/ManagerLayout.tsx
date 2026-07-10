import { RoleAppLayout } from "./RoleAppLayout";
import { navConfig } from "./navConfig";

export function ManagerLayout() {
  return <RoleAppLayout nav={navConfig.MANAGER} />;
}
