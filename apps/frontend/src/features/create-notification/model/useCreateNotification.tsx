import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { CreateNotificationPayload } from "@repo/schemas";
import { notificationsService } from "@/shared/api";
import { useInvalidateNotifications } from "@/entities/notifications/queries";

export function useCreateNotification({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateNotifications = useInvalidateNotifications();

  const { mutateAsync: createNotificationAsync, isPending } = useMutation({
    mutationFn: (payload: CreateNotificationPayload) =>
      notificationsService.create(payload),
    async onSuccess(response) {
      invalidateNotifications();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { createNotificationAsync, isPending };
}
