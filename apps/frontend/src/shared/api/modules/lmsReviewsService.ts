import { api } from "@/shared/api/apiInstance";
import type {
  ReviewResponse,
  CreateReviewPayload,
  UpdateReviewPayload,
} from "@repo/schemas";
import type { ApiSuccessResponse } from "@/shared/lib/types";

export const lmsReviewsService = {
  create: (submissionId: number, payload: CreateReviewPayload) =>
    api.post<ApiSuccessResponse<ReviewResponse>>(
      `/lms/submissions/${submissionId}/reviews`,
      payload,
    ),

  update: (
    submissionId: number,
    reviewId: number,
    payload: UpdateReviewPayload,
  ) =>
    api.patch<ApiSuccessResponse<ReviewResponse>>(
      `/lms/submissions/${submissionId}/reviews/${reviewId}`,
      payload,
    ),
};
