import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { UpdateLessonPayload } from "@repo/schemas";
import { scheduleService } from "@/shared/api";
import { useInvalidateSchedule } from "@/entities/schedule/queries";

export function useUpdateLesson(
  lessonId: number,
  {
    onSuccess,
    onError,
    onSettled,
  }: {
    onSuccess?: (data: AxiosResponse) => void;
    onError?: (error: AxiosError<ApiErrorResponse>) => void;
    onSettled?: () => void;
  } = {},
) {
  const invalidateSchedule = useInvalidateSchedule();

  const { mutateAsync: updateLesson, isPending } = useMutation({
    mutationFn: (payload: UpdateLessonPayload) =>
      scheduleService.update(lessonId, payload),
    async onSuccess(response) {
      invalidateSchedule();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { updateLesson, isPending };
}
