import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { BindTelegramPayload } from "@repo/schemas";
import { profileService } from "@/shared/api";
import { useInvalidateProfile } from "@/entities/profile/queries";

export function useBindTelegram({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateProfile = useInvalidateProfile();

  const { mutate: bindTelegram, isPending } = useMutation({
    mutationFn: (payload: BindTelegramPayload) =>
      profileService.bindTelegram(payload),
    async onSuccess(response) {
      invalidateProfile();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { bindTelegram, isPending };
}
