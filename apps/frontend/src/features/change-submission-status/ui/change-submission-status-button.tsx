import { Button } from "@repo/ui/atoms/button";
import type { ButtonProps } from "@repo/ui/atoms/button";
import { useChangeSubmissionStatus } from "../model/use-change-submission-status";
import type { AxiosError } from "axios";

export interface ChangeSubmissionStatusButtonProps extends Omit<
  ButtonProps,
  "type" | "children" | "isPending" | "onError"
> {
  submissionId: number;
  newStatus:
    "NEW" | "REVIEWING" | "CHANGES_REQUESTED" | "ACCEPTED" | "RESUBMITTED";
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
  label?: string;
}

export function ChangeSubmissionStatusButton({
  submissionId,
  newStatus,
  onSuccess,
  onError,
  label = "Изменить статус",
  variant = "primary",
  size = "md",
  ...rest
}: ChangeSubmissionStatusButtonProps) {
  const { changeStatus, isPending } = useChangeSubmissionStatus({
    onSuccess,
    onError,
  });

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      isPending={isPending}
      isDisabled={isPending}
      onClick={() =>
        changeStatus({ submissionId, payload: { status: newStatus } })
      }
      {...rest}
    >
      {label}
    </Button>
  );
}
