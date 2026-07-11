import { useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import {
  lmsStreamsService,
  lmsStreamMentorsService,
  lmsStreamStudentsService,
  lmsStreamTelegramService,
} from "@/shared/api";
import type {
  StreamQuery,
  StreamMentorQuery,
  StreamStudentQuery,
} from "@repo/schemas";

const streamsQueryKey = "streams";

export const streamsQuery = (query?: StreamQuery) =>
  ({
    queryKey: [streamsQueryKey, "list", query],
    queryFn: () => lmsStreamsService.getAll(query).then((r) => r.data ?? []),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const streamByIdQuery = (id: number) =>
  ({
    queryKey: [streamsQueryKey, "byId", id],
    queryFn: () => lmsStreamsService.getById(id).then((r) => r.data ?? null),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const myStudentStreamsQuery = () =>
  ({
    queryKey: [streamsQueryKey, "my", "student"],
    queryFn: () => lmsStreamsService.getMyStudent().then((r) => r.data ?? null),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const myMentorStreamsQuery = () =>
  ({
    queryKey: [streamsQueryKey, "my", "mentor"],
    queryFn: () => lmsStreamsService.getMyMentor().then((r) => r.data ?? null),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const streamMentorsQuery = (
  streamId: number,
  query?: StreamMentorQuery,
) =>
  ({
    queryKey: [streamsQueryKey, "mentors", streamId, query],
    queryFn: () =>
      lmsStreamMentorsService
        .getMentors(streamId, query)
        .then((r) => r.data ?? []),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const streamStudentsQuery = (
  streamId: number,
  query?: StreamStudentQuery,
) =>
  ({
    queryKey: [streamsQueryKey, "students", streamId, query],
    queryFn: () =>
      lmsStreamStudentsService
        .getStudents(streamId, query)
        .then((r) => r.data ?? []),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const streamTelegramQuery = (streamId: number) =>
  ({
    queryKey: [streamsQueryKey, "telegram", streamId],
    queryFn: () =>
      lmsStreamTelegramService
        .getTelegram(streamId)
        .then((r) => r.data ?? null),
    staleTime: 1000 * 60 * 5,
  }) satisfies UseQueryOptions;

export const useInvalidateStreams = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [streamsQueryKey],
    });
};

export const useInvalidateStreamList = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [streamsQueryKey, "list"],
    });
};
