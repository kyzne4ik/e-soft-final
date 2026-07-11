import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { notificationsService } from "@/shared/api";
import { useInvalidateNotifications } from "@/entities/notifications/queries";

export function useMarkNotificationRead({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateNotifications = useInvalidateNotifications();

  const { mutate: markRead, isPending } = useMutation({
    mutationFn: (notificationId: number) =>
      notificationsService.markRead(notificationId),
    async onSuccess(response) {
      invalidateNotifications();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { markRead, isPending };
}
