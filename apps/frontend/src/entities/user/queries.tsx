import { useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { usersService } from "@/shared/api";
import type { UserQuery } from "@repo/schemas";

const userQueryKey = "users";

export const usersQuery = (query?: UserQuery) =>
  ({
    queryKey: [userQueryKey, "list", query],
    queryFn: () => usersService.getAll(query).then((r) => r),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const userByIdQuery = (id: number) =>
  ({
    queryKey: [userQueryKey, "byId", id],
    queryFn: () => usersService.getById(id).then((r) => r.data ?? null),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const useInvalidateUsers = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [userQueryKey],
    });
};
