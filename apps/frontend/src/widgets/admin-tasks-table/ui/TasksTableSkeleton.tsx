import css from "./TasksTable.module.css";
import { Table } from "@repo/ui/organisms/table";
import { TasksTableHead } from "./TasksTableHead";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import { Pagination } from "@repo/ui/atoms/pagination";

const ROWS = 6;

export function TasksTableSkeleton() {
  return (
    <div className={css.wrapper}>
      <Table>
        <TasksTableHead />
        <Table.Body>
          {Array.from({ length: ROWS }).map((_, i) => (
            <Table.Row key={i}>
              <Table.Cell>
                <Skeleton width={200} height={14} border="6px" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton width={100} height={14} border="6px" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton width={160} height={14} border="6px" />
              </Table.Cell>
              <Table.Cell align="right">
                <span style={{ display: "inline-flex", gap: 4 }}>
                  <Skeleton width={32} height={32} border="var(--radius-md)" />
                  <Skeleton width={32} height={32} border="var(--radius-md)" />
                </span>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pagination
        meta={{ page: 1, limit: 10, total: 100, totalPages: 10 }}
        onChange={() => {}}
        className={css.pagination}
      />
    </div>
  );
}
