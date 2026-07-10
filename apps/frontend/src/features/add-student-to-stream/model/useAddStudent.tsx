import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { lmsStreamStudentsService } from "@/shared/api";
import { useInvalidateStreams } from "@/entities/streams/queries";

export function useAddStudent({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateStreams = useInvalidateStreams();

  const {
    mutate: addStudent,
    mutateAsync: addStudentAsync,
    isPending,
  } = useMutation({
    mutationFn: (payload: {
      streamId: number;
      studentId: number;
      mentorId: number;
    }) =>
      lmsStreamStudentsService.addStudent(payload.streamId, {
        studentId: payload.studentId,
        mentorId: payload.mentorId,
      }),
    async onSuccess(response) {
      invalidateStreams();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { addStudent, addStudentAsync, isPending };
}
