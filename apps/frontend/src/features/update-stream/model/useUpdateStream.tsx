import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { UpdateStreamPayload } from "@repo/schemas";
import { lmsStreamsService } from "@/shared/api";
import { useInvalidateStreams } from "@/entities/streams/queries";

export function useUpdateStream(
  streamId: number,
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
  const invalidateStreams = useInvalidateStreams();

  const {
    mutate: updateStream,
    mutateAsync: updateStreamAsync,
    isPending,
  } = useMutation({
    mutationFn: (payload: UpdateStreamPayload) =>
      lmsStreamsService.update(streamId, payload),
    async onSuccess(response) {
      invalidateStreams();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { updateStream, updateStreamAsync, isPending };
}
