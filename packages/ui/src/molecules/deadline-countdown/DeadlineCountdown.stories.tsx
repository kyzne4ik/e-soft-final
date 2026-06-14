import type { Meta, StoryObj } from "@storybook/react-vite";

import { DeadlineCountdown } from "./DeadlineCountdown";

const meta = {
  title: "Molecules/DeadlineCountdown",
  component: DeadlineCountdown,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { targetHours: 50 },
} satisfies Meta<typeof DeadlineCountdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShortDeadline: Story = { args: { targetHours: 2 } };
