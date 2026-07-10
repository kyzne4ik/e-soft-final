import type { CalendarEvent } from "../types";

export interface PositionedEvent {
  event: CalendarEvent;
  columnIndex: number;
  columnCount: number;
}

function endOf(e: CalendarEvent): number {
  const start = e.start.getTime();
  const end = e.end ? e.end.getTime() : start;
  return Math.max(end, start + 1);
}

export function layoutOverlappingEvents(
  events: CalendarEvent[],
): PositionedEvent[] {
  const sorted = [...events].sort((a, b) => {
    const byStart = a.start.getTime() - b.start.getTime();
    return byStart !== 0 ? byStart : endOf(a) - endOf(b);
  });

  const result: PositionedEvent[] = [];

  let cluster: PositionedEvent[] = [];
  let columnEnds: number[] = [];
  let clusterMaxEnd = -Infinity;

  const flush = () => {
    const columnCount = columnEnds.length;
    for (const positioned of cluster) positioned.columnCount = columnCount;
    result.push(...cluster);
    cluster = [];
    columnEnds = [];
    clusterMaxEnd = -Infinity;
  };

  for (const event of sorted) {
    const start = event.start.getTime();

    if (cluster.length > 0 && start >= clusterMaxEnd) flush();

    let columnIndex = columnEnds.findIndex((columnEnd) => columnEnd <= start);
    if (columnIndex === -1) {
      columnIndex = columnEnds.length;
      columnEnds.push(endOf(event));
    } else {
      columnEnds[columnIndex] = endOf(event);
    }

    cluster.push({ event, columnIndex, columnCount: 0 });
    clusterMaxEnd = Math.max(clusterMaxEnd, endOf(event));
  }

  if (cluster.length > 0) flush();

  return result;
}
