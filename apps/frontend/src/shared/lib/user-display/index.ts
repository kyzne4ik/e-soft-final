export interface NamedUser {
  firstName: string | null;
  lastName: string | null;
  email?: string | null;
}

const AVATAR_COLORS = [
  "#3b82f6",
  "#ec4899",
  "#f97316",
  "#8b5cf6",
  "#22c55e",
  "#6366f1",
  "#14b8a6",
  "#ef4444",
];

export const fullName = (user: NamedUser): string =>
  [user.firstName, user.lastName].filter(Boolean).join(" ") ||
  user.email ||
  "—";

export const initials = (user: NamedUser): string =>
  `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() ||
  user.email?.[0]?.toUpperCase() ||
  "?";

export const avatarColor = (id: number): string =>
  AVATAR_COLORS[Math.abs(id) % AVATAR_COLORS.length];
