import css from "./ScheduleCalendar.module.css";
import { useRef } from "react";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import type { LessonsResponse } from "@repo/schemas";
import { UpdateLessonModal } from "@/features/update-lesson";
import { CreateLessonModal } from "@/features/create-lesson";
import { DeleteLessonButton } from "@/features/delete-lesson";
import { useScheduleCalendar } from "../model/useScheduleCalendar";
import { Calendar, useCalendarState } from "@repo/ui/organisms/calendar";
import { CreateLessonForm } from "@/features/create-lesson/ui/CreateLessonForm";
import { UpdateLessonForm } from "@/features/update-lesson/ui/UpdateLessonForm";

export interface ScheduleCalendarProps {
  streamId: number;
}

export function ScheduleCalendar({ streamId }: ScheduleCalendarProps) {
  const calendar = useCalendarState({ initialView: "week" });
  const {
    events,
    isLoading,
    editing,
    setEditing,
    slotStart,
    isCreateOpen,
    openCreate,
    closeCreate,
  } = useScheduleCalendar(streamId);

  const lastEditingRef = useRef<LessonsResponse | null>(null);
  if (editing) lastEditingRef.current = editing;
  const lessonForForm = editing ?? lastEditingRef.current;

  if (isLoading) return <Skeleton height="100%" border="var(--radius-lg)" />;

  return (
    <>
      <Calendar
        {...calendar}
        events={events}
        className={css.calendar}
        onEventClick={(e) => setEditing(e.meta as LessonsResponse)}
        onSlotClick={openCreate}
      >
        <Calendar.Toolbar>
          <Calendar.Nav />
          <Calendar.Title />
          <Calendar.ViewSwitcher />
        </Calendar.Toolbar>
        <Calendar.Body>
          <Calendar.MonthView />
          <Calendar.WeekView />
          <Calendar.DayView />
        </Calendar.Body>
      </Calendar>
      <UpdateLessonForm
        lesson={lessonForForm}
        onSuccess={() => setEditing(null)}
      >
        <UpdateLessonModal
          key={lessonForForm?.id}
          isOpen={!!editing}
          onClose={() => setEditing(null)}
          renderSlot={
            lessonForForm && (
              <DeleteLessonButton
                lessonId={lessonForForm.id}
                lessonTitle={lessonForForm.title}
                onDeleted={() => setEditing(null)}
              />
            )
          }
        />
      </UpdateLessonForm>
      <CreateLessonForm
        key={slotStart?.toISOString() ?? "new"}
        streamId={streamId}
        initialStart={slotStart ?? undefined}
      >
        <CreateLessonModal isOpen={isCreateOpen} onClose={closeCreate} />
      </CreateLessonForm>
    </>
  );
}
