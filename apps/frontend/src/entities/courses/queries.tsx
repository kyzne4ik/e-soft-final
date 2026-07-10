import { useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import type { PaginationQuery } from "@repo/schemas";
import { lmsCoursesService } from "@/shared/api";

const coursesQueryKey = "courses";

export const coursesQuery = (query?: PaginationQuery) =>
  ({
    queryKey: [coursesQueryKey, "list", query],
    queryFn: () => lmsCoursesService.getAll(query).then((r) => r.data),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const courseByIdQuery = (id: number) =>
  ({
    queryKey: [coursesQueryKey, "byId", id],
    queryFn: () => lmsCoursesService.getById(id).then((r) => r.data ?? null),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const useInvalidateCourses = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [coursesQueryKey],
    });
};
