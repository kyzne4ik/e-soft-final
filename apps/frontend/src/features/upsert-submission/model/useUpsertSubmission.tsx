import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { CreateSubmissionPayload } from "@repo/schemas";
import { lmsSubmissionsService } from "@/shared/api";
import { useInvalidateSubmissions } from "@/entities/submissions";

export function useUpsertSubmission({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateSubmissions = useInvalidateSubmissions();

  const { mutate: upsertSubmission, isPending } = useMutation({
    mutationFn: (payload: CreateSubmissionPayload) =>
      lmsSubmissionsService.create(payload),
    async onSuccess(response) {
      invalidateSubmissions();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { upsertSubmission, isPending };
}
