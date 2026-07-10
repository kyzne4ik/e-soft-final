import { format, isSameMonth } from "date-fns";
import { ru } from "date-fns/locale";
import { useCalendar } from "../CalendarContext";
import type { CalendarRange, CalendarView } from "../types";
import css from "../Calendar.module.css";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function titleText(
  date: Date,
  view: CalendarView,
  range: CalendarRange,
): string {
  switch (view) {
    case "month":
      return cap(format(date, "LLLL yyyy", { locale: ru }));
    case "week": {
      const { from, to } = range;
      if (isSameMonth(from, to)) {
        return `${format(from, "d", { locale: ru })}–${format(to, "d MMM", { locale: ru })}`;
      }
      return `${format(from, "d MMM", { locale: ru })} – ${format(to, "d MMM", { locale: ru })}`;
    }
    case "day":
      return format(date, "d MMMM", { locale: ru });
  }
}

export function Title() {
  const { date, view, range } = useCalendar();
  const dateTime =
    view === "month" ? format(date, "yyyy-MM") : format(date, "yyyy-MM-dd");

  return (
    <time className={css.cal__title} dateTime={dateTime}>
      {titleText(date, view, range)}
    </time>
  );
}
