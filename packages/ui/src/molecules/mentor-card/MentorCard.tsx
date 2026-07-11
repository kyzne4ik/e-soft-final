import { type ReactNode, useState } from "react";
import { Avatar } from "../../atoms/avatar";
import { Icon } from "../../atoms/icon";
import { classNames } from "../../libs/classNames";
import css from "./MentorCard.module.css";

export interface MentorCardPerson {
  name: string;
  initials: string;
  color: string;
  email?: string | null;
}

export interface MentorCardProps {
  mentor: MentorCardPerson;
  studentCount: number;
  highLoadThreshold?: number;
  children?: ReactNode;
  chips?: ReactNode;
}

export function MentorCard({
  mentor,
  studentCount,
  highLoadThreshold = 8,
  children,
  chips,
}: MentorCardProps) {
  const [open, setOpen] = useState(false);
  const isHighLoad = studentCount >= highLoadThreshold;

  return (
    <div className={css.card}>
      <button
        type="button"
        className={css.head}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Avatar person={mentor} size={32} />
        <span className={css.meta}>
          <span className={css.name}>{mentor.name}</span>
          {mentor.email ? (
            <span className={css.sub}>{mentor.email}</span>
          ) : null}
        </span>
        <span
          className={classNames(css.count, {}, [
            isHighLoad ? css.count__warn : css.count__ok,
          ])}
        >
          {studentCount} студ.
        </span>
        <Icon
          name="chevron-down"
          size={16}
          className={classNames(css.chevron, { [css.chevron__open]: open })}
        />
      </button>

      {open && (
        <div className={css.body}>
          {chips}
          {children}
        </div>
      )}
    </div>
  );
}
