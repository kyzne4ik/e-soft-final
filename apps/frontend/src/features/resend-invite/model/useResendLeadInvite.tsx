import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { InviteStorePayload } from "@repo/schemas";
import { authService } from "@/shared/api";
import { useInvalidateLeads } from "@/entities/leads";

export function useResendLeadInvite({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateLeads = useInvalidateLeads();

  const { mutate: resendInvite, isPending } = useMutation({
    mutationFn: (payload: InviteStorePayload) => authService.invite(payload),
    async onSuccess(response) {
      invalidateLeads();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { resendInvite, isPending };
}
