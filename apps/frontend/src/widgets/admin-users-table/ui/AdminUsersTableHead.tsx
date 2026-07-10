import { Table } from "@repo/ui/organisms/table";

export const ADMIN_USERS_TABLE_COLSPAN = 4;

export function AdminUsersTableHead() {
  return (
    <Table.Head sticky>
      <Table.Row>
        <Table.HeaderCell>Пользователь</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Роль</Table.HeaderCell>
        <Table.HeaderCell align="right" aria-label="Действие" />
      </Table.Row>
    </Table.Head>
  );
}
