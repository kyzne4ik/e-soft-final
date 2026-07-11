import { UrlUpsertSubmissionModal } from "@/features/upsert-submission";
import { RoleAppLayout } from "./RoleAppLayout";
import { navConfig } from "./navConfig";

export function StudentLayout() {
  return (
    <>
      <RoleAppLayout nav={navConfig.STUDENT} />
      <UrlUpsertSubmissionModal />
    </>
  );
}
