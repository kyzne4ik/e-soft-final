import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { profileService } from "@/shared/api";

export function useGenerateTelegramLink({
  onError,
}: {
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
} = {}) {
  const mutation = useMutation({
    mutationFn: () => profileService.generateLink(),
    onError,
  });

  const link = mutation.data?.data.data.link ?? null;

  return {
    generateLink: mutation.mutate,
    isPending: mutation.isPending,
    link,
  };
}
