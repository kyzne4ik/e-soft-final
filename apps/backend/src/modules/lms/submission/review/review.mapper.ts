import { ReviewDto, ReviewResponse } from "@repo/schemas";

export const reviewMap = (r: ReviewDto): ReviewResponse => ({
  id: r.id,
  submissionId: r.submissionId,
  mentorId: r.mentorId,
  score: r.score,
  comment: r.comment,
});

export const reviewsMap = (rs: ReviewDto[]): ReviewResponse[] =>
  rs.map(reviewMap);
