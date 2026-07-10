import { api } from "@/shared/api/apiInstance";
import type {
  UserResponse,
  CreateUserPayload,
  UpdateUserPayload,
  UserQuery,
} from "@repo/schemas";
import type {
  ApiSuccessResponse,
  ApiPaginatedResponse,
} from "@/shared/lib/types";

export const usersService = {
  getAll: (query?: UserQuery) =>
    api.get<ApiPaginatedResponse<UserResponse>>("/users", { params: query }),

  getById: (id: number) =>
    api.get<ApiSuccessResponse<UserResponse>>(`/users/${id}`),

  create: (payload: CreateUserPayload) =>
    api.post<ApiSuccessResponse<UserResponse>>("/users", payload),

  update: (id: number, payload: UpdateUserPayload) =>
    api.patch<ApiSuccessResponse<UserResponse>>(`/users/${id}`, payload),

  delete: (id: number) => api.delete<ApiSuccessResponse<null>>(`/users/${id}`),
};
