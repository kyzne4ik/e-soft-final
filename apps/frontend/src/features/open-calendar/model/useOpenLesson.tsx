import { useState, type ReactNode } from "react";
import type { LessonsResponse } from "@repo/schemas";
import type { CalendarEvent } from "@repo/ui/organisms/calendar";
import { LessonDetailsModal } from "../ui/LessonDetailsModal";

export interface UseOpenLessonResult {
  onEventClick: (event: CalendarEvent) => void;
  modal: ReactNode;
}

export function useOpenLesson(): UseOpenLessonResult {
  const [lesson, setLesson] = useState<LessonsResponse | null>(null);

  return {
    onEventClick: (event) => setLesson(event.meta as LessonsResponse),
    modal: lesson ? (
      <LessonDetailsModal lesson={lesson} onClose={() => setLesson(null)} />
    ) : null,
  };
}
