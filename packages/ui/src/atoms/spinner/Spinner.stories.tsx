import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./Spinner";

const meta = {
  title: "Atoms/Spinner",
  component: Spinner,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: { type: "range", min: 12, max: 96, step: 2 } },
    color: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "error", "info", "current"],
    },
  },
  args: { size: 24, color: "primary" },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Spinner size={16} />
      <Spinner size={24} />
      <Spinner size={40} />
      <Spinner size={64} />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Spinner color="primary" />
      <Spinner color="success" />
      <Spinner color="warning" />
      <Spinner color="error" />
      <Spinner color="info" />
    </div>
  ),
};

export const CurrentColor: Story = {
  render: () => (
    <span style={{ color: "#c026d3" }}>
      <Spinner color="current" size={40} />
    </span>
  ),
};
