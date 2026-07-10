import { useCallback, useEffect, useMemo, useRef, type ReactNode } from "react";
import { addDays, addMonths, addWeeks } from "date-fns";
import { classNames } from "../../libs/classNames";
import { CalendarContext, DEFAULT_KIND_COLORS } from "./CalendarContext";
import { computeRange, rangeEquals } from "./lib/range";
import type {
  CalendarContextValue,
  CalendarEvent,
  CalendarKindColors,
  CalendarKindStyle,
  CalendarRange,
  CalendarView,
} from "./types";
import { Toolbar } from "./parts/Toolbar";
import { Nav } from "./parts/Nav";
import { Title } from "./parts/Title";
import { ViewSwitcher } from "./parts/ViewSwitcher";
import { Body } from "./parts/Body";
import { MonthView } from "./views/MonthView";
import { WeekView } from "./views/WeekView";
import { DayView } from "./views/DayView";
import css from "./Calendar.module.css";

export interface CalendarProps {
  date: Date;
  onDateChange(d: Date): void;
  view: CalendarView;
  onViewChange(v: CalendarView): void;
  events: CalendarEvent[];
  onRangeChange?(range: CalendarRange): void;
  onEventClick?(e: CalendarEvent): void;
  onSlotClick?(d: Date): void;
  renderEvent?(e: CalendarEvent): ReactNode;
  kindColors?: CalendarKindColors;
  weekStartsOn?: 0 | 1;
  dayStartHour?: number;
  dayEndHour?: number;
  maxEventsPerDay?: number;
  className?: string;
  children: ReactNode;
}

function shiftDate(date: Date, view: CalendarView, dir: 1 | -1): Date {
  switch (view) {
    case "month":
      return addMonths(date, dir);
    case "week":
      return addWeeks(date, dir);
    case "day":
      return addDays(date, dir);
  }
}

function CalendarRoot({
  date,
  onDateChange,
  view,
  onViewChange,
  events,
  onRangeChange,
  onEventClick,
  onSlotClick,
  renderEvent,
  kindColors,
  weekStartsOn = 1,
  dayStartHour = 8,
  dayEndHour = 22,
  maxEventsPerDay = 3,
  className,
  children,
}: CalendarProps) {
  const range = useMemo(
    () => computeRange(date, view, weekStartsOn),
    [date, view, weekStartsOn],
  );

  const lastRange = useRef<CalendarRange | null>(null);
  useEffect(() => {
    if (!onRangeChange) return;
    if (lastRange.current && rangeEquals(lastRange.current, range)) return;
    lastRange.current = range;
    onRangeChange(range);
  }, [range, onRangeChange]);

  const colors = useMemo<CalendarKindColors>(
    () => ({ ...DEFAULT_KIND_COLORS, ...kindColors }),
    [kindColors],
  );

  const resolveKind = useCallback(
    (kind: string): CalendarKindStyle =>
      colors[kind] ?? colors.default ?? DEFAULT_KIND_COLORS.default,
    [colors],
  );

  const goPrev = useCallback(
    () => onDateChange(shiftDate(date, view, -1)),
    [date, view, onDateChange],
  );
  const goNext = useCallback(
    () => onDateChange(shiftDate(date, view, 1)),
    [date, view, onDateChange],
  );
  const goToday = useCallback(() => onDateChange(new Date()), [onDateChange]);
  const setView = useCallback(
    (v: CalendarView) => onViewChange(v),
    [onViewChange],
  );

  const value = useMemo<CalendarContextValue>(
    () => ({
      date,
      view,
      range,
      events,
      weekStartsOn,
      dayStartHour,
      dayEndHour,
      maxEventsPerDay,
      goPrev,
      goNext,
      goToday,
      setView,
      onEventClick,
      onSlotClick,
      renderEvent,
      resolveKind,
    }),
    [
      date,
      view,
      range,
      events,
      weekStartsOn,
      dayStartHour,
      dayEndHour,
      maxEventsPerDay,
      goPrev,
      goNext,
      goToday,
      setView,
      onEventClick,
      onSlotClick,
      renderEvent,
      resolveKind,
    ],
  );

  return (
    <CalendarContext.Provider value={value}>
      <div className={classNames(css.cal, {}, [className])}>{children}</div>
    </CalendarContext.Provider>
  );
}

export const Calendar = Object.assign(CalendarRoot, {
  Toolbar,
  Nav,
  Title,
  ViewSwitcher,
  Body,
  MonthView,
  WeekView,
  DayView,
});
