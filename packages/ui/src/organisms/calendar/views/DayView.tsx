import { TimeGrid } from "./TimeGrid";

function DayViewImpl() {
  return <TimeGrid days={1} />;
}

export const DayView = Object.assign(DayViewImpl, { viewName: "day" as const });
