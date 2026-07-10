import { useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { notificationsService } from "@/shared/api";
import type { NotificationQuery } from "@repo/schemas";

const notificationsQueryKey = "notifications";

export const notificationsFeedQuery = (query?: NotificationQuery) =>
  ({
    queryKey: [notificationsQueryKey, "feed", query],
    queryFn: () =>
      notificationsService.getFeed(query).then((r) => r.data ?? []),
    staleTime: 1000 * 60 * 2,
  }) satisfies UseQueryOptions;

export const unreadCountQuery = () =>
  ({
    queryKey: [notificationsQueryKey, "unreadCount"],
    queryFn: () =>
      notificationsService
        .getUnreadCount()
        .then((r) => r.data.data ?? { count: 0 }),
    staleTime: 1000 * 30,
  }) satisfies UseQueryOptions;

export const useInvalidateNotifications = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [notificationsQueryKey],
    });
};
