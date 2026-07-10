import { startOfDay, endOfDay } from "date-fns";
import type { CalendarEvent } from "../types";

export function isAllDayEvent(e: CalendarEvent): boolean {
  if (e.allDay) return true;
  if (!e.end) return true;
  return e.end.getTime() <= e.start.getTime();
}

export function isTimedEvent(e: CalendarEvent): boolean {
  return !isAllDayEvent(e);
}

function intervalOf(e: CalendarEvent): [number, number] {
  const start = e.start.getTime();
  const end = e.end ? e.end.getTime() : start;
  return [start, Math.max(end, start)];
}

export function eventIntersectsDay(e: CalendarEvent, day: Date): boolean {
  const [start, end] = intervalOf(e);
  const dayStart = startOfDay(day).getTime();
  const dayEnd = endOfDay(day).getTime();
  if (start === end) return start >= dayStart && start <= dayEnd;
  return start <= dayEnd && end > dayStart;
}

export function timedEventsForDay(
  events: CalendarEvent[],
  day: Date,
): CalendarEvent[] {
  return events.filter((e) => isTimedEvent(e) && eventIntersectsDay(e, day));
}

export function allDayEventsForDay(
  events: CalendarEvent[],
  day: Date,
): CalendarEvent[] {
  return events.filter((e) => isAllDayEvent(e) && eventIntersectsDay(e, day));
}

export function eventsForDay(
  events: CalendarEvent[],
  day: Date,
): CalendarEvent[] {
  return events.filter((e) => eventIntersectsDay(e, day));
}

export interface VerticalPosition {
  top: number;
  height: number;
}

export function computeVerticalPosition(
  event: CalendarEvent,
  day: Date,
  dayStartHour: number,
  dayEndHour: number,
): VerticalPosition | null {
  const base = startOfDay(day).getTime();
  const windowStart = base + dayStartHour * 60 * 60 * 1000;
  const windowEnd = base + dayEndHour * 60 * 60 * 1000;
  const totalMinutes = (dayEndHour - dayStartHour) * 60;

  const start = Math.max(event.start.getTime(), windowStart);
  const end = Math.min((event.end ?? event.start).getTime(), windowEnd);
  if (end <= start) return null;

  const startMin = (start - windowStart) / 60000;
  const endMin = (end - windowStart) / 60000;

  return {
    top: (startMin / totalMinutes) * 100,
    height: ((endMin - startMin) / totalMinutes) * 100,
  };
}
