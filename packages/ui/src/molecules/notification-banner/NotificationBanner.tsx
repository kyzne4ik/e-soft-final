import {
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { classNames } from "../../libs/classNames";
import { Icon } from "../../atoms/icon";
import css from "./NotificationBanner.module.css";

export interface NotificationBannerProps {
  title: ReactNode;
  time?: ReactNode;
  icon?: string;
  isRead?: boolean;
  onClick?: () => void;
}

export function NotificationBanner({
  title,
  time,
  icon,
  isRead = false,
  onClick,
}: NotificationBannerProps) {
  const isClickable = Boolean(onClick);
  const isUnread = !isRead;

  const [isExpanded, setIsExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const titleRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el || isExpanded) return;

    const measure = () => setCanExpand(el.scrollHeight > el.clientHeight + 1);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [title, isExpanded]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  const toggleExpanded = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsExpanded((value) => !value);
  };

  return (
    <div
      className={classNames(css.ui_notification_banner, {
        [css.ui_notification_banner__unread]: isUnread,
        [css.ui_notification_banner__clickable]: isClickable,
      })}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {icon && (
        <div
          className={classNames(css.ui_notification_banner__icon, {
            [css.ui_notification_banner__icon__unread]: isUnread,
          })}
        >
          <Icon name={icon} size={20} />
        </div>
      )}

      <div className={css.ui_notification_banner__body}>
        <span
          ref={titleRef}
          className={classNames(css.ui_notification_banner__title, {
            [css.ui_notification_banner__title__clamped]: !isExpanded,
          })}
        >
          {title}
        </span>

        {(canExpand || isExpanded) && (
          <button
            type="button"
            className={css.ui_notification_banner__toggle}
            onClick={toggleExpanded}
            onKeyDown={(event) => event.stopPropagation()}
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Свернуть" : "Показать полностью"}
            <Icon
              name="chevron-down"
              size={14}
              className={classNames(css.ui_notification_banner__chevron, {
                [css.ui_notification_banner__chevron__open]: isExpanded,
              })}
            />
          </button>
        )}

        {time ? (
          <span className={css.ui_notification_banner__time}>{time}</span>
        ) : null}
      </div>

      {isUnread ? (
        <span className={css.ui_notification_banner__dot} aria-hidden />
      ) : null}
    </div>
  );
}
