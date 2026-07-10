import type { ReactNode } from "react";

export type CalendarView = "month" | "week" | "day";

export interface CalendarRange {
  from: Date;
  to: Date;
}

export interface CalendarEvent {
  id: string;
  start: Date;
  end?: Date;
  allDay?: boolean;
  title: string;
  kind: string;
  meta?: unknown;
}

export interface CalendarKindStyle {
  bg: string;
  fg: string;
  icon?: string;
}

export type CalendarKindColors = Record<string, CalendarKindStyle>;

export interface CalendarContextValue {
  date: Date;
  view: CalendarView;
  range: CalendarRange;
  events: CalendarEvent[];
  weekStartsOn: 0 | 1;
  dayStartHour: number;
  dayEndHour: number;
  maxEventsPerDay: number;
  goPrev(): void;
  goNext(): void;
  goToday(): void;
  setView(v: CalendarView): void;
  onEventClick?(e: CalendarEvent): void;
  onSlotClick?(d: Date): void;
  renderEvent?(e: CalendarEvent): ReactNode;
  resolveKind(kind: string): CalendarKindStyle;
}
