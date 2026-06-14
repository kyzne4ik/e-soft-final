import { Skeleton } from "./Skeleton";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { width: 300, height: 40, border: "1rem" },
};
