import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { lmsStreamMentorsService } from "@/shared/api";
import { useInvalidateStreams } from "@/entities/streams/queries";

export function useAddMentor({
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
    mutate: addMentor,
    mutateAsync: addMentorAsync,
    isPending,
  } = useMutation({
    mutationFn: (payload: { streamId: number; mentorId: number }) =>
      lmsStreamMentorsService.addMentor(payload.streamId, {
        mentorId: payload.mentorId,
      }),
    async onSuccess(response) {
      invalidateStreams();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { addMentor, addMentorAsync, isPending };
}
