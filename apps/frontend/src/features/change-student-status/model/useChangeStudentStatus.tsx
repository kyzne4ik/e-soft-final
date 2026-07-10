import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { StudentStatus } from "@repo/schemas";
import { lmsStreamStudentsService } from "@/shared/api";
import { useInvalidateStreams } from "@/entities/streams/queries";

export function useChangeStudentStatus({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateStreams = useInvalidateStreams();

  const { mutate: changeStatus, isPending } = useMutation({
    mutationFn: (payload: {
      streamId: number;
      studentId: number;
      status: StudentStatus;
    }) =>
      lmsStreamStudentsService.updateStatus(
        payload.streamId,
        payload.studentId,
        {
          status: payload.status,
        },
      ),
    async onSuccess(response) {
      invalidateStreams();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { changeStatus, isPending };
}
