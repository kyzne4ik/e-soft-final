import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { InviteStorePayload } from "@repo/schemas";
import { authService } from "@/shared/api";
import { useInvalidateUsers } from "@/entities/user/queries";

export function useCreateInvite({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateUsers = useInvalidateUsers();

  const {
    mutate: createInvite,
    mutateAsync: createInviteAsync,
    isPending,
  } = useMutation({
    mutationFn: (payload: InviteStorePayload) => authService.invite(payload),
    async onSuccess(response) {
      invalidateUsers();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { createInvite, createInviteAsync, isPending };
}
