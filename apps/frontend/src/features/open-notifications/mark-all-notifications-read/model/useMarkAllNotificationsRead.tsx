import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { notificationsService } from "@/shared/api";
import { useInvalidateNotifications } from "@/entities/notifications/queries";

export function useMarkAllNotificationsRead({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateNotifications = useInvalidateNotifications();

  const { mutate: markAllRead, isPending } = useMutation({
    mutationFn: () => notificationsService.markAllRead(),
    async onSuccess(response) {
      invalidateNotifications();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { markAllRead, isPending };
}
