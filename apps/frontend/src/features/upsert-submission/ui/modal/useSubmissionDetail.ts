import type { TaskResponse, StudentReviewResponse } from "@repo/schemas";
import { useQuery } from "@tanstack/react-query";
import { studentSubmissionByTaskQuery } from "@/entities/submissions";

export type SubmissionStatus =
  "NEW" | "REVIEWING" | "CHANGES_REQUESTED" | "ACCEPTED" | "RESUBMITTED";

const deadlineFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
});

export const reviewTimeFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
});

export const formatDate = (
  value: unknown,
  formatter: Intl.DateTimeFormat,
): string | null => {
  if (value == null) return null;
  const date = new Date(value as string);
  return Number.isNaN(date.getTime()) ? null : formatter.format(date);
};

export const hoursUntil = (deadline: Date): number =>
  Math.max(0, (deadline.getTime() - Date.now()) / 3600_000);

export function useSubmissionDetail(task: TaskResponse, isOpen: boolean) {
  const { data, isLoading } = useQuery({
    ...studentSubmissionByTaskQuery(task.id),
    enabled: isOpen,
  });

  const detail = data?.data;

  const submission = detail?.submission ?? null;

  const reviews = (detail?.reviews ?? []) as StudentReviewResponse[];

  const status = submission?.status as SubmissionStatus | null;

  const isAccepted = status === "ACCEPTED";

  const canSubmit =
    !isLoading &&
    (!submission || status === "CHANGES_REQUESTED" || status === "RESUBMITTED");

  const hours = hoursUntil(new Date(task.deadline));

  const submitLabel =
    status === "CHANGES_REQUESTED" || status === "RESUBMITTED"
      ? "На перепроверку"
      : "Отправить решение";

  const deadlineStr = formatDate(task.deadline, deadlineFormatter);

  const sub = deadlineStr ? `Дедлайн ${deadlineStr} · 23:59 МСК` : undefined;

  return {
    submission,
    reviews,
    status,
    isAccepted,
    canSubmit,
    hours,
    submitLabel,
    sub,
    isLoading,
  };
}
