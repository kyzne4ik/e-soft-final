import type { StudentReviewResponse } from "@repo/schemas";
import { ReviewHistory } from "@repo/ui/organisms/review-history";
import { StatusBadge } from "@repo/ui/molecules/status-badge";
import { toPerson } from "@/features/open-submission/model/person";
import { formatDate, reviewTimeFormatter } from "./useSubmissionDetail";
import css from "./UpsertSubmissionModal.module.css";

interface UpsertSubmissionReviewListProps {
  reviews: StudentReviewResponse[];
  submissionStatus: string | null;
}

export function UpsertSubmissionReviewList({
  reviews,
  submissionStatus,
}: UpsertSubmissionReviewListProps) {
  if (reviews.length === 0) {
    return (
      <p className={css.empty}>
        {submissionStatus
          ? "Ментор ещё не проверил работу."
          : "Вы ещё не сдавали эту задачу."}
      </p>
    );
  }

  return (
    <ReviewHistory title={null}>
      {reviews.map((review, index) => {
        const author = toPerson(
          review.mentorId,
          review.mentorFirstName,
          review.mentorLastName,
        );
        const isLast = index === reviews.length - 1;

        return (
          <ReviewHistory.Item
            key={review.id}
            author={author}
            time={
              formatDate(review.reviewedAt, reviewTimeFormatter) ?? undefined
            }
            active={isLast}
          >
            <ReviewHistory.Meta>
              <StatusBadge
                status={submissionStatus ?? "NEW"}
                kind="submission"
              />
              <span className={css.score}>{review.score} / 100</span>
            </ReviewHistory.Meta>
            {review.comment ? (
              <ReviewHistory.Message>{review.comment}</ReviewHistory.Message>
            ) : null}
          </ReviewHistory.Item>
        );
      })}
    </ReviewHistory>
  );
}
