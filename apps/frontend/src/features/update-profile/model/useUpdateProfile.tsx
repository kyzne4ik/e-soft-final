import { profileService } from "@/shared/api";
import type { UpdateProfilePayload } from "@repo/schemas";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { useInvalidateProfile } from "@/entities/profile/queries";
import { useInvalidateAuth } from "@/entities/auth";

export function useUpdateProfile({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateProfile = useInvalidateProfile();
  const invalidateAuth = useInvalidateAuth();

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: (payload: UpdateProfilePayload) =>
      profileService.updateProfile(payload),
    async onSuccess(response) {
      invalidateProfile();
      invalidateAuth();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { updateProfile, isPending };
}
