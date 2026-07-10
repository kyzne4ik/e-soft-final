import type { MentorJournalRow } from "@repo/schemas";
import css from "../MentorGradebookPage.module.css";

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatDate(value: Date | string | null | undefined): string {
  if (!value) return "—";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? "—" : dateFormatter.format(d);
}

export function calcProgress(submitted: number, total: number): number {
  return total > 0 ? Math.round((submitted / total) * 100) : 0;
}

export const STATUS_LABEL: Record<MentorJournalRow["studentStatus"], string> = {
  ACTIVE: "Активен",
  GRADUATED: "Завершил",
  EXPELLED: "Отчислен",
};

export const STATUS_CLASS: Record<MentorJournalRow["studentStatus"], string> = {
  ACTIVE: css.status_active,
  GRADUATED: css.status_graduated,
  EXPELLED: css.status_expelled,
};
