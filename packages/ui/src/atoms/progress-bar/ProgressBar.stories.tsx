import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressBar } from "./ProgressBar";

const meta = {
  title: "Atoms/ProgressBar",
  component: ProgressBar,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    color: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "error", "info"],
    },
  },
  args: { value: 60, color: "primary" },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = { args: { value: 100, color: "success" } };

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <ProgressBar value={60} color="primary" />
      <ProgressBar value={100} color="success" />
      <ProgressBar value={75} color="warning" />
      <ProgressBar value={40} color="error" />
      <ProgressBar value={85} color="info" />
    </div>
  ),
};
