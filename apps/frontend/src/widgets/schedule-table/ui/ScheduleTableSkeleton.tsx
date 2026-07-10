import css from "./ScheduleTable.module.css";
import { Table } from "@repo/ui/organisms/table";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import { ScheduleTableHead } from "./ScheduleTableHead";

const ROWS = 6;

export function ScheduleTableSkeleton() {
  return (
    <div className={css.wrapper}>
      <div className={css.table_area}>
        <Table maxHeight="100%">
          <ScheduleTableHead />
          <Table.Body>
            {Array.from({ length: ROWS }).map((_, i) => (
              <Table.Row key={i}>
                <Table.Cell>
                  <Skeleton width={200} height={14} border="6px" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton width={90} height={14} border="6px" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton width={80} height={14} border="6px" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton width={110} height={14} border="6px" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton width={80} height={14} border="6px" />
                </Table.Cell>
                <Table.Cell align="right">
                  <span style={{ display: "inline-flex", gap: 4 }}>
                    <Skeleton
                      width={32}
                      height={32}
                      border="var(--radius-md)"
                    />
                    <Skeleton
                      width={32}
                      height={32}
                      border="var(--radius-md)"
                    />
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
