import { Button } from "@repo/ui/atoms/button";
import type { ButtonProps } from "@repo/ui/atoms/button";
import type { ReviewVerdict } from "@repo/schemas";
import { useCreateReview } from "../model/use-create-review";
import type { AxiosError } from "axios";

export interface CreateReviewButtonProps extends Omit<
  ButtonProps,
  "type" | "children" | "isPending" | "onError"
> {
  submissionId: number;
  score: number;
  comment: string;
  verdict: ReviewVerdict;
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
  label?: string;
}

export function CreateReviewButton({
  submissionId,
  score,
  comment,
  verdict,
  onSuccess,
  onError,
  label = "Опубликовать рецензию",
  variant = "primary",
  size = "md",
  ...rest
}: CreateReviewButtonProps) {
  const { createReview, isPending } = useCreateReview({ onSuccess, onError });

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      isPending={isPending}
      isDisabled={isPending}
      onClick={() => createReview({ submissionId, score, comment, verdict })}
      {...rest}
    >
      {label}
    </Button>
  );
}
