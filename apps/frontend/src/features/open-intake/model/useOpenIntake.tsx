import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@/shared/lib/types";
import type { OpenIntakePayload } from "@repo/schemas";
import { crmService } from "@/shared/api";

export function useOpenIntake({
  onError,
}: {
  onError?: (error: AxiosError<ApiErrorResponse>) => void;
} = {}) {
  const mutation = useMutation({
    mutationFn: (payload: OpenIntakePayload) => crmService.intake.open(payload),
    onError,
  });

  const token = mutation.data?.data.data.token ?? null;

  return {
    openIntake: mutation.mutate,
    isPending: mutation.isPending,
    token,
    reset: mutation.reset,
  };
}
