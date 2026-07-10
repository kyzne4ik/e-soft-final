import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { UpdateReviewPayload } from "@repo/schemas";
import { lmsReviewsService } from "@/shared/api";
import { useInvalidateSubmissions } from "@/entities/submissions/queries";

export function useUpdateReview(
  submissionId: number,
  reviewId: number,
  {
    onSuccess,
    onError,
    onSettled,
  }: {
    onSuccess?: (data: AxiosResponse) => void;
    onError?: (error: AxiosError<ApiErrorResponse>) => void;
    onSettled?: () => void;
  } = {},
) {
  const invalidateSubmissions = useInvalidateSubmissions();

  const { mutate: updateReview, isPending } = useMutation({
    mutationFn: (payload: UpdateReviewPayload) =>
      lmsReviewsService.update(submissionId, reviewId, payload),
    async onSuccess(response) {
      invalidateSubmissions();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { updateReview, isPending };
}
