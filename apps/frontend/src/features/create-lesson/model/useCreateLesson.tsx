import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { CreateLessonPayload } from "@repo/schemas";
import { scheduleService } from "@/shared/api";
import { useInvalidateSchedule } from "@/entities/schedule/queries";

export function useCreateLesson({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateSchedule = useInvalidateSchedule();

  const { mutateAsync: createLesson, isPending } = useMutation({
    mutationFn: (payload: CreateLessonPayload) =>
      scheduleService.create(payload),
    async onSuccess(response) {
      invalidateSchedule();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { createLesson, isPending };
}
