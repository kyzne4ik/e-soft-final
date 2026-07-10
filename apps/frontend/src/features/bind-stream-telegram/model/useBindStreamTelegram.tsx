import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { BindStreamTelegramPayload } from "@repo/schemas";
import { lmsStreamTelegramService } from "@/shared/api";
import { useInvalidateStreams } from "@/entities/streams/queries";

export function useBindStreamTelegram({
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
    mutate: bindStreamTelegram,
    mutateAsync: bindStreamTelegramAsync,
    isPending,
  } = useMutation({
    mutationFn: (payload: { streamId: number } & BindStreamTelegramPayload) =>
      lmsStreamTelegramService.bindTelegram(payload.streamId, {
        chatId: payload.chatId,
        announceThreadId: payload.announceThreadId,
      }),
    async onSuccess(response) {
      invalidateStreams();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { bindStreamTelegram, bindStreamTelegramAsync, isPending };
}
