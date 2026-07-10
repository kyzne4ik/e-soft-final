import { classNames } from "../../libs/classNames";
import css from "./ProgressBar.module.css";

export type ProgressBarColor =
  "primary" | "success" | "warning" | "error" | "info";

const COLOR_CLASS: Record<ProgressBarColor, string> = {
  primary: css.ui_pbar__fill__primary,
  success: css.ui_pbar__fill__success,
  warning: css.ui_pbar__fill__warning,
  error: css.ui_pbar__fill__error,
  info: css.ui_pbar__fill__info,
};

export interface ProgressBarProps {
  value: number;
  color?: ProgressBarColor;
}

const clamp = (value: number): number => Math.min(100, Math.max(0, value));

export function ProgressBar({ value, color = "primary" }: ProgressBarProps) {
  const pct = clamp(value);

  return (
    <div
      className={css.ui_pbar}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={classNames(css.ui_pbar__fill, {}, [COLOR_CLASS[color]])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
