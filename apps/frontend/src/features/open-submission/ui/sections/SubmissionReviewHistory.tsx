import { Icon } from "@repo/ui/atoms/icon";
import { ReviewHistory } from "@repo/ui/organisms/review-history";
import type { MentorReviewResponse } from "@repo/schemas";
import { toPerson } from "../../model/person";
import { formatReviewTime } from "../../model/formatters";
import css from "../SubmissionReviewModal.module.css";

interface SubmissionReviewHistoryProps {
  reviews: MentorReviewResponse[];
  onEditReview: (reviewId: number, score: number, comment: string) => void;
}

export function SubmissionReviewHistory({
  reviews,
  onEditReview,
}: SubmissionReviewHistoryProps) {
  if (reviews.length === 0) {
    return (
      <p className={css.empty}>Это первая сдача — истории ревью пока нет.</p>
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
            time={formatReviewTime(review.reviewedAt) ?? undefined}
            active={isLast}
          >
            <ReviewHistory.Meta>
              <span className={css.score}>{review.score} / 100</span>
              {isLast && (
                <button
                  type="button"
                  className={css.edit}
                  onClick={() =>
                    onEditReview(review.id, review.score, review.comment)
                  }
                >
                  <Icon name="pencil" size={13} />
                  Изменить
                </button>
              )}
            </ReviewHistory.Meta>
            <ReviewHistory.Message>{review.comment}</ReviewHistory.Message>
          </ReviewHistory.Item>
        );
      })}
    </ReviewHistory>
  );
}
