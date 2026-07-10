import { Tabs } from "../../../molecules/tabs";
import { useCalendar } from "../CalendarContext";
import type { CalendarView } from "../types";

const OPTIONS: { value: CalendarView; label: string }[] = [
  { value: "month", label: "Месяц" },
  { value: "week", label: "Неделя" },
  { value: "day", label: "День" },
];

export function ViewSwitcher() {
  const { view, setView } = useCalendar();

  return (
    <Tabs
      defaultValue={view}
      value={view}
      onChange={(v) => setView(v as CalendarView)}
    >
      <Tabs.List>
        {OPTIONS.map((option) => (
          <Tabs.Tab key={option.value} value={option.value}>
            {option.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
  );
}
