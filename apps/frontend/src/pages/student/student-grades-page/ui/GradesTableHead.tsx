import { Table } from "@repo/ui/organisms/table";

export const GRADES_TABLE_COLSPAN = 5;

export function GradesTableHead() {
  return (
    <Table.Head sticky>
      <Table.Row>
        <Table.HeaderCell>Задание</Table.HeaderCell>
        <Table.HeaderCell align="center">Статус</Table.HeaderCell>
        <Table.HeaderCell align="center">Оценка</Table.HeaderCell>
        <Table.HeaderCell align="center">Дата ревью</Table.HeaderCell>
        <Table.HeaderCell align="right">Комментарий</Table.HeaderCell>
      </Table.Row>
    </Table.Head>
  );
}
