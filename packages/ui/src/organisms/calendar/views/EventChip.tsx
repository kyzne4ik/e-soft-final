import { type CSSProperties, type KeyboardEvent } from "react";
import { format } from "date-fns";
import { Icon } from "../../../atoms/icon";
import { classNames } from "../../../libs/classNames";
import { useCalendar } from "../CalendarContext";
import { isTimedEvent } from "../lib/events";
import type { CalendarEvent } from "../types";
import css from "../Calendar.module.css";

export interface EventChipProps {
  event: CalendarEvent;
  showTime?: boolean;
  className?: string;
}

export function EventChip({
  event,
  showTime = true,
  className,
}: EventChipProps) {
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
    "--cal-ev-bg": style.bg,
    "--cal-ev-fg": style.fg,
  } as CSSProperties;

  return (
    <div
      className={classNames(
        css.cal__chip,
        { [css.cal__chip_clickable]: clickable },
        [className],
      )}
      style={vars}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={event.title}
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
          {style.icon ? (
            <Icon name={style.icon} size={12} className={css.cal__chip_icon} />
          ) : null}
          {showTime && isTimedEvent(event) ? (
            <span className={css.cal__chip_time}>
              {format(event.start, "HH:mm")}
            </span>
          ) : null}
          <span className={css.cal__chip_title}>{event.title}</span>
        </>
      )}
    </div>
  );
}
