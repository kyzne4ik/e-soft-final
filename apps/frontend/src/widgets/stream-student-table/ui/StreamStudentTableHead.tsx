import { Table } from "@repo/ui/organisms/table";

export function StreamStudentTableHead() {
  return (
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell>Студент</Table.HeaderCell>
        <Table.HeaderCell>Ментор</Table.HeaderCell>
        <Table.HeaderCell>Статус</Table.HeaderCell>
        <Table.HeaderCell align="right" aria-label="Действие" />
      </Table.Row>
    </Table.Head>
  );
}
