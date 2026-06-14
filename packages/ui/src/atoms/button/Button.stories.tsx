import { Check, Ellipsis, Globe } from "lucide-react";
import { Button } from "./Button";
import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "ghost", "destructive"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  args: { onClick: fn(), children: "Continue", variant: "primary", size: "md" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: "secondary" } };

export const Tertiary: Story = { args: { variant: "tertiary" } };

export const Ghost: Story = { args: { variant: "ghost" } };

export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete" },
};

export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Globe size={18} />
      Search
    </Button>
  ),
};

export const IconOnly: Story = {
  args: { isIconOnly: true, variant: "tertiary" },
  render: (args) => (
    <Button {...args}>
      <Ellipsis size={18} />
    </Button>
  ),
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: { layout: "padded" },
};

export const Disabled: Story = { args: { isDisabled: true } };

export const Pending: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button {...args} isPending>
        Continue
      </Button>
      <Button {...args} isPending isIconOnly variant="tertiary">
        <Check size={18} />
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};
