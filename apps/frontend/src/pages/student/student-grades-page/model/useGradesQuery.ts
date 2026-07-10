import { useQuery } from "@tanstack/react-query";
import type { StudentPerformanceResponse } from "@repo/schemas";
import { studentPerformanceQuery } from "@/entities/submissions";

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

export function useGradesQuery(streamId: number) {
  const { data, isLoading } = useQuery({
    ...studentPerformanceQuery(streamId),
    throwOnError: true,
  });

  const perf =
    (data as { data?: StudentPerformanceResponse } | undefined)?.data ??
    (data as StudentPerformanceResponse | null | undefined) ??
    null;

  return { rows: perf?.rows ?? [], avg: perf?.averageScore, isLoading };
}
