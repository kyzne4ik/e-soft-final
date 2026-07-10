import type { Role } from "@repo/schemas";

export const ROLE_LABEL: Record<Role, string> = {
  STUDENT: "Студент",
  MENTOR: "Ментор",
  MANAGER: "Менеджер",
  ADMIN: "Админ",
};

export const AVATAR_COLORS = [
  "#3b82f6",
  "#ec4899",
  "#f97316",
  "#8b5cf6",
  "#22c55e",
  "#6366f1",
  "#14b8a6",
  "#ef4444",
];

export const initialsOf = (firstName: string, lastName: string): string =>
  `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();

export const avatarColorById = (id: number): string =>
  AVATAR_COLORS[id % AVATAR_COLORS.length];
