import { useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { profileService } from "@/shared/api";

const profileQueryKey = "profile";

export const telegramQuery = () =>
  ({
    queryKey: [profileQueryKey, "telegram"],
    queryFn: () => profileService.getTelegram().then((r) => r.data ?? null),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const useInvalidateProfile = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [profileQueryKey],
    });
};
