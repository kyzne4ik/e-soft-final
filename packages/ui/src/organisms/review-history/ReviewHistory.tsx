import type { ReactNode } from "react";
import css from "./ReviewHistory.module.css";
import { classNames } from "../../libs/classNames";
import { Avatar, type AvatarPerson } from "../../atoms/avatar";

export interface ReviewHistoryProps {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ReviewHistory({
  title = "История ревью",
  children,
  className,
}: ReviewHistoryProps) {
  return (
    <section className={classNames(css.ui_rh, {}, [className])}>
      {title ? <div className={css.ui_rh__title}>{title}</div> : null}
      <ol className={css.ui_rh__list}>{children}</ol>
    </section>
  );
}

export interface ReviewHistoryItemProps {
  author: AvatarPerson;
  time?: ReactNode;
  active?: boolean;
  children?: ReactNode;
  className?: string;
}

ReviewHistory.Item = function ReviewHistoryItem({
  author,
  time,
  active = false,
  children,
  className,
}: ReviewHistoryItemProps) {
  return (
    <li className={classNames(css.ui_rh__item, {}, [className])}>
      <div className={css.ui_rh__marker}>
        <span
          className={classNames(css.ui_rh__dot, {
            [css.ui_rh__dot__active]: active,
          })}
          aria-hidden
        />
      </div>

      <div className={css.ui_rh__body}>
        <div className={css.ui_rh__header}>
          <Avatar person={author} size={24} />
          <span className={css.ui_rh__name}>{author.name}</span>
          {time ? (
            <>
              <span className={css.ui_rh__sep} aria-hidden>
                ·
              </span>
              <span className={css.ui_rh__time}>{time}</span>
            </>
          ) : null}
        </div>

        {children ? <div className={css.ui_rh__content}>{children}</div> : null}
      </div>
    </li>
  );
};

export interface ReviewHistorySlotProps {
  children: ReactNode;
  className?: string;
}

ReviewHistory.Meta = function ReviewHistoryMeta({
  children,
  className,
}: ReviewHistorySlotProps) {
  return (
    <div className={classNames(css.ui_rh__meta, {}, [className])}>
      {children}
    </div>
  );
};

ReviewHistory.Message = function ReviewHistoryMessage({
  children,
  className,
}: ReviewHistorySlotProps) {
  return (
    <div className={classNames(css.ui_rh__message, {}, [className])}>
      {children}
    </div>
  );
};
