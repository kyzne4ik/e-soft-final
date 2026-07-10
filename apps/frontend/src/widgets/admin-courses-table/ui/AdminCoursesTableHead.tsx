import { Table } from "@repo/ui/organisms/table";

export const COURSES_TABLE_COLSPAN = 3;

export function CoursesTableHead() {
  return (
    <Table.Head sticky>
      <Table.Row>
        <Table.HeaderCell>Название</Table.HeaderCell>
        <Table.HeaderCell>Описание</Table.HeaderCell>
        <Table.HeaderCell align="right" aria-label="Действие" />
      </Table.Row>
    </Table.Head>
  );
}
