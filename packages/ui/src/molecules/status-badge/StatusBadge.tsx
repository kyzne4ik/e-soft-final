import { classNames } from "../../libs/classNames";
import { Icon } from "../../atoms/icon";
import css from "./StatusBadge.module.css";

export type StatusKind = "submission" | "lead" | "stream";

type BadgeTone =
  "neutral" | "info" | "success" | "warning" | "error" | "primary" | "highprio";

interface BadgeMeta {
  tone: BadgeTone;
  text: string;
  icon?: string;
}

const SUBMISSION_MAP: Record<string, BadgeMeta> = {
  NEW: { tone: "neutral", text: "Новое" },
  REVIEWING: { tone: "info", text: "На ревью" },
  CHANGES_REQUESTED: { tone: "error", text: "Доработка" },
  RESUBMITTED: { tone: "highprio", text: "Доработано", icon: "refresh-cw" },
  ACCEPTED: { tone: "success", text: "Зачтено", icon: "check" },
  ARCHIVED: { tone: "neutral", text: "В архиве" },
};

const LEAD_MAP: Record<string, BadgeMeta> = {
  NEW: { tone: "neutral", text: "Новый" },
  IN_REVIEW: { tone: "info", text: "Проверка" },
  ACCEPTED: { tone: "success", text: "Принят", icon: "check" },
  REJECTED: { tone: "error", text: "Отказ" },
  IGNORED: { tone: "warning", text: "Игнор" },
  LOST: { tone: "neutral", text: "Потерян" },
};

const STREAM_MAP: Record<string, BadgeMeta> = {
  ENROLLING: { tone: "info", text: "Набор" },
  IN_PROGRESS: { tone: "success", text: "Идёт" },
  FINISHED: { tone: "neutral", text: "Завершён" },
};

const MAPS: Record<StatusKind, Record<string, BadgeMeta>> = {
  submission: SUBMISSION_MAP,
  lead: LEAD_MAP,
  stream: STREAM_MAP,
};

export interface StatusBadgeProps {
  status: string;
  kind?: StatusKind;
  label?: string;
}

export function StatusBadge({
  status,
  kind = "submission",
  label,
}: StatusBadgeProps) {
  const meta = MAPS[kind][status] ?? { tone: "neutral", text: status };

  return (
    <span
      className={classNames(css.ui_sbadge, {}, [
        css[`ui_sbadge__${meta.tone}`],
      ])}
    >
      {meta.icon ? <Icon name={meta.icon} size={13} /> : null}
      {label ?? meta.text}
    </span>
  );
}
