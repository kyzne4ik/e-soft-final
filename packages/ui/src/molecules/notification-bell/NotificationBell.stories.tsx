import type { Meta, StoryObj } from "@storybook/react-vite";
import { NotificationBell } from "./NotificationBell";

const meta = {
  title: "Molecules/NotificationBell",
  component: NotificationBell,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { count: 3, onClick: () => {} },
} satisfies Meta<typeof NotificationBell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unread: Story = {};

export const Empty: Story = { args: { count: 0 } };

export const Overflow: Story = { args: { count: 42 } };

export const Active: Story = { args: { active: true } };
