const deadlineFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
});

const reviewTimeFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
});

export const formatDeadline = (value: unknown): string | null =>
  formatDate(value, deadlineFormatter);

export const formatReviewTime = (value: unknown): string | null =>
  formatDate(value, reviewTimeFormatter);

export const prettyLink = (link: string): string =>
  link.replace(/^https?:\/\//, "");

function formatDate(
  value: unknown,
  formatter: Intl.DateTimeFormat,
): string | null {
  if (value == null) return null;
  const date = new Date(value as string);
  return Number.isNaN(date.getTime()) ? null : formatter.format(date);
}
