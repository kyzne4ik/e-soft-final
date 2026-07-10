import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { lmsStreamsService } from "@/shared/api";
import { useInvalidateStreams } from "@/entities/streams/queries";

export function useRevertFinishStream({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateStreams = useInvalidateStreams();

  const { mutate: revertFinishStream, isPending } = useMutation({
    mutationFn: (streamId: number) => lmsStreamsService.revertFinish(streamId),
    async onSuccess(response) {
      invalidateStreams();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { revertFinishStream, isPending };
}
