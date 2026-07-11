import { useEffect, useState } from "react";
import type { AxiosError } from "axios";
import type { ReviewVerdict } from "@repo/schemas";
import { Modal } from "@repo/ui/organisms/modal";
import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Slider } from "@repo/ui/atoms/slider";
import { TextArea } from "@repo/ui/atoms/textarea";
import { useCreateReview } from "@/features/create-review";
import { useUpdateReview } from "@/features/update-review";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import type { ApiErrorResponse } from "@/shared/lib/types";
import css from "./GradeSubmissionModal.module.css";

export type GradeVerdict = Extract<
  ReviewVerdict,
  "ACCEPTED" | "CHANGES_REQUESTED"
>;

const VERDICT_META: Record<
  GradeVerdict,
  {
    title: string;
    action: string;
    icon: string;
    accent: string;
    fallbackScore: number;
  }
> = {
  ACCEPTED: {
    title: "Зачесть работу",
    action: "Зачесть",
    icon: "check",
    accent: "var(--color-tertiary)",
    fallbackScore: 80,
  },
  CHANGES_REQUESTED: {
    title: "Отправить на доработку",
    action: "На доработку",
    icon: "rotate-ccw",
    accent: "var(--color-warning)",
    fallbackScore: 50,
  },
};

export interface GradeSubmissionModalProps {
  submissionId: number;
  studentName?: string;
  taskTitle?: string;
  verdict: GradeVerdict;
  mode: "create" | "edit";
  reviewId?: number;
  previousScore?: number | null;
  initialScore?: number;
  initialComment?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function GradeSubmissionModal({
  submissionId,
  studentName,
  taskTitle,
  verdict,
  mode,
  reviewId,
  previousScore,
  initialScore,
  initialComment,
  isOpen,
  onClose,
  onSuccess,
}: GradeSubmissionModalProps) {
  const meta = VERDICT_META[verdict];
  const { getToast } = useToast();

  const [score, setScore] = useState(
    initialScore ?? previousScore ?? meta.fallbackScore,
  );
  const [comment, setComment] = useState(initialComment ?? "");

  useEffect(() => {
    if (isOpen) {
      setScore(initialScore ?? previousScore ?? meta.fallbackScore);
      setComment(initialComment ?? "");
    }
  }, [isOpen]);

  const handleSuccess = async () => {
    await getToast({
      type: "success",
      message:
        verdict === "ACCEPTED" ? "Работа зачтена" : "Отправлено на доработку",
    });
    onSuccess?.();
    onClose();
  };

  const handleError = async (error: AxiosError<ApiErrorResponse>) => {
    await getToast({
      type: "error",
      message: error.response?.data?.message || "Не удалось сохранить оценку",
    });
  };

  const { createReview, isPending: isCreating } = useCreateReview({
    onSuccess: handleSuccess,
    onError: handleError,
  });
  const { updateReview, isPending: isUpdating } = useUpdateReview(
    submissionId,
    reviewId ?? 0,
    { onSuccess: handleSuccess, onError: handleError },
  );

  const isPending = isCreating || isUpdating;
  const canSubmit = comment.trim().length > 0 && !isPending;

  const submit = () => {
    if (!canSubmit) return;
    const trimmed = comment.trim();
    if (mode === "edit" && reviewId != null) {
      updateReview({ score, comment: trimmed, verdict });
    } else {
      createReview({ submissionId, score, comment: trimmed, verdict });
    }
  };

  const sub = [studentName, taskTitle].filter(Boolean).join(" · ");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={meta.title}
      sub={sub}
      size="sm"
    >
      <Modal.Body>
        <div className={css.body}>
          {previousScore != null && (
            <div className={css.prev}>
              <Icon name="history" size={16} />
              <span className={css.prev_label}>Прошлая оценка:</span>
              <span className={css.prev_value}>{previousScore} / 100</span>
            </div>
          )}

          <div className={css.slider}>
            <Slider
              value={score}
              onChange={setScore}
              min={0}
              max={100}
              accentColor={meta.accent}
              aria-label="Оценка"
            />
          </div>

          <TextArea
            label="Комментарий (поддержите студента)"
            placeholder="Отличная работа! Особенно понравилось…"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            rows={4}
            fullWidth
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="ghost" onClick={onClose} isDisabled={isPending}>
          Отмена
        </Button>
        <Button
          variant="primary"
          isPending={isPending}
          isDisabled={!canSubmit}
          onClick={submit}
        >
          <Icon name={meta.icon} size={16} />
          {`${meta.action} · ${score}`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
