import { StreamDto, StreamResponse } from "@repo/schemas";

export const streamMap = (s: StreamDto): StreamResponse => ({
  id: s.id,
  name: s.name,
  courseId: s.courseId,
  status: s.status,
});

export const streamsMap = (s: StreamDto[]): StreamResponse[] =>
  s.map(streamMap);
