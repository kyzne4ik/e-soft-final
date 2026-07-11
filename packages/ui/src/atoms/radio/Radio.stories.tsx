import { Radio } from "./Radio";
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Atoms/Radio",
  component: Radio,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = { args: { label: "Beginner" } };

export const Selected: Story = { args: { label: "Beginner", selected: true } };

export const Disabled: Story = {
  args: { label: "Locked tier", disabled: true },
};

export const Group: Story = {
  render: function Render() {
    const options = ["Beginner", "Intermediate", "Advanced"];
    const [value, setValue] = useState("Beginner");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {options.map((option) => (
          <Radio
            key={option}
            name="level"
            label={option}
            selected={value === option}
            onChange={() => setValue(option)}
          />
        ))}
      </div>
    );
  },
};
