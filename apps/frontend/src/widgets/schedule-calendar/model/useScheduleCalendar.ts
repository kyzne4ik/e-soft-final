import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { lessonsQuery } from "@/entities/schedule";
import type { LessonsResponse } from "@repo/schemas";
import type { CalendarEvent } from "@repo/ui/organisms/calendar";

const CALENDAR_LESSONS_LIMIT = 100;

export const lessonToEvent = (lesson: LessonsResponse): CalendarEvent => ({
  id: String(lesson.id),
  start: new Date(lesson.startTime),
  end: new Date(lesson.endTime),
  title: lesson.title,
  kind: "lesson",
  meta: lesson,
});

export function useScheduleCalendar(streamId: number) {
  const [editing, setEditing] = useState<LessonsResponse | null>(null);
  const [slotStart, setSlotStart] = useState<Date | null>(null);
  const [isCreateOpen, setCreateOpen] = useState(false);

  const { data, isLoading } = useQuery({
    ...lessonsQuery({ streamId, page: 1, limit: CALENDAR_LESSONS_LIMIT }),
    throwOnError: true,
  });

  const events = useMemo(() => (data?.data ?? []).map(lessonToEvent), [data]);

  const openCreate = (date: Date) => {
    setSlotStart(date);
    setCreateOpen(true);
  };

  const closeCreate = () => setCreateOpen(false);

  return {
    events,
    isLoading,
    editing,
    setEditing,
    slotStart,
    isCreateOpen,
    openCreate,
    closeCreate,
  };
}
