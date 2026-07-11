import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../atoms/button";
import { Tooltip } from "./Tooltip";

const meta = {
  title: "Molecules/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "inline-radio",
      options: ["top", "bottom", "left", "right"],
    },
  },
  args: {
    text: "Helpful hint",
    position: "top",
    children: <Button variant="secondary">Hover me</Button>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: { children: <Button variant="secondary">Hover me</Button> },
};

export const AllPositions: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 48, padding: 48 }}>
      {(["top", "bottom", "left", "right"] as const).map((position) => (
        <Tooltip
          key={position}
          position={position}
          text={`Shown on ${position}`}
        >
          <Button variant="secondary">{position}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
