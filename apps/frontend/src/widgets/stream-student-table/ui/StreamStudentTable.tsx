import { StudentRow } from "./StudentRow";
import { Input } from "@repo/ui/atoms/input";
import { Table } from "@repo/ui/organisms/table";
import css from "./StreamStudentTable.module.css";
import { WidgetBoundary } from "@/shared/ui/widget-boundary";
import { StreamStudentTableHead } from "./StreamStudentTableHead";
import { AddStudentButton } from "@/features/add-student-to-stream";
import { useStreamStudentQuery } from "../model/useStreamStudentQuery";
import { StreamStudentTableSkeleton } from "./StreamStudentTableSkeleton";

export interface StreamStudentTableProps {
  streamId: number;
}

export function StreamStudentTable({ streamId }: StreamStudentTableProps) {
  return (
    <WidgetBoundary message="Не удалось загрузить студентов">
      <StreamStudentTableBase streamId={streamId} />
    </WidgetBoundary>
  );
}

function StreamStudentTableBase({ streamId }: StreamStudentTableProps) {
  const { filtered, mentorName, isLoading, search, setSearch } =
    useStreamStudentQuery(streamId);

  return (
    <div>
      <div className={css.toolbar}>
        <Input
          className={css.search}
          fullWidth
          placeholder="Поиск студента"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <AddStudentButton streamId={streamId} />
      </div>
      {isLoading ? (
        <StreamStudentTableSkeleton />
      ) : (
        <Table>
          <StreamStudentTableHead />
          <Table.Body>
            {filtered.length === 0 ? (
              <Table.Empty
                colSpan={4}
                icon="users"
                message="Студенты не найдены"
              />
            ) : (
              filtered.map((student) => (
                <StudentRow
                  key={student.studentId}
                  streamId={streamId}
                  student={student}
                  mentorName={mentorName.get(student.mentorId ?? -1)}
                />
              ))
            )}
          </Table.Body>
        </Table>
      )}
    </div>
  );
}
