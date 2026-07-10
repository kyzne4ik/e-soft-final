import { Icon } from "@repo/ui/atoms/icon";
import { Table } from "@repo/ui/organisms/table";
import css from "../StudentGradesPage.module.css";
import { GradesTableRow } from "./GradesTableRow";
import { GradesTableHead } from "./GradesTableHead";
import { useGradesQuery } from "../model/useGradesQuery";
import { GradesTableSkeleton } from "./GradesTableSkeleton";

export interface GradesTableProps {
  streamId: number;
  streamName: string;
}

export function GradesTable({ streamId, streamName }: GradesTableProps) {
  const { rows, avg, isLoading } = useGradesQuery(streamId);

  return (
    <div className={css.workspace}>
      <div className={css.workspace_head}>
        <span className={css.workspace_title}>{streamName}</span>
        {avg != null && (
          <span className={css.avg_badge}>
            <Icon name="award" size={15} />
            Средний балл: <strong>{avg}</strong>
          </span>
        )}
      </div>
      <div className={css.workspace_body}>
        {isLoading ? (
          <GradesTableSkeleton />
        ) : rows.length === 0 ? (
          <div className={css.empty}>Нет заданий в этом потоке</div>
        ) : (
          <Table>
            <GradesTableHead />
            <Table.Body>
              {rows.map((row) => (
                <GradesTableRow key={row.taskId} row={row} />
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    </div>
  );
}
