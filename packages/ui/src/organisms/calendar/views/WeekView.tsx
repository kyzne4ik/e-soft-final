import { TimeGrid } from "./TimeGrid";

function WeekViewImpl() {
  return <TimeGrid days={7} />;
}

export const WeekView = Object.assign(WeekViewImpl, {
  viewName: "week" as const,
});
