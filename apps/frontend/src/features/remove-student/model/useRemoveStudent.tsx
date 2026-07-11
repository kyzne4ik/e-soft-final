import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { lmsStreamStudentsService } from "@/shared/api";
import { useInvalidateStreams } from "@/entities/streams/queries";

export function useRemoveStudent({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateStreams = useInvalidateStreams();

  const { mutate: removeStudent, isPending } = useMutation({
    mutationFn: (payload: { streamId: number; studentId: number }) =>
      lmsStreamStudentsService.deleteStudent(
        payload.streamId,
        payload.studentId,
      ),
    async onSuccess(response) {
      invalidateStreams();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { removeStudent, isPending };
}
