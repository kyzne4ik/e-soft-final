import { JournalRow } from "./JournalRow";
import { Table } from "@repo/ui/organisms/table";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import css from "../MentorGradebookPage.module.css";
import { WidgetBoundary } from "@/shared/ui/widget-boundary";
import { useJournalQuery } from "../model/useJournalQuery";

interface JournalTableProps {
  streamId: number;
}

export function JournalTable({ streamId }: JournalTableProps) {
  return (
    <WidgetBoundary message="Не удалось загрузить журнал">
      <JournalTableBase streamId={streamId} />
    </WidgetBoundary>
  );
}

function JournalTableBase({ streamId }: JournalTableProps) {
  const { rows, isLoading } = useJournalQuery(streamId);

  if (isLoading) {
    return (
      <div className={css.skeletons}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} height={52} border="var(--radius-sm)" />
        ))}
      </div>
    );
  }

  return (
    <Table>
      <Table.Head sticky>
        <Table.Row>
          <Table.HeaderCell>Студент</Table.HeaderCell>
          <Table.HeaderCell align="center">Статус</Table.HeaderCell>
          <Table.HeaderCell align="center">Сдано</Table.HeaderCell>
          <Table.HeaderCell align="center">Зачтено</Table.HeaderCell>
          <Table.HeaderCell align="center">Ср. балл</Table.HeaderCell>
          <Table.HeaderCell align="center">Активность</Table.HeaderCell>
          <Table.HeaderCell align="right">Уведомление</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {rows.length === 0 ? (
          <Table.Empty colSpan={7} message="Студентов в этом потоке пока нет" />
        ) : (
          rows.map((row) => <JournalRow key={row.studentId} row={row} />)
        )}
      </Table.Body>
    </Table>
  );
}
