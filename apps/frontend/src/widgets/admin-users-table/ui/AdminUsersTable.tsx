import {
  AdminUsersTableHead,
  ADMIN_USERS_TABLE_COLSPAN,
} from "./AdminUsersTableHead";
import { AdminUserRow } from "./AdminUserRow";
import css from "./AdminUsersTable.module.css";
import type { UserQuery } from "@repo/schemas";
import { Table } from "@repo/ui/organisms/table";
import { ErrorBoundary } from "react-error-boundary";
import { TABLE_DEFAULT_LIMIT } from "@/shared/consts";
import { useUsersQuery } from "../model/useUsersQuery";
import { Pagination } from "@repo/ui/atoms/pagination";
import { ErrorHandler } from "@/shared/ui/error-handler";
import { UsersTableSkeleton } from "./AdminUsersTableSkeleton";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

export interface AdminUsersTableProps {
  query?: UserQuery;
}

export function AdminUsersTable(props: AdminUsersTableProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={ErrorHandler}>
          <AdminBaseUsersTable {...props} />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

function AdminBaseUsersTable({ query }: AdminUsersTableProps) {
  const { users, meta, isLoading, isFetching, setPage } = useUsersQuery(query);

  if (isLoading) return <UsersTableSkeleton />;

  return (
    <div
      className={`${css.wrapper} ${css.fadeIn}`}
      style={{
        opacity: isFetching ? 0.6 : 1,
        transition: "opacity 0.15s ease",
      }}
    >
      <Table>
        <AdminUsersTableHead />
        <Table.Body>
          {users.length === 0 ? (
            <Table.Empty
              colSpan={ADMIN_USERS_TABLE_COLSPAN}
              icon="users"
              message="Пользователи не найдены"
            />
          ) : (
            users.map((user) => <AdminUserRow key={user.id} user={user} />)
          )}
        </Table.Body>
      </Table>
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
