import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { LessonRow } from "./LessonRow";
import css from "./ScheduleTable.module.css";
import type { LessonQuery } from "@repo/schemas";
import { Table } from "@repo/ui/organisms/table";
import { ErrorBoundary } from "react-error-boundary";
import { TABLE_DEFAULT_LIMIT } from "@/shared/consts";
import { Pagination } from "@repo/ui/atoms/pagination";
import { ErrorHandler } from "@/shared/ui/error-handler";
import { useScheduleQuery } from "../model/useScheduleQuery";
import { ScheduleTableSkeleton } from "./ScheduleTableSkeleton";
import { ScheduleTableHead, SCHEDULE_TABLE_COLSPAN } from "./ScheduleTableHead";

export interface ScheduleTableProps {
  streamId: number;
  query?: Omit<LessonQuery, "streamId">;
}

export function ScheduleTable(props: ScheduleTableProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={ErrorHandler}>
          <BaseScheduleTable {...props} />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

function BaseScheduleTable({ streamId, query }: ScheduleTableProps) {
  const { lessons, meta, isLoading, isFetching, setPage } = useScheduleQuery(
    streamId,
    query,
  );

  if (isLoading) return <ScheduleTableSkeleton />;

  return (
    <div
      className={`${css.wrapper} ${css.fadeIn}`}
      style={{
        opacity: isFetching ? 0.6 : 1,
        transition: "opacity 0.15s ease",
      }}
    >
      <div className={css.table_area}>
        <Table maxHeight="100%">
          <ScheduleTableHead />
          <Table.Body>
            {lessons.length === 0 ? (
              <Table.Empty
                colSpan={SCHEDULE_TABLE_COLSPAN}
                icon="calendar"
                message="Занятий пока нет"
              />
            ) : (
              lessons.map((lesson) => (
                <LessonRow key={lesson.id} lesson={lesson} />
              ))
            )}
          </Table.Body>
        </Table>
      </div>
      {meta && meta.total > TABLE_DEFAULT_LIMIT && (
        <Pagination
          meta={{
            page: meta.page,
            limit: meta.limit,
            total: meta.total,
            totalPages: Math.ceil(meta.total / meta.limit),
          }}
          onChange={setPage}
          className={css.pagination}
        />
      )}
    </div>
  );
}
