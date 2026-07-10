import { api } from "@/shared/api/apiInstance";
import type {
  StreamMentorWithUserResponse,
  AddStreamMentorPayload,
  StreamMentorQuery,
} from "@repo/schemas";
import type {
  ApiSuccessResponse,
  ApiPaginatedResponse,
} from "@/shared/lib/types";

export const lmsStreamMentorsService = {
  getMentors: (streamId: number, query?: StreamMentorQuery) =>
    api.get<ApiPaginatedResponse<StreamMentorWithUserResponse>>(
      `/lms/streams/${streamId}/mentors`,
      { params: query },
    ),

  addMentor: (streamId: number, payload: AddStreamMentorPayload) =>
    api.post<ApiSuccessResponse<StreamMentorWithUserResponse>>(
      `/lms/streams/${streamId}/mentors`,
      payload,
    ),

  deleteMentor: (streamId: number, mentorId: number) =>
    api.delete<ApiSuccessResponse<null>>(
      `/lms/streams/${streamId}/mentors/${mentorId}`,
    ),
};
