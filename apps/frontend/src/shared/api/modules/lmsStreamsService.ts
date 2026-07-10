import { api } from "@/shared/api/apiInstance";
import type {
  StreamResponse,
  CreateStreamPayload,
  UpdateStreamPayload,
  StreamQuery,
  FinishStreamAndGraduateStudentsResponse,
  RevertStreamFinishResponse,
} from "@repo/schemas";
import type {
  ApiSuccessResponse,
  ApiPaginatedResponse,
} from "@/shared/lib/types";

export const lmsStreamsService = {
  getAll: (query?: StreamQuery) =>
    api.get<ApiPaginatedResponse<StreamResponse>>("/lms/streams", {
      params: query,
    }),

  getById: (id: number) =>
    api.get<ApiSuccessResponse<StreamResponse>>(`/lms/streams/${id}`),

  getMyStudent: () =>
    api.get<ApiSuccessResponse<StreamResponse[]>>("/lms/streams/my/student"),

  getMyMentor: () =>
    api.get<ApiSuccessResponse<StreamResponse[]>>("/lms/streams/my/mentor"),

  create: (payload: CreateStreamPayload) =>
    api.post<ApiSuccessResponse<StreamResponse>>("/lms/streams", payload),

  update: (id: number, payload: UpdateStreamPayload) =>
    api.patch<ApiSuccessResponse<StreamResponse>>(
      `/lms/streams/${id}`,
      payload,
    ),

  delete: (id: number) =>
    api.delete<ApiSuccessResponse<null>>(`/lms/streams/${id}`),

  start: (id: number) =>
    api.post<ApiSuccessResponse<StreamResponse>>(`/lms/streams/${id}/start`),

  finish: (id: number) =>
    api.post<ApiSuccessResponse<FinishStreamAndGraduateStudentsResponse>>(
      `/lms/streams/${id}/finish`,
    ),

  revertFinish: (id: number) =>
    api.post<ApiSuccessResponse<RevertStreamFinishResponse>>(
      `/lms/streams/${id}/revert-finish`,
    ),
};
