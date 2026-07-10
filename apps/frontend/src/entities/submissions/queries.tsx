import { useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { lmsSubmissionsService } from "@/shared/api";
import type { SubmissionMentorQuery } from "@repo/schemas";

const submissionsQueryKey = "submissions";

export const submissionByIdQuery = (id: number) =>
  ({
    queryKey: [submissionsQueryKey, "byId", id],
    queryFn: () =>
      lmsSubmissionsService.getById(id).then((r) => r.data ?? null),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const studentPerformanceQuery = (streamId: number) =>
  ({
    queryKey: [submissionsQueryKey, "performance", streamId],
    queryFn: () =>
      lmsSubmissionsService
        .getStudentPerformance(streamId)
        .then((r) => r.data ?? null),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const studentSubmissionByTaskQuery = (taskId: number) =>
  ({
    queryKey: [submissionsQueryKey, "byTask", taskId],
    queryFn: () =>
      lmsSubmissionsService
        .getStudentSubmissionByTask(taskId)
        .then((r) => r.data ?? null),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const mentorSubmissionsQuery = (query?: SubmissionMentorQuery) =>
  ({
    queryKey: [submissionsQueryKey, "mentor", query],
    queryFn: () =>
      lmsSubmissionsService
        .getMentorSubmissions(query)
        .then((r) => r.data ?? []),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const mentorSubmissionByIdQuery = (id: number) =>
  ({
    queryKey: [submissionsQueryKey, "mentorById", id],
    queryFn: () =>
      lmsSubmissionsService
        .getMentorSubmissionById(id)
        .then((r) => r.data ?? null),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const mentorJournalQuery = (streamId: number) =>
  ({
    queryKey: [submissionsQueryKey, "journal", streamId],
    queryFn: () =>
      lmsSubmissionsService
        .getMentorJournal(streamId)
        .then((r) => r.data?.data ?? []),
    staleTime: 1000 * 60 * 2,
  }) satisfies UseQueryOptions;

export const useInvalidateSubmissions = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [submissionsQueryKey],
    });
};
