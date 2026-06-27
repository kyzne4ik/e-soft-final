import { managerProfile, mentorProfile, studentProfile } from "@repo/database";

export const PROFILE_BY_ROLE = {
  STUDENT: studentProfile,
  MANAGER: managerProfile,
  MENTOR: mentorProfile,
  ADMIN: undefined,
} as const;
