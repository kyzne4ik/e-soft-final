import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { lmsStreamTelegramService } from "@/shared/api";
import { useInvalidateStreams } from "@/entities/streams/queries";

export function useUnbindStreamTelegram({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateStreams = useInvalidateStreams();

  const { mutate: unbindStreamTelegram, isPending } = useMutation({
    mutationFn: (streamId: number) =>
      lmsStreamTelegramService.unbindTelegram(streamId),
    async onSuccess(response) {
      invalidateStreams();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { unbindStreamTelegram, isPending };
}
