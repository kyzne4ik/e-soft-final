import { useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { lmsTasksService } from "@/shared/api";
import type { TaskQuery } from "@repo/schemas";

const tasksQueryKey = "tasks";

export const tasksQuery = (query?: TaskQuery) =>
  ({
    queryKey: [tasksQueryKey, "list", query],
    queryFn: () => lmsTasksService.getAll(query).then((r) => r),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const taskByIdQuery = (id: number) =>
  ({
    queryKey: [tasksQueryKey, "byId", id],
    queryFn: () => lmsTasksService.getById(id).then((r) => r.data ?? null),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const useInvalidateTasks = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [tasksQueryKey],
    });
};
