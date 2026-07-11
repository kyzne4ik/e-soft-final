import type { Meta, StoryObj } from "@storybook/react-vite";
import { StreamBanner } from "./StreamBanner";

const meta = {
  title: "Molecules/StreamBanner",
  component: StreamBanner,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 340 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: "Веб-разработка · осень 2025",
    course: "Fullstack JavaScript",
    studentsCount: 18,
    status: "IN_PROGRESS",
    active: true,
  },
} satisfies Meta<typeof StreamBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {};

export const Enrolling: Story = {
  args: {
    title: "Python-бэкенд · зима 2026",
    course: "Backend Python",
    studentsCount: 7,
    status: "ENROLLING",
    active: false,
  },
};

export const Finished: Story = {
  args: {
    title: "Frontend React · весна 2025",
    course: "React Pro",
    studentsCount: 15,
    status: "FINISHED",
    active: false,
  },
};

export const List: Story = {
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          width: 340,
          padding: 8,
          background: "var(--surface-subtle)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <StreamBanner
        title="Веб-разработка · осень 2025"
        course="Fullstack JavaScript"
        studentsCount={18}
        status="IN_PROGRESS"
        active
        onClick={() => {}}
      />
      <StreamBanner
        title="Python-бэкенд · зима 2026"
        course="Backend Python"
        studentsCount={7}
        status="ENROLLING"
        onClick={() => {}}
      />
      <StreamBanner
        title="Frontend React · весна 2025"
        course="React Pro"
        studentsCount={15}
        status="FINISHED"
        onClick={() => {}}
      />
      <StreamBanner
        title="Веб-разработка · лето 2025"
        course="Fullstack JavaScript"
        studentsCount={12}
        status="IN_PROGRESS"
        onClick={() => {}}
      />
    </>
  ),
};
