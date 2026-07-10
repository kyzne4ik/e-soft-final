import { UrlSubmissionReviewModal } from "@/features/open-submission";
import { RoleAppLayout } from "./RoleAppLayout";
import { navConfig } from "./navConfig";

export function MentorLayout() {
  return (
    <>
      <RoleAppLayout nav={navConfig.MENTOR} />
      <UrlSubmissionReviewModal />
    </>
  );
}
