import { api } from "@/shared/api/apiInstance";
import type {
  StreamStudentWithUserResponse,
  AddStreamStudentPayload,
  ChangeStreamStudentMentorPayload,
  UpdateStreamStudentStatusPayload,
  StreamStudentQuery,
} from "@repo/schemas";
import type {
  ApiSuccessResponse,
  ApiPaginatedResponse,
} from "@/shared/lib/types";

export const lmsStreamStudentsService = {
  getStudents: (streamId: number, query?: StreamStudentQuery) =>
    api.get<ApiPaginatedResponse<StreamStudentWithUserResponse>>(
      `/lms/streams/${streamId}/students`,
      { params: query },
    ),

  addStudent: (streamId: number, payload: AddStreamStudentPayload) =>
    api.post<ApiSuccessResponse<StreamStudentWithUserResponse>>(
      `/lms/streams/${streamId}/students`,
      payload,
    ),

  changeMentor: (
    streamId: number,
    studentId: number,
    payload: ChangeStreamStudentMentorPayload,
  ) =>
    api.patch<ApiSuccessResponse<StreamStudentWithUserResponse>>(
      `/lms/streams/${streamId}/students/${studentId}/mentor`,
      payload,
    ),

  updateStatus: (
    streamId: number,
    studentId: number,
    payload: UpdateStreamStudentStatusPayload,
  ) =>
    api.patch<ApiSuccessResponse<StreamStudentWithUserResponse>>(
      `/lms/streams/${streamId}/students/${studentId}/status`,
      payload,
    ),

  deleteStudent: (streamId: number, studentId: number) =>
    api.delete<ApiSuccessResponse<null>>(
      `/lms/streams/${streamId}/students/${studentId}`,
    ),
};
