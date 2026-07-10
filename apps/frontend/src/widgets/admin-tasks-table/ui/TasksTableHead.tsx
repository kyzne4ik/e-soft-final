import { Table } from "@repo/ui/organisms/table";

export const TASKS_TABLE_COLSPAN = 4;

export function TasksTableHead() {
  return (
    <Table.Head sticky>
      <Table.Row>
        <Table.HeaderCell>Название</Table.HeaderCell>
        <Table.HeaderCell>Дедлайн</Table.HeaderCell>
        <Table.HeaderCell>Репозиторий</Table.HeaderCell>
        <Table.HeaderCell align="right" aria-label="Действие" />
      </Table.Row>
    </Table.Head>
  );
}
