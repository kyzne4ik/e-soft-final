import { useState } from "react";
import type { CalendarView } from "./types";

export interface UseCalendarStateOptions {
  initialDate?: Date;
  initialView?: CalendarView;
}

export interface CalendarControlledProps {
  date: Date;
  view: CalendarView;
  onDateChange(d: Date): void;
  onViewChange(v: CalendarView): void;
}

export function useCalendarState(
  options: UseCalendarStateOptions = {},
): CalendarControlledProps {
  const [date, onDateChange] = useState<Date>(
    options.initialDate ?? new Date(),
  );
  const [view, onViewChange] = useState<CalendarView>(
    options.initialView ?? "week",
  );

  return { date, view, onDateChange, onViewChange };
}
