import { ReviewDto, ReviewResponse, MentorReviewResponse } from "@repo/schemas";
import { MentorReviewRow } from "../submission.types";

export const reviewMap = (r: ReviewDto): ReviewResponse => ({
  id: r.id,
  submissionId: r.submissionId,
  mentorId: r.mentorId,
  score: r.score,
  comment: r.comment,
});

export const reviewsMap = (rs: ReviewDto[]): ReviewResponse[] =>
  rs.map(reviewMap);

export const mentorReviewMap = (r: MentorReviewRow): MentorReviewResponse => ({
  id: r.id,
  submissionId: r.submissionId,
  mentorId: r.mentorId,
  score: r.score,
  comment: r.comment,
  reviewedAt: r.reviewedAt,
  mentorFirstName: r.mentorFirstName,
  mentorLastName: r.mentorLastName,
});

export const mentorReviewsMap = (
  rs: MentorReviewRow[],
): MentorReviewResponse[] => rs.map(mentorReviewMap);
