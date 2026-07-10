import { Fragment } from "react";
import {
  ScheduleEvent,
  type ScheduleEventKind,
} from "../../molecules/schedule-event";
import css from "./Schedule.module.css";
import { classNames } from "../../libs/classNames";

export interface ScheduleEventItem {
  id: string;
  title: string;
  time?: string;
  tag?: string;
  kind?: ScheduleEventKind;
  icon?: string;
  onClick?: () => void;
}

export interface ScheduleDay {
  id: string;
  weekday: string;
  day: string | number;
  isToday?: boolean;
  events: ScheduleEventItem[];
}

export interface ScheduleProps {
  title?: string;
  subtitle?: string;
  days: ScheduleDay[];
  nowBeforeEventId?: string;
  nowLabel?: string;
  className?: string;
}

export function Schedule({
  title,
  subtitle,
  days,
  nowBeforeEventId,
  nowLabel = "Сейчас",
  className,
}: ScheduleProps) {
  return (
    <section className={classNames(css.ui_sched, {}, [className])}>
      {title || subtitle ? (
        <header className={css.ui_sched__head}>
          {title ? <h2 className={css.ui_sched__title}>{title}</h2> : null}
          {subtitle ? (
            <p className={css.ui_sched__subtitle}>{subtitle}</p>
          ) : null}
        </header>
      ) : null}
      <div className={css.ui_sched__body}>
        {days.map((day) => (
          <div key={day.id} className={css.ui_sched__row}>
            <div
              className={classNames(css.ui_sched__gutter, {
                [css.ui_sched__gutter_today]: day.isToday,
              })}
            >
              <span className={css.ui_sched__weekday}>{day.weekday}</span>
              <span className={css.ui_sched__day}>{day.day}</span>
            </div>
            <div className={css.ui_sched__events}>
              {day.events.map((event) => (
                <Fragment key={event.id}>
                  {event.id === nowBeforeEventId ? (
                    <div className={css.ui_sched__now} aria-label={nowLabel}>
                      <span className={css.ui_sched__now_dot} />
                      <span className={css.ui_sched__now_label}>
                        {nowLabel}
                      </span>
                      <span className={css.ui_sched__now_line} />
                    </div>
                  ) : null}
                  <ScheduleEvent
                    title={event.title}
                    time={event.time}
                    tag={event.tag}
                    kind={event.kind}
                    icon={event.icon}
                    onClick={event.onClick}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
