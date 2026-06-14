import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { fullWidth: true },
  argTypes: {
    state: { control: "inline-radio", options: ["default", "error"] },
    variant: {
      control: "inline-radio",
      options: ["outline", "filled", "flushed"],
    },
  },
  render: function Render(args) {
    const [value, setValue] = useState(
      typeof args.value === "string" ? args.value : "",
    );
    return (
      <div style={{ width: 280 }}>
        <Input
          {...args}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    );
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Email", placeholder: "you@example.com" },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    state: "error",
    errorMessage: "Enter a valid email address",
    value: "not-an-email",
  },
};

export const Disabled: Story = {
  args: { label: "Email", placeholder: "you@example.com", disabled: true },
};

export const NoLabel: Story = {
  args: { placeholder: "Search courses…" },
};

export const Filled: Story = {
  args: { label: "Email", placeholder: "you@example.com", variant: "filled" },
};

export const Flushed: Story = {
  args: { label: "Email", placeholder: "you@example.com", variant: "flushed" },
};

export const Form: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}
    >
      <Input
        fullWidth
        label="Email"
        type="email"
        placeholder="jane@example.com"
      />
      <Input
        fullWidth
        label="Age"
        type="number"
        min={0}
        max={120}
        placeholder="30"
      />
      <Input
        fullWidth
        label="Password"
        type="password"
        defaultValue="password"
      />
    </div>
  ),
};
