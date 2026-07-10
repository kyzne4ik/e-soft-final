import type { Meta, StoryObj } from "@storybook/react-vite";
import { addDays, startOfWeek } from "date-fns";
import { Calendar } from "./Calendar";
import { useCalendarState } from "./useCalendarState";
import type { CalendarEvent } from "./types";

const meta = {
  title: "Organisms/Calendar",
  component: Calendar,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof Calendar>;

interface Lesson {
  id: number;
  title: string;
  startsAt: Date;
  endsAt: Date;
  format: "lecture" | "seminar";
}

interface HomeworkDeadline {
  id: number;
  title: string;
  deadline: Date;
}

const lessonToEvent = (l: Lesson): CalendarEvent => ({
  id: `lesson-${l.id}`,
  start: l.startsAt,
  end: l.endsAt,
  title: l.title,
  kind: l.format,
  meta: l,
});

const deadlineToEvent = (d: HomeworkDeadline): CalendarEvent => ({
  id: `deadline-${d.id}`,
  start: d.deadline,
  title: d.title,
  kind: "deadline",
  meta: d,
});

function buildEvents(): CalendarEvent[] {
  const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
  const at = (dayOffset: number, hour: number, minute = 0): Date => {
    const d = addDays(monday, dayOffset);
    d.setHours(hour, minute, 0, 0);
    return d;
  };

  const lessons: Lesson[] = [
    {
      id: 1,
      title: "Замыкания и контекст",
      startsAt: at(0, 10),
      endsAt: at(0, 11, 30),
      format: "lecture",
    },
    {
      id: 2,
      title: "Разбор ДЗ",
      startsAt: at(0, 11),
      endsAt: at(0, 12),
      format: "seminar",
    },
    {
      id: 3,
      title: "Промисы и event loop",
      startsAt: at(2, 14),
      endsAt: at(2, 16),
      format: "lecture",
    },
    {
      id: 4,
      title: "Воркшоп по React",
      startsAt: at(4, 9),
      endsAt: at(4, 12),
      format: "seminar",
    },
  ];

  const deadlines: HomeworkDeadline[] = [
    { id: 1, title: "ДЗ «Замыкания»", deadline: at(2, 23, 59) },
    { id: 2, title: "ДЗ «Промисы»", deadline: at(4, 23, 59) },
  ];

  return [...lessons.map(lessonToEvent), ...deadlines.map(deadlineToEvent)];
}

function Demo() {
  const calendar = useCalendarState({ initialView: "week" });
  const events = buildEvents();

  return (
    <div style={{ height: "100vh", padding: 16, boxSizing: "border-box" }}>
      <Calendar
        {...calendar}
        events={events}
        onRangeChange={(range) =>
          console.log(
            "range:",
            range.from.toISOString(),
            "→",
            range.to.toISOString(),
          )
        }
        onEventClick={(e) => console.log("event click:", e.title, e.meta)}
        onSlotClick={(d) => console.log("slot click:", d.toISOString())}
        renderEvent={(e) =>
          e.kind === "deadline" ? (
            <span>⚑ {e.title}</span>
          ) : (
            <span>{e.title}</span>
          )
        }
      >
        <Calendar.Toolbar>
          <Calendar.Nav />
          <Calendar.Title />
          <Calendar.ViewSwitcher />
        </Calendar.Toolbar>

        <Calendar.Body>
          <Calendar.MonthView />
          <Calendar.WeekView />
          <Calendar.DayView />
        </Calendar.Body>
      </Calendar>
    </div>
  );
}

export const Playground: Story = { render: () => <Demo /> };
