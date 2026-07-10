import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Slider } from "./Slider";

const meta = {
  title: "Atoms/Slider",
  component: Slider,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    showValue: { control: "boolean" },
    disabled: { control: "boolean" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
  },
  args: { value: 90, min: 0, max: 100, step: 1, "aria-label": "Оценка" },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return <Slider {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutValue: Story = { args: { showValue: false } };

export const Disabled: Story = { args: { disabled: true } };

export const CustomRange: Story = {
  args: { min: 0, max: 10, step: 1, value: 7 },
};

export const Accent: Story = {
  args: { value: 45, accentColor: "var(--color-primary)" },
};
