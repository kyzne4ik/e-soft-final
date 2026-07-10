import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScheduleEvent } from "./ScheduleEvent";

const meta = {
  title: "Molecules/ScheduleEvent",
  component: ScheduleEvent,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: "Лекция: Промисы и event loop",
    time: "12:00–13:30",
    kind: "lecture",
    onClick: () => {},
  },
} satisfies Meta<typeof ScheduleEvent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lecture: Story = {
  args: { tag: "запись готова" },
};

export const Seminar: Story = {
  args: {
    title: "Семинар: разбор ДЗ «Замыкания»",
    time: "16:00–16:45",
    tag: undefined,
    kind: "seminar",
  },
};

export const Deadline: Story = {
  args: {
    title: "Дедлайн ДЗ «REST API на Express»",
    time: "до 23:59 МСК",
    tag: undefined,
    kind: "deadline",
  },
};

export const NonClickable: Story = {
  args: { onClick: undefined },
};

export const AllKinds: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <ScheduleEvent
        kind="lecture"
        title="Лекция: Введение в Node.js"
        time="12:00–13:30"
        tag="запись готова"
        onClick={() => {}}
      />
      <ScheduleEvent
        kind="seminar"
        title="Семинар: разбор ДЗ «Замыкания»"
        time="16:00–16:45"
        onClick={() => {}}
      />
      <ScheduleEvent
        kind="deadline"
        title="Дедлайн ДЗ «Промисы и async/await»"
        time="до 23:59 МСК"
        onClick={() => {}}
      />
      <ScheduleEvent
        kind="default"
        title="Консультация перед экзаменом"
        time="18:00–19:00"
        onClick={() => {}}
      />
    </div>
  ),
};
