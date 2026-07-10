import { api } from "@/shared/api/apiInstance";
import type {
  UserTelegramResponse,
  UpdateProfilePayload,
  UserResponse,
  ChangePasswordPayload,
  BindTelegramPayload,
  GenerateLinkResponse,
} from "@repo/schemas";
import type { ApiSuccessResponse } from "@/shared/lib/types";

export const profileService = {
  getTelegram: () =>
    api.get<ApiSuccessResponse<UserTelegramResponse>>("/profile/telegram"),

  updateProfile: (payload: UpdateProfilePayload) =>
    api.patch<ApiSuccessResponse<UserResponse>>("/profile", payload),

  changePassword: (payload: ChangePasswordPayload) =>
    api.patch<ApiSuccessResponse<null>>("/profile/password", payload),

  bindTelegram: (payload: BindTelegramPayload) =>
    api.post<ApiSuccessResponse<UserTelegramResponse>>(
      "/profile/telegram",
      payload,
    ),

  unbindTelegram: () =>
    api.delete<ApiSuccessResponse<null>>("/profile/telegram"),

  generateLink: () =>
    api.post<ApiSuccessResponse<GenerateLinkResponse>>(
      "/profile/telegram/link",
    ),
};
