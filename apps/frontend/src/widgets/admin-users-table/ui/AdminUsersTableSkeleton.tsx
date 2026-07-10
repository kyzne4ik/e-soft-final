import css from "./AdminUsersTable.module.css";
import { Table } from "@repo/ui/organisms/table";
import { AdminUsersTableHead } from "./AdminUsersTableHead";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import { Pagination } from "@repo/ui/atoms/pagination";

const ROWS = 6;

export function UsersTableSkeleton() {
  return (
    <div className={css.wrapper}>
      <Table>
        <AdminUsersTableHead />
        <Table.Body>
          {Array.from({ length: ROWS }).map((_, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <span className={css.user}>
                  <Skeleton
                    width={36}
                    height={36}
                    border="var(--radius-circle)"
                  />
                  <Skeleton width={150} height={14} border="6px" />
                </span>
              </Table.Cell>
              <Table.Cell>
                <Skeleton width={180} height={14} border="6px" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton width={78} height={22} border="var(--radius-pill)" />
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
