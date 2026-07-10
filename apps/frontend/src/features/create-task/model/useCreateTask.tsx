import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { CreateTaskPayload } from "@repo/schemas";
import { lmsTasksService } from "@/shared/api";
import { useInvalidateTasks } from "@/entities/tasks/queries";

export function useCreateTask({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateTasks = useInvalidateTasks();

  const { mutateAsync: createTask, isPending } = useMutation({
    mutationFn: (payload: CreateTaskPayload) => lmsTasksService.create(payload),
    async onSuccess(response) {
      invalidateTasks();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { createTask, isPending };
}
