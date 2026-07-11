import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip } from "./Chip";

const meta = {
  title: "Atoms/Chip",
  component: Chip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    kind: { control: "inline-radio", options: ["filter", "status"] },
    status: {
      control: "select",
      options: ["completed", "in-progress", "not-started", "locked"],
    },
  },
  args: { children: "Chip" },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filter: Story = {
  args: { kind: "filter", children: "JavaScript" },
};

export const FilterSelected: Story = {
  args: { kind: "filter", selected: true, children: "JavaScript" },
};

export const FilterGroup: Story = {
  render: function Render() {
    const filters = ["All", "In progress", "Completed", "Not started"];
    const [active, setActive] = useState("All");
    return (
      <div style={{ display: "flex", gap: 8 }}>
        {filters.map((label) => (
          <Chip
            key={label}
            kind="filter"
            selected={active === label}
            onClick={() => setActive(label)}
          >
            {label}
          </Chip>
        ))}
      </div>
    );
  },
};

export const Statuses: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Chip kind="status" status="completed">
        Completed
      </Chip>
      <Chip kind="status" status="in-progress">
        In progress
      </Chip>
      <Chip kind="status" status="not-started">
        Not started
      </Chip>
      <Chip kind="status" status="locked">
        Locked
      </Chip>
    </div>
  ),
};
