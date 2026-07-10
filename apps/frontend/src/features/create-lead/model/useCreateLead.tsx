import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { CreateManualLeadPayload } from "@repo/schemas";
import { crmService } from "@/shared/api";
import { useInvalidateLeads } from "@/entities/leads/queries";

export function useCreateLead({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateLeads = useInvalidateLeads();

  const {
    mutate: createLead,
    mutateAsync: createLeadAsync,
    isPending,
  } = useMutation({
    mutationFn: (payload: CreateManualLeadPayload) =>
      crmService.leads.create(payload),
    async onSuccess(response) {
      invalidateLeads();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { createLead, createLeadAsync, isPending };
}
