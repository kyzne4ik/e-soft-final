import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { UpdateSubmissionPayload } from "@repo/schemas";
import { lmsSubmissionsService } from "@/shared/api";
import { useInvalidateSubmissions } from "@/entities/submissions/queries";

export function useUpdateSubmission(
  submissionId: number,
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

  const { mutate: updateSubmission, isPending } = useMutation({
    mutationFn: (payload: UpdateSubmissionPayload) =>
      lmsSubmissionsService.updateOwn(submissionId, payload),
    async onSuccess(response) {
      invalidateSubmissions();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { updateSubmission, isPending };
}
