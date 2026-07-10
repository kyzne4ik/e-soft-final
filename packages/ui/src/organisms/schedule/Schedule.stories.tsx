import type { Meta, StoryObj } from "@storybook/react-vite";
import { Schedule, type ScheduleDay } from "./Schedule";

const DAYS: ScheduleDay[] = [
  {
    id: "thu-12",
    weekday: "чт",
    day: 12,
    isToday: true,
    events: [
      {
        id: "lecture-eventloop",
        kind: "lecture",
        title: "Лекция: Промисы и event loop",
        time: "12:00–13:30",
        tag: "запись готова",
        onClick: () => {},
      },
      {
        id: "seminar-closures",
        kind: "seminar",
        title: "Семинар: разбор ДЗ «Замыкания»",
        time: "16:00–16:45",
        onClick: () => {},
      },
    ],
  },
  {
    id: "fri-13",
    weekday: "пт",
    day: 13,
    events: [
      {
        id: "deadline-rest",
        kind: "deadline",
        title: "Дедлайн ДЗ «REST API на Express»",
        time: "до 23:59 МСК",
        onClick: () => {},
      },
    ],
  },
  {
    id: "sat-14",
    weekday: "сб",
    day: 14,
    events: [
      {
        id: "deadline-promises",
        kind: "deadline",
        title: "Дедлайн ДЗ «Промисы и async/await»",
        time: "до 23:59 МСК",
        onClick: () => {},
      },
      {
        id: "lecture-node",
        kind: "lecture",
        title: "Лекция: Введение в Node.js",
        time: "12:00–13:30",
        onClick: () => {},
      },
    ],
  },
];

const meta = {
  title: "Organisms/Schedule",
  component: Schedule,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 720 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: "Расписание занятий",
    subtitle: "Июнь 2025 · поток «Веб-разработка» · время по МСК",
    days: DAYS,
    nowBeforeEventId: "seminar-closures",
  },
} satisfies Meta<typeof Schedule>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutNowMarker: Story = {
  args: { nowBeforeEventId: undefined },
};

export const Bare: Story = {
  args: { title: undefined, subtitle: undefined },
};
