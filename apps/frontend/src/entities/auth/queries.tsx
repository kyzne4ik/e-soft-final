import { useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { authService } from "@/shared/api";

const authQueryKey = "auth";

export const meQuery = () =>
  ({
    queryKey: [authQueryKey, "me"],
    queryFn: () => authService.me().then((r) => r.data ?? null),
    retry: false,
  }) satisfies UseQueryOptions;

export const useInvalidateAuth = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.refetchQueries({
      queryKey: [authQueryKey],
    });
};
