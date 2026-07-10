import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
} from "date-fns";
import type { CalendarRange, CalendarView } from "../types";

export function computeRange(
  date: Date,
  view: CalendarView,
  weekStartsOn: 0 | 1 = 1,
): CalendarRange {
  switch (view) {
    case "month":
      return {
        from: startOfWeek(startOfMonth(date), { weekStartsOn }),
        to: endOfWeek(endOfMonth(date), { weekStartsOn }),
      };
    case "week":
      return {
        from: startOfWeek(date, { weekStartsOn }),
        to: endOfWeek(date, { weekStartsOn }),
      };
    case "day":
      return { from: startOfDay(date), to: endOfDay(date) };
  }
}

export function rangeEquals(a: CalendarRange, b: CalendarRange): boolean {
  return (
    a.from.getTime() === b.from.getTime() && a.to.getTime() === b.to.getTime()
  );
}
