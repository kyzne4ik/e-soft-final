import css from "./Toast.module.css";
import { Icon } from "../../atoms/icon";
import { Text } from "../../atoms/text";
import { useEffect, useState, memo } from "react";
import { classNames } from "../../libs/classNames";

const AUTO_DISMISS_MS = 4000;

export type ToastType = "info" | "success" | "warning" | "error";

export interface ToastProps {
  type?: ToastType;
  title?: string;
  message?: string;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
}

const ICON_BY_TYPE: Record<ToastType, string> = {
  info: "info",
  success: "check",
  warning: "triangle-alert",
  error: "circle-x",
};

function BaseToast({
  type = "info",
  title,
  message,
  closable = false,
  onClose,
  className,
}: ToastProps) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
  };

  const handleAnimationEnd = () => {
    if (!closing) return;
    onClose?.();
  };

  useEffect(() => {
    const timer = setTimeout(() => handleClose?.(), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, []);

  const align = title && message ? css.ui_toast__start : css.ui_toast__center;

  return (
    <div
      className={classNames(css.ui_toast, {}, [
        css[`ui_toast__${type}`],
        align,
        closing ? css.ui_toast__closing : undefined,
        className,
      ])}
      role="status"
      onAnimationEnd={handleAnimationEnd}
    >
      <span className={css.ui_toast__badge}>
        <Icon name={ICON_BY_TYPE[type]} size={18} />
      </span>

      <div className={css.ui_toast__body}>
        {title ? (
          <Text.P1Bold className={css.ui_toast__title}>{title}</Text.P1Bold>
        ) : null}
        {message ? (
          <Text.P2 className={css.ui_toast__msg}>{message}</Text.P2>
        ) : null}
      </div>

      {closable ? (
        <button
          type="button"
          className={css.ui_toast__close}
          onClick={handleClose}
          aria-label="Закрыть"
        >
          <Icon name="x" size={16} />
        </button>
      ) : null}
    </div>
  );
}

export const Toast = memo(BaseToast);
