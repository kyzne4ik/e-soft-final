import { Table } from "@repo/ui/organisms/table";

export const SCHEDULE_TABLE_COLSPAN = 6;

export function ScheduleTableHead() {
  return (
    <Table.Head sticky>
      <Table.Row>
        <Table.HeaderCell>Тема</Table.HeaderCell>
        <Table.HeaderCell>Дата</Table.HeaderCell>
        <Table.HeaderCell>Время</Table.HeaderCell>
        <Table.HeaderCell>Трансляция</Table.HeaderCell>
        <Table.HeaderCell>Запись</Table.HeaderCell>
        <Table.HeaderCell align="right" aria-label="Действие" />
      </Table.Row>
    </Table.Head>
  );
}
