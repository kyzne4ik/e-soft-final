import { UserDto, UserResponse } from "@repo/schemas";

type ProfileRow = {
  role: string;
  studentProfileId: number | null;
  mentorProfileId: number | null;
  managerProfileId: number | null;
};

export const userMap = (
  u: UserDto & { profileId?: number | null },
): UserResponse => ({
  id: u.id,
  firstName: u.firstName,
  lastName: u.lastName,
  patronymic: u.patronymic,
  email: u.email,
  role: u.role,
  isActivated: u.isActivated,
  profileId: u.profileId ?? null,
});

export const usersMap = (
  users: (UserDto & { profileId?: number | null })[],
): UserResponse[] => users.map(userMap);

export const resolveProfileId = (row: ProfileRow): number | null => {
  if (row.role === "STUDENT") return row.studentProfileId ?? null;
  if (row.role === "MENTOR" || row.role === "ADMIN")
    return row.mentorProfileId ?? null;
  if (row.role === "MANAGER") return row.managerProfileId ?? null;
  return null;
};

export const toUserWithProfile = <T extends ProfileRow>(
  row: T,
): Omit<T, "studentProfileId" | "mentorProfileId" | "managerProfileId"> & {
  profileId: number | null;
} => {
  const { studentProfileId, mentorProfileId, managerProfileId, ...rest } = row;
  return { ...rest, profileId: resolveProfileId(row) };
};
