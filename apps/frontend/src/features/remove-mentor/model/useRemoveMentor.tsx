import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { lmsStreamMentorsService } from "@/shared/api";
import { useInvalidateStreams } from "@/entities/streams/queries";

export function useRemoveMentor({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateStreams = useInvalidateStreams();

  const { mutate: removeMentor, isPending } = useMutation({
    mutationFn: (payload: { streamId: number; mentorId: number }) =>
      lmsStreamMentorsService.deleteMentor(payload.streamId, payload.mentorId),
    async onSuccess(response) {
      invalidateStreams();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { removeMentor, isPending };
}
