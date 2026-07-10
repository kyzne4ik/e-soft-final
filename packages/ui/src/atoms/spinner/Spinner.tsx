import type { CSSProperties } from "react";
import { classNames } from "../../libs/classNames";
import css from "./Spinner.module.css";

export type SpinnerColor =
  "primary" | "success" | "warning" | "error" | "info" | "current";

const COLOR_CLASS: Record<SpinnerColor, string> = {
  primary: css.ui_spinner__primary,
  success: css.ui_spinner__success,
  warning: css.ui_spinner__warning,
  error: css.ui_spinner__error,
  info: css.ui_spinner__info,
  current: css.ui_spinner__current,
};

export interface SpinnerProps {
  size?: number;
  color?: SpinnerColor;
  label?: string;
  className?: string;
}

export function Spinner({
  size = 24,
  color = "primary",
  label = "Загрузка",
  className,
}: SpinnerProps) {
  const styles = {
    "--ui-spinner-size": `${size}px`,
  } as CSSProperties;

  return (
    <span
      className={classNames(css.ui_spinner, {}, [
        COLOR_CLASS[color],
        className,
      ])}
      style={styles}
      role="status"
      aria-label={label}
    />
  );
}
