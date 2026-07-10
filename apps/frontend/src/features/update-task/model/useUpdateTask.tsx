import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { UpdateTaskPayload } from "@repo/schemas";
import { lmsTasksService } from "@/shared/api";
import { useInvalidateTasks } from "@/entities/tasks/queries";

export function useUpdateTask(
  taskId: number,
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
  const invalidateTasks = useInvalidateTasks();

  const { mutateAsync: updateTask, isPending } = useMutation({
    mutationFn: (payload: UpdateTaskPayload) =>
      lmsTasksService.update(taskId, payload),
    async onSuccess(response) {
      invalidateTasks();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { updateTask, isPending };
}
