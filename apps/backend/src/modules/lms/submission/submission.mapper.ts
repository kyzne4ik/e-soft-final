import { SubmissionDto, SubmissionResponse } from "@repo/schemas";

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
