import type { LeadResponse } from "@repo/schemas";

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
});

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

export const leadAvatarColor = (id: number): string =>
  AVATAR_COLORS[id % AVATAR_COLORS.length];

export const leadFullName = (lead: LeadResponse): string =>
  [lead.firstName, lead.patronymic, lead.lastName].filter(Boolean).join(" ");

export const leadInitials = (lead: LeadResponse): string =>
  `${lead.firstName[0] ?? ""}${lead.lastName[0] ?? ""}`.toUpperCase();

export const leadSub = (lead: LeadResponse): string =>
  `Заявка от ${dateFormatter.format(new Date(lead.createdAt))}`;
