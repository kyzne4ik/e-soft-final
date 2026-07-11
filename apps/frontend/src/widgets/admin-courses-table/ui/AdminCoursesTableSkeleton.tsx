import { Table } from "@repo/ui/organisms/table";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import { Pagination } from "@repo/ui/atoms/pagination";
import { CoursesTableHead } from "./AdminCoursesTableHead";
import css from "./AdminCoursesTable.module.css";

const ROWS = 6;

export function CoursesTableSkeleton() {
  return (
    <div className={css.wrapper}>
      <Table>
        <CoursesTableHead />
        <Table.Body>
          {Array.from({ length: ROWS }).map((_, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Skeleton width={160} height={14} border="6px" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton width={240} height={14} border="6px" />
              </Table.Cell>
              <Table.Cell align="right">
                <Skeleton width={18} height={18} border="6px" />
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
