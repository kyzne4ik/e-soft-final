import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Segment } from "./Segment";

const meta = {
  title: "Molecules/Segment",
  component: Segment,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "ghost"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    isDisabled: { control: "boolean" },
  },
} satisfies Meta<typeof Segment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultSelectedKey: "all", children: null },
  render: (args) => (
    <Segment {...args}>
      <Segment.Item id="all">Все</Segment.Item>
      <Segment.Item id="unread">Непрочитанные</Segment.Item>
    </Segment>
  ),
};

export const Sizes: Story = {
  args: { children: null },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--sp-4)",
        alignItems: "flex-start",
      }}
    >
      {(["sm", "md", "lg"] as const).map((size) => (
        <div
          key={size}
          style={{ display: "flex", alignItems: "center", gap: "var(--sp-4)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--text-tertiary)",
              width: 24,
            }}
          >
            {size}
          </span>
          <Segment defaultSelectedKey="a" size={size}>
            <Segment.Item id="a">Monthly</Segment.Item>
            <Segment.Item id="b">Yearly</Segment.Item>
          </Segment>
        </div>
      ))}
    </div>
  ),
};

export const Ghost: Story = {
  args: { children: null },
  render: () => (
    <Segment variant="ghost" defaultSelectedKey="month">
      <Segment.Item id="week">Неделя</Segment.Item>
      <Segment.Item id="month">Месяц</Segment.Item>
      <Segment.Item id="year">Год</Segment.Item>
    </Segment>
  ),
};

export const Controlled: Story = {
  args: { children: null },
  render: () => {
    const [key, setKey] = useState<string>("monthly");
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--sp-3)",
          alignItems: "flex-start",
        }}
      >
        <Segment selectedKey={key} onSelectionChange={(k) => setKey(String(k))}>
          <Segment.Item id="monthly">Monthly</Segment.Item>
          <Segment.Item id="yearly">Yearly</Segment.Item>
        </Segment>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-xs)",
            color: "var(--text-tertiary)",
          }}
        >
          selected: {key}
        </span>
      </div>
    );
  },
};

export const WithDisabledItem: Story = {
  args: { children: null },
  render: () => (
    <Segment defaultSelectedKey="a">
      <Segment.Item id="a">Активный</Segment.Item>
      <Segment.Item id="b" isDisabled>
        Недоступен
      </Segment.Item>
      <Segment.Item id="c">Ещё один</Segment.Item>
    </Segment>
  ),
};

export const GroupDisabled: Story = {
  args: { children: null },
  render: () => (
    <Segment defaultSelectedKey="a" isDisabled>
      <Segment.Item id="a">Все</Segment.Item>
      <Segment.Item id="b">Непрочитанные</Segment.Item>
    </Segment>
  ),
};
