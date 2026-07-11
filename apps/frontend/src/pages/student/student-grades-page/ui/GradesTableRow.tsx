import type { StudentPerformanceRow } from "@repo/schemas";
import { Table } from "@repo/ui/organisms/table";
import { StatusBadge } from "@repo/ui/molecules/status-badge";
import { formatDate } from "../model/useGradesQuery";
import css from "../StudentGradesPage.module.css";

interface GradesTableRowProps {
  row: StudentPerformanceRow;
}

export function GradesTableRow({ row }: GradesTableRowProps) {
  return (
    <Table.Row>
      <Table.Cell>
        <span className={css.task_title}>{row.title}</span>
      </Table.Cell>
      <Table.Cell align="center">
        {row.status ? (
          <StatusBadge status={row.status} kind="submission" />
        ) : (
          <span className={css.not_submitted}>Не сдано</span>
        )}
      </Table.Cell>
      <Table.Cell align="center">
        {row.score != null ? (
          <span className={css.score}>{row.score} / 100</span>
        ) : (
          <span className={css.dash}>—</span>
        )}
      </Table.Cell>
      <Table.Cell align="center">
        <span className={row.reviewedAt ? undefined : css.dash}>
          {formatDate(row.reviewedAt)}
        </span>
      </Table.Cell>
      <Table.Cell align="right">
        {row.comment ? (
          <span className={css.comment} title={row.comment}>
            {row.comment.length > 60
              ? `${row.comment.slice(0, 60)}…`
              : row.comment}
          </span>
        ) : (
          <span className={css.dash}>—</span>
        )}
      </Table.Cell>
    </Table.Row>
  );
}
