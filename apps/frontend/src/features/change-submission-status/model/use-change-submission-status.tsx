import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { lmsSubmissionsService } from "@/shared/api";
import { useInvalidateSubmissions } from "@/entities/submissions/queries";

export interface ChangeSubmissionStatusPayload {
  status:
    "NEW" | "REVIEWING" | "CHANGES_REQUESTED" | "ACCEPTED" | "RESUBMITTED";
}

export function useChangeSubmissionStatus({
  onSuccess,
  onError,
  onSettled,
}: {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (error: AxiosError) => void;
  onSettled?: () => void;
} = {}) {
  const invalidateSubmissions = useInvalidateSubmissions();

  const { mutate: changeStatus, isPending } = useMutation({
    mutationFn: (payload: {
      submissionId: number;
      payload: ChangeSubmissionStatusPayload;
    }) =>
      lmsSubmissionsService.switchStatus(payload.submissionId, payload.payload),
    async onSuccess(response) {
      invalidateSubmissions();
      onSuccess?.(response);
    },
    onError,
    onSettled,
  });

  return { changeStatus, isPending };
}
