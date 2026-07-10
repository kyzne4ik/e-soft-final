import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { LeadStatus } from "@repo/schemas";
import { crmService } from "@/shared/api";
import { useInvalidateLeads } from "@/entities/leads/queries";

export function useUpdateLeadStatus({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateLeads = useInvalidateLeads();

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: (payload: { leadId: number; status: LeadStatus }) =>
      crmService.leads.updateStatus(payload.leadId, { status: payload.status }),
    async onSuccess(response) {
      invalidateLeads();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { updateStatus, isPending };
}
