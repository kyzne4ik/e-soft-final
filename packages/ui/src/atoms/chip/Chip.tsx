import type { ReactNode } from "react";
import { classNames } from "../../libs/classNames";
import css from "./Chip.module.css";

export type ChipKind = "filter" | "status";
export type ChipStatus = "completed" | "in-progress" | "not-started" | "locked";

const STATUS_CLASS: Record<ChipStatus, string> = {
  completed: css.ui_chip__completed,
  "in-progress": css.ui_chip__in_progress,
  "not-started": css.ui_chip__not_started,
  locked: css.ui_chip__locked,
};

export interface ChipProps {
  children: ReactNode;
  kind?: ChipKind;
  selected?: boolean;
  status?: ChipStatus;
  onClick?: () => void;
}

export function Chip({
  children,
  kind = "filter",
  selected = false,
  status = "not-started",
  onClick,
}: ChipProps) {
  if (kind === "status") {
    return (
      <span
        className={classNames(css.ui_chip, {}, [
          css.ui_chip__status,
          STATUS_CLASS[status],
        ])}
      >
        {children}
      </span>
    );
  }

  return (
    <button
      type="button"
      className={classNames(
        css.ui_chip,
        { [css.ui_chip__selected]: selected },
        [css.ui_chip__filter],
      )}
      aria-pressed={selected}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
