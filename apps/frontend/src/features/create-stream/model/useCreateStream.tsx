import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { CreateStreamPayload } from "@repo/schemas";
import { lmsStreamsService } from "@/shared/api";
import { useInvalidateStreams } from "@/entities/streams/queries";

export function useCreateStream({
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
    mutate: createStream,
    mutateAsync: createStreamAsync,
    isPending,
  } = useMutation({
    mutationFn: (payload: CreateStreamPayload) =>
      lmsStreamsService.create(payload),
    async onSuccess(response) {
      invalidateStreams();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { createStream, createStreamAsync, isPending };
}
