import type { AxiosError } from "axios";
import { Modal } from "@repo/ui/organisms/modal";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import { formatDeadline } from "../model/formatters";
import css from "./SubmissionReviewModal.module.css";
import { useGradeModal } from "../model/useGradeModal";
import { StudentHeader } from "./sections/StudentHeader";
import type { ApiErrorResponse } from "@/shared/lib/types";
import { GradeSubmissionModal } from "./GradeSubmissionModal";
import { SubmissionFooter } from "./sections/SubmissionFooter";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useSubmissionReview } from "../model/useSubmissionReview";
import { SubmissionReviewHistory } from "./sections/SubmissionReviewHistory";
import { useChangeSubmissionStatus } from "@/features/change-submission-status";

export interface SubmissionReviewModalProps {
  submissionId: number;
  isOpen: boolean;
  onClose: () => void;
}

export function SubmissionReviewModal({
  submissionId,
  isOpen,
  onClose,
}: SubmissionReviewModalProps) {
  const { getToast } = useToast();
  const grade = useGradeModal();

  const {
    submission,
    reviews,
    student,
    isLoading,
    canTake,
    lastScore,
    editVerdict,
  } = useSubmissionReview(submissionId, isOpen);

  const { changeStatus, isPending: isTaking } = useChangeSubmissionStatus({
    async onSuccess() {
      await getToast({ type: "success", message: "Работа взята на ревью" });
      onClose();
    },
    async onError(error) {
      const err = error as AxiosError<ApiErrorResponse>;
      await getToast({
        type: "error",
        message: err.response?.data?.message || "Не удалось взять на ревью",
      });
    },
  });

  const deadline = submission ? formatDeadline(submission.taskDeadline) : null;
  const sub = [student?.name, deadline ? `дедлайн ${deadline}` : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={submission?.taskTitle ?? "Сдача"}
        sub={sub}
        size="default"
      >
        <Modal.Body>
          {isLoading || !submission ? (
            <div className={css.rows}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} height={24} border="var(--radius-sm)" />
              ))}
            </div>
          ) : (
            <div className={css.rows}>
              {student && (
                <StudentHeader
                  student={student}
                  repoLink={submission.repoLink}
                  status={submission.status}
                />
              )}

              {submission.taskDescription && (
                <div className={css.section}>
                  <div className={css.section_title}>Задание</div>
                  <p className={css.description}>
                    {submission.taskDescription}
                  </p>
                </div>
              )}

              <div className={css.section}>
                <div className={css.section_title}>История ревью</div>
                <SubmissionReviewHistory
                  reviews={reviews}
                  onEditReview={(reviewId, score, comment) =>
                    grade.open({
                      mode: "edit",
                      verdict: editVerdict,
                      reviewId,
                      initialScore: score,
                      initialComment: comment,
                      previousScore: null,
                    })
                  }
                />
              </div>
            </div>
          )}
        </Modal.Body>

        {submission && (
          <Modal.Footer>
            <SubmissionFooter
              submissionId={submissionId}
              canTake={canTake}
              isTaking={isTaking}
              lastScore={lastScore}
              onTake={() =>
                changeStatus({ submissionId, payload: { status: "REVIEWING" } })
              }
              onGrade={grade.open}
            />
          </Modal.Footer>
        )}
      </Modal>

      {grade.state && (
        <GradeSubmissionModal
          submissionId={submissionId}
          studentName={student?.name}
          taskTitle={submission?.taskTitle}
          verdict={grade.state.verdict}
          mode={grade.state.mode}
          reviewId={grade.state.reviewId}
          previousScore={grade.state.previousScore}
          initialScore={grade.state.initialScore}
          initialComment={grade.state.initialComment}
          isOpen={grade.isOpen}
          onClose={grade.close}
          onSuccess={onClose}
        />
      )}
    </>
  );
}
