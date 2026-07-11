import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { lmsStreamsService } from "@/shared/api";
import { useInvalidateStreamList } from "@/entities/streams/queries";

export function useDeleteStream({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateStreamList = useInvalidateStreamList();

  const { mutate: deleteStream, isPending } = useMutation({
    mutationFn: (streamId: number) => lmsStreamsService.delete(streamId),
    async onSuccess(response) {
      invalidateStreamList();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { deleteStream, isPending };
}
