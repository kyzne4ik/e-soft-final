import {
  SubmissionDto,
  SubmissionResponse,
  MentorSubmissionResponse,
  MentorSubmissionDetail,
  SubmissionReviewResponse,
  StudentReviewResponse,
} from "@repo/schemas";
import {
  MentorSubmissionRow,
  MentorSubmissionDetailRow,
  StudentReviewRow,
  SubmissionReviewRepositoryResponse,
} from "./submission.types";
import { mentorReviewsMap } from "./review/review.mapper";

export const submissionMap = (s: SubmissionDto): SubmissionResponse => ({
  id: s.id,
  taskId: s.taskId,
  studentId: s.studentId,
  repoLink: s.repoLink,
  status: s.status,
});

export const submissionsMap = (
  submissions: SubmissionDto[],
): SubmissionResponse[] => submissions.map(submissionMap);

export const mentorSubmissionMap = (
  r: MentorSubmissionRow,
): MentorSubmissionResponse => ({
  id: r.id,
  taskId: r.taskId,
  studentId: r.studentId,
  streamId: r.streamId,
  repoLink: r.repoLink,
  status: r.status,
  createdAt: r.createdAt,
  studentFirstName: r.studentFirstName,
  studentLastName: r.studentLastName,
  taskTitle: r.taskTitle,
  taskDeadline: r.taskDeadline,
});

export const mentorSubmissionsMap = (
  rows: MentorSubmissionRow[],
): MentorSubmissionResponse[] => rows.map(mentorSubmissionMap);

export const mentorSubmissionDetailMap = (
  r: MentorSubmissionDetailRow,
): MentorSubmissionDetail => ({
  submission: r.submission
    ? {
        ...mentorSubmissionMap(r.submission),
        taskDescription: r.submission.taskDescription,
      }
    : null,
  reviews: mentorReviewsMap(r.reviews),
});

export const studentReviewMap = (
  r: StudentReviewRow,
): StudentReviewResponse => ({
  id: r.id,
  submissionId: r.submissionId,
  mentorId: r.mentorId,
  score: r.score,
  comment: r.comment,
  reviewedAt: r.reviewedAt,
  mentorFirstName: r.mentorFirstName,
  mentorLastName: r.mentorLastName,
});

export const submissionReviewMap = (
  r: SubmissionReviewRepositoryResponse,
): SubmissionReviewResponse => ({
  submission: r.submission ? submissionMap(r.submission) : null,
  reviews: r.reviews.map(studentReviewMap),
});
