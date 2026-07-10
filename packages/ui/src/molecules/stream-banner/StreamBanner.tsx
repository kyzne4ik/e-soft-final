import type { ReactNode } from "react";
import { classNames } from "../../libs/classNames";
import { StatusBadge } from "../status-badge";
import css from "./StreamBanner.module.css";

function pluralizeStudents(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "студент";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
    return "студента";
  return "студентов";
}

export interface StreamBannerProps {
  title: ReactNode;
  course?: string;
  studentsCount?: number;
  meta?: ReactNode;
  status?: string;
  statusLabel?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function StreamBanner({
  title,
  course,
  studentsCount,
  meta,
  status,
  statusLabel,
  active = false,
  onClick,
  className,
}: StreamBannerProps) {
  const clickable = Boolean(onClick);

  const metaContent =
    meta ??
    [
      course,
      typeof studentsCount === "number"
        ? `${studentsCount} ${pluralizeStudents(studentsCount)}`
        : undefined,
    ]
      .filter(Boolean)
      .join(" · ");

  const content = (
    <>
      <div className={css.ui_sbanner__body}>
        <h3 className={css.ui_sbanner__title}>{title}</h3>
        {metaContent ? (
          <p className={css.ui_sbanner__meta}>{metaContent}</p>
        ) : null}
      </div>

      {status ? (
        <span className={css.ui_sbanner__badge}>
          <StatusBadge status={status} kind="stream" label={statusLabel} />
        </span>
      ) : null}
    </>
  );

  const rootClass = classNames(
    css.ui_sbanner,
    {
      [css.ui_sbanner__active]: active,
      [css.ui_sbanner__clickable]: clickable,
    },
    [className],
  );

  if (clickable) {
    return (
      <button
        type="button"
        className={rootClass}
        onClick={onClick}
        aria-pressed={active}
      >
        {content}
      </button>
    );
  }

  return <div className={rootClass}>{content}</div>;
}
