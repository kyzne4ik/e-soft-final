import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfWeek,
} from "date-fns";
import { ru } from "date-fns/locale";
import { classNames } from "../../../libs/classNames";
import { useCalendar } from "../CalendarContext";
import { eventsForDay } from "../lib/events";
import { EventChip } from "./EventChip";
import css from "../Calendar.module.css";

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function MonthViewImpl() {
  const { date, range, events, weekStartsOn, maxEventsPerDay, onSlotClick } =
    useCalendar();

  const days = useMemo(
    () => eachDayOfInterval({ start: range.from, end: range.to }),
    [range.from, range.to],
  );

  const weekdayLabels = useMemo(() => {
    const weekStart = startOfWeek(range.from, { weekStartsOn });
    return eachDayOfInterval({
      start: weekStart,
      end: addDays(weekStart, 6),
    }).map((d) => format(d, "EEEEEE", { locale: ru }));
  }, [range.from, weekStartsOn]);

  const today = new Date();

  const initialFocus = Math.max(
    0,
    days.findIndex((d) => isSameDay(d, date)),
  );
  const [focusedIndex, setFocusedIndex] = useState(initialFocus);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);

  const moveFocus = (next: number) => {
    const clamped = Math.max(0, Math.min(days.length - 1, next));
    setFocusedIndex(clamped);
    cellRefs.current[clamped]?.focus();
  };

  const handleGridKeyDown = (
    e: KeyboardEvent<HTMLDivElement>,
    index: number,
  ) => {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        moveFocus(index + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        moveFocus(index - 1);
        break;
      case "ArrowDown":
        e.preventDefault();
        moveFocus(index + 7);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveFocus(index - 7);
        break;
      case "Home":
        e.preventDefault();
        moveFocus(
          days.findIndex((d) =>
            isSameDay(d, startOfWeek(days[index], { weekStartsOn })),
          ),
        );
        break;
      case "End":
        e.preventDefault();
        moveFocus(
          days.findIndex((d) =>
            isSameDay(d, endOfWeek(days[index], { weekStartsOn })),
          ),
        );
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        onSlotClick?.(days[index]);
        break;
    }
  };

  return (
    <div className={css.cal__month}>
      <div className={css.cal__month_weekdays} aria-hidden>
        {weekdayLabels.map((label, i) => (
          <span key={i} className={css.cal__month_weekday}>
            {label}
          </span>
        ))}
      </div>

      <div
        className={css.cal__month_grid}
        role="grid"
        aria-label="Календарь на месяц"
      >
        {chunk(days, 7).map((week, weekIndex) => (
          <div key={weekIndex} className={css.cal__month_row} role="row">
            {week.map((day, dayIndex) => {
              const index = weekIndex * 7 + dayIndex;
              const dayEvents = eventsForDay(events, day);
              const visible = dayEvents.slice(0, maxEventsPerDay);
              const overflow = dayEvents.length - visible.length;
              const outside = !isSameMonth(day, date);
              const isToday = isSameDay(day, today);

              return (
                <div
                  key={day.toISOString()}
                  ref={(el) => {
                    cellRefs.current[index] = el;
                  }}
                  role="gridcell"
                  tabIndex={index === focusedIndex ? 0 : -1}
                  aria-current={isToday ? "date" : undefined}
                  className={classNames(css.cal__cell, {
                    [css.cal__cell_outside]: outside,
                    [css.cal__cell_today]: isToday,
                  })}
                  onClick={() => onSlotClick?.(day)}
                  onFocus={() => setFocusedIndex(index)}
                  onKeyDown={(e) => handleGridKeyDown(e, index)}
                >
                  <time
                    dateTime={format(day, "yyyy-MM-dd")}
                    className={css.cal__cell_num}
                  >
                    {format(day, "d")}
                  </time>

                  <div className={css.cal__cell_events}>
                    {visible.map((event) => (
                      <EventChip key={event.id} event={event} />
                    ))}
                    {overflow > 0 ? (
                      <span className={css.cal__more}>+{overflow} ещё</span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export const MonthView = Object.assign(MonthViewImpl, {
  viewName: "month" as const,
});
