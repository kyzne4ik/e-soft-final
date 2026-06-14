import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  render: function Render(args) {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = { args: { label: "Remember me" } };

export const Checked: Story = { args: { label: "Remember me", checked: true } };

export const Indeterminate: Story = {
  args: { label: "Select all", indeterminate: true },
};

export const Disabled: Story = {
  args: { label: "Unavailable option", disabled: true },
};

export const DisabledChecked: Story = {
  args: { label: "Locked in", checked: true, disabled: true },
};
