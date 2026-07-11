import type { StudentStatus } from "@repo/schemas";

export const STUDENT_STATUS_LABELS: Record<StudentStatus, string> = {
  ACTIVE: "Обучается",
  GRADUATED: "Выпущен",
  EXPELLED: "Отчислен",
};

export const STUDENT_STATUS_OPTIONS = (
  Object.keys(STUDENT_STATUS_LABELS) as StudentStatus[]
).map((value) => ({ value, label: STUDENT_STATUS_LABELS[value] }));
