import type { KeyboardEvent } from "react";
import { classNames } from "../../libs/classNames";
import { Icon } from "../../atoms/icon";
import css from "./ScheduleEvent.module.css";

export type ScheduleEventKind = "lecture" | "seminar" | "deadline" | "default";

const KIND_CLASS: Record<ScheduleEventKind, string> = {
  lecture: css.ui_sevent__lecture,
  seminar: css.ui_sevent__seminar,
  deadline: css.ui_sevent__deadline,
  default: css.ui_sevent__default,
};

const DEFAULT_ICON: Record<ScheduleEventKind, string> = {
  lecture: "monitor-play",
  seminar: "users",
  deadline: "flag",
  default: "calendar",
};

export interface ScheduleEventProps {
  title: string;
  time?: string;
  tag?: string;
  kind?: ScheduleEventKind;
  icon?: string;
  onClick?: () => void;
  className?: string;
}

export function ScheduleEvent({
  title,
  time,
  tag,
  kind = "default",
  icon,
  onClick,
  className,
}: ScheduleEventProps) {
  const clickable = Boolean(onClick);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={classNames(
        css.ui_sevent,
        { [css.ui_sevent__clickable]: clickable },
        [KIND_CLASS[kind], className],
      )}
      onClick={onClick}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? handleKeyDown : undefined}
    >
      <div className={css.ui_sevent__icon}>
        <Icon name={icon ?? DEFAULT_ICON[kind]} size={22} />
      </div>

      <div className={css.ui_sevent__body}>
        <span className={css.ui_sevent__title}>{title}</span>

        {time || tag ? (
          <div className={css.ui_sevent__meta}>
            {time ? (
              <span className={css.ui_sevent__time}>
                <Icon name="clock" size={14} />
                {time}
              </span>
            ) : null}
            {tag ? <span className={css.ui_sevent__tag}>{tag}</span> : null}
          </div>
        ) : null}
      </div>
      {clickable ? (
        <Icon name="chevron-right" size={18} className={css.ui_sevent__chev} />
      ) : null}
    </div>
  );
}
