import { Avatar } from "@repo/ui/atoms/avatar";
import { Icon } from "@repo/ui/atoms/icon";
import { StatusBadge } from "@repo/ui/molecules/status-badge";
import type { PersonInfo } from "../../model/types";
import { prettyLink } from "../../model/formatters";
import css from "../SubmissionReviewModal.module.css";

interface StudentHeaderProps {
  student: PersonInfo;
  repoLink: string;
  status: string;
}

export function StudentHeader({
  student,
  repoLink,
  status,
}: StudentHeaderProps) {
  return (
    <div className={css.head}>
      <div className={css.student}>
        <Avatar person={student} size={44} />
        <div className={css.student_info}>
          <span className={css.student_name}>{student.name}</span>
          <a
            className={css.link}
            href={repoLink}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="git-branch" size={14} />
            {prettyLink(repoLink)}
          </a>
        </div>
      </div>
      <StatusBadge status={status} kind="submission" />
    </div>
  );
}
