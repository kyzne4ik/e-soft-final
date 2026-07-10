import { api } from "@/shared/api/apiInstance";
import type {
  LessonsResponse,
  CreateLessonPayload,
  UpdateLessonPayload,
  LessonQuery,
} from "@repo/schemas";
import type {
  ApiSuccessResponse,
  ApiPaginatedResponse,
} from "@/shared/lib/types";

export const scheduleService = {
  getAll: (query?: LessonQuery) =>
    api.get<ApiPaginatedResponse<LessonsResponse>>("/schedule", {
      params: query,
    }),

  getById: (id: number) =>
    api.get<ApiSuccessResponse<LessonsResponse>>(`/schedule/${id}`),

  create: (payload: CreateLessonPayload) =>
    api.post<ApiSuccessResponse<LessonsResponse>>("/schedule", payload),

  update: (id: number, payload: UpdateLessonPayload) =>
    api.patch<ApiSuccessResponse<LessonsResponse>>(`/schedule/${id}`, payload),

  delete: (id: number) =>
    api.delete<ApiSuccessResponse<null>>(`/schedule/${id}`),
};
