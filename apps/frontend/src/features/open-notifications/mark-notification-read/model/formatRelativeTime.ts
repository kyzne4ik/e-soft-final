const rtf = new Intl.RelativeTimeFormat("ru", { numeric: "auto" });

export function formatRelativeTime(date: Date | string | null): string {
  if (!date) return "";

  const target = typeof date === "string" ? new Date(date) : date;
  const diffSec = Math.round((target.getTime() - Date.now()) / 1000);

  const abs = Math.abs(diffSec);
  if (abs < 60) return rtf.format(diffSec, "second");

  const diffMin = Math.round(diffSec / 60);
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, "minute");

  const diffHour = Math.round(diffMin / 60);
  if (Math.abs(diffHour) < 24) return rtf.format(diffHour, "hour");

  const diffDay = Math.round(diffHour / 24);
  return rtf.format(diffDay, "day");
}
