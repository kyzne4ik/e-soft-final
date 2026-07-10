import type { PersonInfo } from "./types";

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

export const personColor = (id: number) =>
  AVATAR_COLORS[id % AVATAR_COLORS.length];

export const initialsOf = (
  first?: string | null,
  last?: string | null,
): string => `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase() || "?";

export const fullName = (first?: string | null, last?: string | null): string =>
  [first, last].filter(Boolean).join(" ").trim();

export const toPerson = (
  id: number,
  first?: string | null,
  last?: string | null,
): PersonInfo => ({
  name: fullName(first, last) || `#${id}`,
  initials: initialsOf(first, last),
  color: personColor(id),
});
