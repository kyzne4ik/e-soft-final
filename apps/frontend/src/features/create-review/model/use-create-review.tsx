import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { CreateReviewPayload } from "@repo/schemas";
import { lmsReviewsService } from "@/shared/api";
import { useInvalidateSubmissions } from "@/entities/submissions/queries";

export function useCreateReview({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateSubmissions = useInvalidateSubmissions();

  const { mutate: createReview, isPending } = useMutation({
    mutationFn: (payload: { submissionId: number } & CreateReviewPayload) =>
      lmsReviewsService.create(payload.submissionId, {
        score: payload.score,
        comment: payload.comment,
        verdict: payload.verdict,
      }),
    async onSuccess(response) {
      invalidateSubmissions();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { createReview, isPending };
}
