import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { scheduleService } from "@/shared/api";
import { useInvalidateSchedule } from "@/entities/schedule/queries";

export function useDeleteLesson({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateSchedule = useInvalidateSchedule();

  const { mutate: deleteLesson, isPending } = useMutation({
    mutationFn: (lessonId: number) => scheduleService.delete(lessonId),
    async onSuccess(response) {
      invalidateSchedule();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { deleteLesson, isPending };
}
