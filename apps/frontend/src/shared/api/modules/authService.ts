import { api } from "@/shared/api/apiInstance";
import type {
  LoginPayload,
  AuthTokenResponse,
  ActivatePayload,
  InviteStorePayload,
  InviteResponse,
  UserResponse,
  LogoutPayload,
} from "@repo/schemas";
import type { ApiSuccessResponse } from "@/shared/lib/types";

export const authService = {
  login: (payload: LoginPayload) =>
    api.post<ApiSuccessResponse<AuthTokenResponse>>("/auth/login", payload),

  refresh: (payload: LogoutPayload) =>
    api.post<ApiSuccessResponse<AuthTokenResponse>>("/auth/refresh", payload),

  activate: (payload: ActivatePayload) =>
    api.post<ApiSuccessResponse<AuthTokenResponse>>("/auth/activate", payload),

  confirmEnrollment: (token: string) =>
    api.post<ApiSuccessResponse<AuthTokenResponse>>(
      "/auth/confirm-enrollment",
      { token },
    ),

  invite: (payload: InviteStorePayload) =>
    api.post<ApiSuccessResponse<InviteResponse>>("/auth/invite", payload),

  me: () => api.get<ApiSuccessResponse<UserResponse>>("/auth/me"),
};
