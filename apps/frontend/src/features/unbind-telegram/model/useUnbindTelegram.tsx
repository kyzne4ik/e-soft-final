import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { profileService } from "@/shared/api";
import { useInvalidateProfile } from "@/entities/profile/queries";

export function useUnbindTelegram({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateProfile = useInvalidateProfile();

  const { mutate: unbindTelegram, isPending } = useMutation({
    mutationFn: () => profileService.unbindTelegram(),
    async onSuccess(response) {
      invalidateProfile();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { unbindTelegram, isPending };
}
