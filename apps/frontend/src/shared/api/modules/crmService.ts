import { api } from "@/shared/api/apiInstance";
import type {
  LeadResponse,
  CreateManualLeadPayload,
  UpdateLeadStatusPayload,
  LeadQuery,
  LeadStatusResponse,
  OpenIntakePayload,
  OpenIntakeResponse,
} from "@repo/schemas";
import type {
  ApiSuccessResponse,
  ApiPaginatedResponse,
} from "@/shared/lib/types";

export const crmService = {
  leads: {
    getAll: (query?: LeadQuery) =>
      api.get<ApiPaginatedResponse<LeadResponse>>("/crm/leads", {
        params: query,
      }),

    getById: (id: number) =>
      api.get<ApiSuccessResponse<LeadResponse>>(`/crm/leads/${id}`),

    create: (payload: CreateManualLeadPayload) =>
      api.post<ApiSuccessResponse<LeadResponse>>("/crm/leads", payload),

    updateStatus: (id: number, payload: UpdateLeadStatusPayload) =>
      api.patch<ApiSuccessResponse<LeadStatusResponse>>(
        `/crm/leads/${id}/status`,
        payload,
      ),
  },

  intake: {
    open: (payload: OpenIntakePayload) =>
      api.post<ApiSuccessResponse<OpenIntakeResponse>>(
        "/crm/intake/open",
        payload,
      ),
  },
};
