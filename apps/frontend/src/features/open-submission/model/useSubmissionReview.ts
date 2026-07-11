import { useQuery } from "@tanstack/react-query";
import type { MentorSubmissionDetail } from "@repo/schemas";
import { mentorSubmissionByIdQuery } from "@/entities/submissions";
import { toPerson } from "./person";
import type { GradeVerdict } from "../ui/GradeSubmissionModal";

export function useSubmissionReview(submissionId: number, enabled: boolean) {
  const { data, isLoading } = useQuery({
    ...mentorSubmissionByIdQuery(submissionId),
    enabled,
  });

  const detail =
    (data as { data?: MentorSubmissionDetail } | undefined)?.data ?? null;
  const submission = detail?.submission ?? null;
  const reviews = detail?.reviews ?? [];

  const student = submission
    ? toPerson(
        submission.studentId,
        submission.studentFirstName,
        submission.studentLastName,
      )
    : null;

  const status = submission?.status;
  const canTake = status === "NEW" || status === "RESUBMITTED";
  const lastScore = reviews.at(-1)?.score ?? null;
  const editVerdict: GradeVerdict =
    status === "ACCEPTED" ? "ACCEPTED" : "CHANGES_REQUESTED";

  return {
    submission,
    reviews,
    student,
    isLoading,
    canTake,
    lastScore,
    editVerdict,
  };
}
