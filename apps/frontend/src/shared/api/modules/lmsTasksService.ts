import { api } from "@/shared/api/apiInstance";
import type {
  TaskResponse,
  CreateTaskPayload,
  UpdateTaskPayload,
  TaskQuery,
} from "@repo/schemas";
import type {
  ApiSuccessResponse,
  ApiPaginatedResponse,
} from "@/shared/lib/types";

export const lmsTasksService = {
  getAll: (query?: TaskQuery) =>
    api.get<ApiPaginatedResponse<TaskResponse>>("/lms/tasks", {
      params: query,
    }),

  getById: (id: number) =>
    api.get<ApiSuccessResponse<TaskResponse>>(`/lms/tasks/${id}`),

  create: (payload: CreateTaskPayload) =>
    api.post<ApiSuccessResponse<TaskResponse>>("/lms/tasks", payload),

  update: (id: number, payload: UpdateTaskPayload) =>
    api.patch<ApiSuccessResponse<TaskResponse>>(`/lms/tasks/${id}`, payload),

  delete: (id: number) =>
    api.delete<ApiSuccessResponse<null>>(`/lms/tasks/${id}`),
};
