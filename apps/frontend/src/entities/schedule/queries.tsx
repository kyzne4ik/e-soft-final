import { useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { scheduleService } from "@/shared/api";
import type { LessonQuery } from "@repo/schemas";

const scheduleQueryKey = "schedule";

export const lessonsQuery = (query?: LessonQuery) =>
  ({
    queryKey: [scheduleQueryKey, "list", query],
    queryFn: () => scheduleService.getAll(query).then((r) => r.data ?? []),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const lessonByIdQuery = (id: number) =>
  ({
    queryKey: [scheduleQueryKey, "byId", id],
    queryFn: () => scheduleService.getById(id).then((r) => r.data ?? null),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const useInvalidateSchedule = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [scheduleQueryKey],
    });
};
