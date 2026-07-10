import { createContext } from "react";
import { useStrictContext } from "../../libs/react";
import type { CalendarContextValue, CalendarKindColors } from "./types";

export const CalendarContext = createContext<CalendarContextValue | null>(null);

export function useCalendar(): CalendarContextValue {
  return useStrictContext(CalendarContext);
}

export const DEFAULT_KIND_COLORS: CalendarKindColors = {
  lesson: {
    bg: "var(--color-secondary-light)",
    fg: "var(--color-secondary-hover)",
    icon: "monitor-play",
  },
  lecture: {
    bg: "var(--color-secondary-light)",
    fg: "var(--color-secondary-hover)",
    icon: "monitor-play",
  },
  seminar: {
    bg: "var(--color-success-light)",
    fg: "var(--color-success-text)",
    icon: "users",
  },
  deadline: {
    bg: "var(--color-primary-light)",
    fg: "var(--color-primary-hover)",
    icon: "flag",
  },
  default: {
    bg: "var(--surface-subtle)",
    fg: "var(--text-tertiary)",
    icon: "calendar",
  },
};
