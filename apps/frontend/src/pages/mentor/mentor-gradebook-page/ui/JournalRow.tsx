import {
  formatDate,
  calcProgress,
  STATUS_LABEL,
  STATUS_CLASS,
} from "../model/formatters";
import { Avatar } from "@repo/ui/atoms/avatar";
import { Table } from "@repo/ui/organisms/table";
import css from "../MentorGradebookPage.module.css";
import type { MentorJournalRow } from "@repo/schemas";
import { toPerson } from "@/features/open-submission/model/person";
import { CreateNotificationButton } from "@/features/create-notification";

interface JournalRowProps {
  row: MentorJournalRow;
}

export function JournalRow({ row }: JournalRowProps) {
  const person = toPerson(
    row.studentId,
    row.studentFirstName,
    row.studentLastName,
  );
  const progress = calcProgress(row.submittedTasks, row.totalTasks);
  const accepted = calcProgress(row.acceptedTasks, row.totalTasks);

  return (
    <Table.Row>
      <Table.Cell>
        <div className={css.student_cell}>
          <Avatar person={person} size={32} />
          <span className={css.student_name}>{person.name}</span>
        </div>
      </Table.Cell>
      <Table.Cell align="center">
        <span
          className={`${css.status_badge} ${STATUS_CLASS[row.studentStatus]}`}
        >
          {STATUS_LABEL[row.studentStatus]}
        </span>
      </Table.Cell>
      <Table.Cell align="center">
        <span className={css.progress}>
          {row.submittedTasks} / {row.totalTasks}
          <span className={css.progress_pct}>{progress}%</span>
        </span>
      </Table.Cell>
      <Table.Cell align="center">
        <span className={css.accepted}>
          {row.acceptedTasks} / {row.totalTasks}
          <span className={css.progress_pct}>{accepted}%</span>
        </span>
      </Table.Cell>
      <Table.Cell align="center">
        {row.averageScore != null ? (
          <span className={css.score}>{row.averageScore}</span>
        ) : (
          <span className={css.dash}>—</span>
        )}
      </Table.Cell>
      <Table.Cell align="center">
        <span className={css.date}>{formatDate(row.lastActivityAt)}</span>
      </Table.Cell>
      <Table.Cell align="right">
        <span className={css.actions}>
          <CreateNotificationButton
            defaultUserId={String(row.studentUserId)}
            sub={person.name}
          />
        </span>
      </Table.Cell>
    </Table.Row>
  );
}
