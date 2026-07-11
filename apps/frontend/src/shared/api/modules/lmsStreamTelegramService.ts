import { api } from "@/shared/api/apiInstance";
import type {
  StreamTelegramResponse,
  BindStreamTelegramPayload,
} from "@repo/schemas";
import type { ApiSuccessResponse } from "@/shared/lib/types";

export const lmsStreamTelegramService = {
  getTelegram: (streamId: number) =>
    api.get<ApiSuccessResponse<StreamTelegramResponse>>(
      `/lms/streams/${streamId}/telegram`,
    ),

  bindTelegram: (streamId: number, payload: BindStreamTelegramPayload) =>
    api.post<ApiSuccessResponse<StreamTelegramResponse>>(
      `/lms/streams/${streamId}/telegram`,
      payload,
    ),

  unbindTelegram: (streamId: number) =>
    api.delete<ApiSuccessResponse<null>>(`/lms/streams/${streamId}/telegram`),
};
