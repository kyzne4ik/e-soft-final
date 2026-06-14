import { Card } from "./Card";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Atoms/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "lesson", "stat"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { maxWidth: 320 },
    children: (
      <>
        <h3 style={{ margin: 0, fontFamily: "var(--font-headline)" }}>
          React Fundamentals
        </h3>
        <p style={{ margin: "8px 0 0", color: "var(--text-tertiary)" }}>
          Learn components, props and state from the ground up.
        </p>
      </>
    ),
  },
};

export const Clickable: Story = {
  args: {
    onClick: fn(),
    style: { maxWidth: 320 },
    children: "Click me — the cursor and elevation react on hover.",
  },
};
