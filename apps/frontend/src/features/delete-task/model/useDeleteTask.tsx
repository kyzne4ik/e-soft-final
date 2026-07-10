import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { lmsTasksService } from "@/shared/api";
import { useInvalidateTasks } from "@/entities/tasks/queries";

export function useDeleteTask({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateTasks = useInvalidateTasks();

  const { mutate: deleteTask, isPending } = useMutation({
    mutationFn: (taskId: number) => lmsTasksService.delete(taskId),
    async onSuccess(response) {
      invalidateTasks();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { deleteTask, isPending };
}
