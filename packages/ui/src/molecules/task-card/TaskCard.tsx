import type { ReactNode } from "react";
import { classNames } from "../../libs/classNames";
import { Card } from "../../atoms/card";
import { Icon } from "../../atoms/icon";
import { StatusBadge, type StatusKind } from "../status-badge";
import css from "./TaskCard.module.css";

export type TaskIconTone =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "neutral";

const TONE_CLASS: Record<TaskIconTone, string> = {
  primary: css.ui_tcard__primary,
  secondary: css.ui_tcard__secondary,
  info: css.ui_tcard__info,
  success: css.ui_tcard__success,
  warning: css.ui_tcard__warning,
  error: css.ui_tcard__error,
  neutral: css.ui_tcard__neutral,
};

export interface TaskCardProps {
  title: ReactNode;
  description?: string;
  status?: string;
  statusKind?: StatusKind;
  statusLabel?: string;
  deadline?: string;
  deadlineLabel?: string;
  icon?: string;
  iconTone?: TaskIconTone;
  onClick?: () => void;
  className?: string;
}

export function TaskCard({
  title,
  description,
  status,
  statusKind = "submission",
  statusLabel,
  deadline,
  deadlineLabel = "Дедлайн",
  icon = "file-code-2",
  iconTone = "secondary",
  onClick,
  className,
}: TaskCardProps) {
  return (
    <Card
      className={classNames(css.ui_tcard, {}, [className])}
      onClick={onClick}
    >
      <div className={css.ui_tcard__head}>
        <div
          className={classNames(css.ui_tcard__icon, {}, [TONE_CLASS[iconTone]])}
        >
          <Icon name={icon} size={22} />
        </div>

        {status ? (
          <StatusBadge status={status} kind={statusKind} label={statusLabel} />
        ) : null}
      </div>

      <h3 className={css.ui_tcard__title}>{title}</h3>

      {description ? <p className={css.ui_tcard__desc}>{description}</p> : null}

      {deadline ? (
        <div className={css.ui_tcard__footer}>
          <Icon name="calendar" size={15} />
          <span>
            {deadlineLabel} {deadline}
          </span>
        </div>
      ) : null}
    </Card>
  );
}
