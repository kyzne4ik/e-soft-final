import { api } from "@/shared/api/apiInstance";
import type {
  SubmissionResponse,
  CreateSubmissionPayload,
  UpdateSubmissionPayload,
  SwitchSubmissionStatusPayload,
  SubmissionMentorQuery,
  StudentPerformanceResponse,
  SubmissionReviewResponse,
  MentorSubmissionResponse,
  MentorSubmissionDetail,
  MentorJournalResponse,
} from "@repo/schemas";
import type {
  ApiSuccessResponse,
  ApiPaginatedResponse,
} from "@/shared/lib/types";

export const lmsSubmissionsService = {
  create: (payload: CreateSubmissionPayload) =>
    api.post<ApiSuccessResponse<SubmissionResponse>>(
      "/lms/submissions",
      payload,
    ),

  updateOwn: (id: number, payload: UpdateSubmissionPayload) =>
    api.patch<ApiSuccessResponse<SubmissionResponse>>(
      `/lms/submissions/${id}`,
      payload,
    ),

  getStudentPerformance: (streamId: number) =>
    api.get<ApiSuccessResponse<StudentPerformanceResponse>>(
      `/lms/submissions/performance/${streamId}`,
    ),

  getStudentSubmissionByTask: (taskId: number) =>
    api.get<ApiSuccessResponse<SubmissionReviewResponse>>(
      `/lms/submissions/task/${taskId}`,
    ),

  getMentorJournal: (streamId: number) =>
    api.get<ApiSuccessResponse<MentorJournalResponse>>(
      "/lms/submissions/mentor/journal",
      {
        params: { streamId },
      },
    ),

  getMentorSubmissions: (query?: SubmissionMentorQuery) =>
    api.get<ApiPaginatedResponse<MentorSubmissionResponse>>(
      "/lms/submissions/mentor",
      { params: query },
    ),

  getMentorSubmissionById: (id: number) =>
    api.get<ApiSuccessResponse<MentorSubmissionDetail>>(
      `/lms/submissions/mentor/${id}`,
    ),

  switchStatus: (id: number, payload: SwitchSubmissionStatusPayload) =>
    api.patch<ApiSuccessResponse<SubmissionResponse>>(
      `/lms/submissions/${id}/status`,
      payload,
    ),

  getById: (id: number) =>
    api.get<ApiSuccessResponse<SubmissionResponse>>(`/lms/submissions/${id}`),
};
