import { api } from "@/shared/api/apiInstance";
import type {
  CourseResponse,
  CreateCoursePayload,
  UpdateCoursePayload,
  PaginationQuery,
} from "@repo/schemas";
import type {
  ApiSuccessResponse,
  ApiPaginatedResponse,
} from "@/shared/lib/types";

export const lmsCoursesService = {
  getAll: (query?: PaginationQuery) =>
    api.get<ApiPaginatedResponse<CourseResponse>>("/lms/courses", {
      params: query,
    }),

  getById: (id: number) =>
    api.get<ApiSuccessResponse<CourseResponse>>(`/lms/courses/${id}`),

  create: (payload: CreateCoursePayload) =>
    api.post<ApiSuccessResponse<CourseResponse>>("/lms/courses", payload),

  update: (id: number, payload: UpdateCoursePayload) =>
    api.patch<ApiSuccessResponse<CourseResponse>>(
      `/lms/courses/${id}`,
      payload,
    ),

  delete: (id: number) =>
    api.delete<ApiSuccessResponse<null>>(`/lms/courses/${id}`),
};
