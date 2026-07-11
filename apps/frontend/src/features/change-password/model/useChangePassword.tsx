import { profileService } from "@/shared/api";
import type { ChangePasswordPayload } from "@repo/schemas";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { useInvalidateProfile } from "@/entities/profile/queries";

export function useChangePassword({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateProfile = useInvalidateProfile();

  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      profileService.changePassword(payload),
    async onSuccess(response) {
      invalidateProfile();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { changePassword, isPending };
}
