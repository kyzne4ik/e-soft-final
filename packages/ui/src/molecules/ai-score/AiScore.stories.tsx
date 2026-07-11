import type { Meta, StoryObj } from "@storybook/react-vite";

import { AiScore } from "./AiScore";

const meta = {
  title: "Molecules/AiScore",
  component: AiScore,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: { score: { control: { type: "range", min: 0, max: 100 } } },
  args: { score: 88 },
} satisfies Meta<typeof AiScore>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Good: Story = { args: { score: 88 } };

export const Mid: Story = { args: { score: 72 } };

export const Low: Story = { args: { score: 41 } };

export const Bands: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <AiScore score={88} />
      <AiScore score={72} />
      <AiScore score={41} />
    </div>
  ),
};
