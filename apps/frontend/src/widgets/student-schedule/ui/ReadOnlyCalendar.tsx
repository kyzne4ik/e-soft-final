import { Calendar, useCalendarState } from "@repo/ui/organisms/calendar";
import css from "./StudentSchedule.module.css";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import { useOpenLesson } from "@/features/open-calendar";
import { useLessonsEvents } from "../model/useScheduleWidget";

interface ReadOnlyCalendarProps {
  streamId: number;
}

export function ReadOnlyCalendar({ streamId }: ReadOnlyCalendarProps) {
  const calendar = useCalendarState({ initialView: "week" });
  const { onEventClick, modal } = useOpenLesson();
  const { events, isLoading } = useLessonsEvents(streamId);

  if (isLoading) return <Skeleton height="100%" border="var(--radius-lg)" />;

  return (
    <>
      <Calendar
        {...calendar}
        events={events}
        className={css.calendar}
        onEventClick={onEventClick}
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
      {modal}
    </>
  );
}
