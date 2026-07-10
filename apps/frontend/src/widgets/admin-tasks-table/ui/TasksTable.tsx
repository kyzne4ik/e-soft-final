import { TaskRow } from "./TaskRow";
import css from "./TasksTable.module.css";
import type { TaskQuery } from "@repo/schemas";
import { Table } from "@repo/ui/organisms/table";
import { ErrorBoundary } from "react-error-boundary";
import { TABLE_DEFAULT_LIMIT } from "@/shared/consts";
import { useTasksQuery } from "../model/useTasksQuery";
import { Pagination } from "@repo/ui/atoms/pagination";
import { ErrorHandler } from "@/shared/ui/error-handler";
import { TasksTableSkeleton } from "./TasksTableSkeleton";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { TasksTableHead, TASKS_TABLE_COLSPAN } from "./TasksTableHead";

export interface TasksTableProps {
  streamId: number;
  query?: Omit<TaskQuery, "streamId">;
}

export function TasksTable(props: TasksTableProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={ErrorHandler}>
          <BaseTasksTable {...props} />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

function BaseTasksTable({ streamId, query }: TasksTableProps) {
  const { tasks, meta, isLoading, isFetching, setPage } = useTasksQuery(
    streamId,
    query,
  );

  if (isLoading) return <TasksTableSkeleton />;

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
          <TasksTableHead />
          <Table.Body>
            {tasks.length === 0 ? (
              <Table.Empty
                colSpan={TASKS_TABLE_COLSPAN}
                icon="book-open"
                message="Заданий пока нет"
              />
            ) : (
              tasks.map((task) => <TaskRow key={task.id} task={task} />)
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
