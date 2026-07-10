import { useMemo, type CSSProperties, type KeyboardEvent } from "react";
import { eachDayOfInterval, format, isSameDay, startOfDay } from "date-fns";
import { ru } from "date-fns/locale";
import { Icon } from "../../../atoms/icon";
import { classNames } from "../../../libs/classNames";
import { useCalendar } from "../CalendarContext";
import {
  timedEventsForDay,
  allDayEventsForDay,
  computeVerticalPosition,
} from "../lib/events";
import { layoutOverlappingEvents } from "../lib/layout";
import type { CalendarEvent } from "../types";
import { EventChip } from "./EventChip";
import css from "../Calendar.module.css";

const HOUR_PX = 48;

export interface TimeGridProps {
  days: 1 | 7;
}

export function TimeGrid({ days }: TimeGridProps) {
  const { date, range, events, dayStartHour, dayEndHour, onSlotClick } =
    useCalendar();

  const columns = useMemo<Date[]>(() => {
    if (days === 7) {
      return eachDayOfInterval({ start: range.from, end: range.to });
    }
    return [startOfDay(date)];
  }, [days, range.from, range.to, date]);

  const hours = useMemo(() => {
    const out: number[] = [];
    for (let h = dayStartHour; h < dayEndHour; h += 1) out.push(h);
    return out;
  }, [dayStartHour, dayEndHour]);

  const gridHeight = hours.length * HOUR_PX;
  const today = new Date();

  const slotClick = (day: Date, hour: number) => {
    const slot = new Date(day);
    slot.setHours(hour, 0, 0, 0);
    onSlotClick?.(slot);
  };

  return (
    <div
      className={classNames(css.cal__grid, { [css.cal__grid_day]: days === 1 })}
    >
      <div className={css.cal__grid_head}>
        <div className={css.cal__grid_corner} />
        {columns.map((day) => {
          const isToday = isSameDay(day, today);
          return (
            <div
              key={day.toISOString()}
              className={classNames(css.cal__col_head, {
                [css.cal__col_head_today]: isToday,
              })}
            >
              <span className={css.cal__col_weekday}>
                {format(day, "EEEEEE", { locale: ru })}
              </span>
              <time
                dateTime={format(day, "yyyy-MM-dd")}
                className={css.cal__col_day}
              >
                {format(day, "d")}
              </time>
            </div>
          );
        })}
      </div>

      <div className={css.cal__allday}>
        <div className={css.cal__allday_label}>весь день</div>
        {columns.map((day) => {
          const items = allDayEventsForDay(events, day);
          return (
            <div
              key={day.toISOString()}
              className={css.cal__allday_col}
              onClick={() => onSlotClick?.(startOfDay(day))}
            >
              {items.map((event) => (
                <EventChip key={event.id} event={event} showTime={false} />
              ))}
            </div>
          );
        })}
      </div>

      <div className={css.cal__grid_scroll}>
        <div className={css.cal__grid_inner} style={{ height: gridHeight }}>
          <div className={css.cal__axis}>
            {hours.map((h) => (
              <div
                key={h}
                className={css.cal__axis_row}
                style={{ height: HOUR_PX }}
              >
                <span className={css.cal__axis_label}>
                  {String(h).padStart(2, "0")}:00
                </span>
              </div>
            ))}
          </div>

          <div className={css.cal__cols}>
            {columns.map((day) => (
              <DayColumn
                key={day.toISOString()}
                day={day}
                hours={hours}
                today={today}
                onSlot={slotClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface DayColumnProps {
  day: Date;
  hours: number[];
  today: Date;
  onSlot: (day: Date, hour: number) => void;
}

function DayColumn({ day, hours, today, onSlot }: DayColumnProps) {
  const { events, dayStartHour, dayEndHour } = useCalendar();

  const positioned = useMemo(() => {
    const timed = timedEventsForDay(events, day);
    return layoutOverlappingEvents(timed);
  }, [events, day]);

  const nowTop = useMemo(() => {
    if (!isSameDay(day, today)) return null;
    const minutes = (today.getHours() - dayStartHour) * 60 + today.getMinutes();
    const total = (dayEndHour - dayStartHour) * 60;
    if (minutes < 0 || minutes > total) return null;
    return (minutes / total) * 100;
  }, [day, today, dayStartHour, dayEndHour]);

  return (
    <div className={css.cal__col}>
      {hours.map((h) => (
        <button
          key={h}
          type="button"
          className={css.cal__slot}
          style={{ height: 48 }}
          aria-label={`${String(h).padStart(2, "0")}:00 ${format(day, "d MMMM", { locale: ru })}`}
          onClick={() => onSlot(day, h)}
        />
      ))}

      {positioned.map(({ event, columnIndex, columnCount }) => {
        const pos = computeVerticalPosition(
          event,
          day,
          dayStartHour,
          dayEndHour,
        );
        if (!pos) return null;
        const width = 100 / columnCount;
        return (
          <TimeBlock
            key={event.id}
            event={event}
            top={pos.top}
            height={pos.height}
            left={columnIndex * width}
            width={width}
          />
        );
      })}

      {nowTop !== null ? (
        <div className={css.cal__now} style={{ top: `${nowTop}%` }} aria-hidden>
          <span className={css.cal__now_dot} />
        </div>
      ) : null}
    </div>
  );
}

interface TimeBlockProps {
  event: CalendarEvent;
  top: number;
  height: number;
  left: number;
  width: number;
}

function TimeBlock({ event, top, height, left, width }: TimeBlockProps) {
  const { onEventClick, renderEvent, resolveKind } = useCalendar();
  const style = resolveKind(event.kind);
  const clickable = Boolean(onEventClick);

  const activate = () => onEventClick?.(event);
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activate();
    }
  };

  const vars = {
    top: `${top}%`,
    height: `${height}%`,
    left: `calc(${left}% + 2px)`,
    width: `calc(${width}% - 4px)`,
    "--cal-ev-bg": style.bg,
    "--cal-ev-fg": style.fg,
  } as CSSProperties;

  return (
    <div
      className={classNames(css.cal__block, {
        [css.cal__block_clickable]: clickable,
      })}
      style={vars}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={`${event.title}, ${format(event.start, "HH:mm")}`}
      onClick={
        clickable
          ? (e) => {
              e.stopPropagation();
              activate();
            }
          : undefined
      }
      onKeyDown={clickable ? handleKeyDown : undefined}
    >
      {renderEvent ? (
        renderEvent(event)
      ) : (
        <>
          <span className={css.cal__block_title}>
            {style.icon ? <Icon name={style.icon} size={12} /> : null}
            {event.title}
          </span>
          <span className={css.cal__block_time}>
            {format(event.start, "HH:mm")}
            {event.end ? `–${format(event.end, "HH:mm")}` : ""}
          </span>
        </>
      )}
    </div>
  );
}
