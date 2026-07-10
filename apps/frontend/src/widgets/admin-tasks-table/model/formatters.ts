export function formatDeadline(
  value: Date | string | null | undefined,
): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function isOverdue(value: Date | string | null | undefined): boolean {
  if (!value) return false;
  return new Date(value) < new Date();
}

export function cleanRepoUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}
