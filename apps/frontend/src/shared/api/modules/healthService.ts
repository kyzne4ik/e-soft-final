import { api } from "@/shared/api/apiInstance";
import type { HealthResponse } from "@repo/schemas";
import type { ApiSuccessResponse } from "@/shared/lib/types";

export const healthService = {
  check: () => api.get<ApiSuccessResponse<HealthResponse>>("/health"),
};
