import { useQuery } from "@tanstack/react-query";
import { myMentorStreamsQuery } from "@/entities";
import { lessonsQuery } from "@/entities/schedule";
import { useEffect, useMemo, useState } from "react";
import type { LessonsResponse } from "@repo/schemas";
import type { CalendarEvent } from "@repo/ui/organisms/calendar";

const LESSONS_LIMIT = 100;

export const lessonToEvent = (lesson: LessonsResponse): CalendarEvent => ({
  id: String(lesson.id),
  start: new Date(lesson.startTime),
  end: new Date(lesson.endTime),
  title: lesson.title,
  kind: "lesson",
  meta: lesson,
});

export function useScheduleWidget() {
  const { data: streamsRes, isLoading } = useQuery(myMentorStreamsQuery());
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const streams = useMemo(() => streamsRes?.data ?? [], [streamsRes?.data]);
  const firstId = streams[0]?.id;

  useEffect(() => {
    if (selectedId == null && firstId != null) setSelectedId(firstId);
  }, [selectedId, firstId]);

  const selected = streams.find((s) => s.id === selectedId) ?? null;

  return { streams, selected, selectedId, setSelectedId, isLoading };
}

export function useLessonsEvents(streamId: number) {
  const { data, isLoading } = useQuery({
    ...lessonsQuery({ streamId, page: 1, limit: LESSONS_LIMIT }),
    throwOnError: true,
  });

  const events = useMemo(() => (data?.data ?? []).map(lessonToEvent), [data]);

  return { events, isLoading };
}
