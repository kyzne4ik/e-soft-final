import type { ButtonHTMLAttributes } from "react";
import { classNames } from "../../libs/classNames";
import { Icon } from "../../atoms/icon";
import css from "./NotificationBell.module.css";

export interface NotificationBellProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type"
> {
  count?: number;
  max?: number;
  active?: boolean;
}

export function NotificationBell({
  count = 0,
  max = 9,
  active = false,
  className,
  "aria-label": ariaLabel,
  ...rest
}: NotificationBellProps) {
  const hasUnread = count > 0;
  const label = count > max ? `${max}+` : String(count);

  return (
    <button
      type="button"
      className={classNames(css.ui_bell, { [css.ui_bell__active]: active }, [
        className,
      ])}
      aria-label={
        ariaLabel ??
        (hasUnread ? `Уведомления, непрочитанных: ${count}` : "Уведомления")
      }
      {...rest}
    >
      <Icon name="bell" size={20} />
      {hasUnread ? (
        <span className={css.ui_bell__badge} aria-hidden>
          {label}
        </span>
      ) : null}
    </button>
  );
}
