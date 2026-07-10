import { api } from "@/shared/api/apiInstance";
import type {
  NotificationResponse,
  CreateNotificationPayload,
  NotificationQuery,
  UnreadCountResponse,
} from "@repo/schemas";
import type {
  ApiSuccessResponse,
  ApiPaginatedResponse,
} from "@/shared/lib/types";

export const notificationsService = {
  getFeed: (query?: NotificationQuery) =>
    api.get<ApiPaginatedResponse<NotificationResponse>>("/notifications", {
      params: query,
    }),

  getUnreadCount: () =>
    api.get<ApiSuccessResponse<UnreadCountResponse>>(
      "/notifications/unread-count",
    ),

  create: (payload: CreateNotificationPayload) =>
    api.post<ApiSuccessResponse<NotificationResponse>>(
      "/notifications",
      payload,
    ),

  markAllRead: () =>
    api.patch<ApiSuccessResponse<number>>("/notifications/read-all"),

  markRead: (id: number) =>
    api.patch<ApiSuccessResponse<NotificationResponse>>(
      `/notifications/${id}/read`,
    ),
};
