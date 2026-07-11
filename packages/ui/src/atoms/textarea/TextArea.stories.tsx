import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "./TextArea";

const meta = {
  title: "Atoms/TextArea",
  component: TextArea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { fullWidth: true },
  argTypes: {
    state: { control: "inline-radio", options: ["default", "error"] },
    variant: {
      control: "inline-radio",
      options: ["outline", "filled", "flushed"],
    },
    resize: {
      control: "inline-radio",
      options: ["none", "vertical", "horizontal", "both"],
    },
  },
  render: function Render(args) {
    const [value, setValue] = useState(
      typeof args.value === "string" ? args.value : "",
    );
    return (
      <div style={{ width: 360 }}>
        <TextArea
          {...args}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    );
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Комментарий", placeholder: "Опишите вашу задачу…" },
};

export const WithError: Story = {
  args: {
    label: "Комментарий",
    placeholder: "Опишите вашу задачу…",
    state: "error",
    errorMessage: "Поле не может быть пустым",
  },
};

export const Disabled: Story = {
  args: {
    label: "Комментарий",
    value: "Редактирование недоступно",
    disabled: true,
  },
};

export const NoResize: Story = {
  args: { label: "Комментарий", resize: "none", placeholder: "Без ресайза…" },
};

export const Filled: Story = {
  args: { label: "Комментарий", variant: "filled", placeholder: "Filled…" },
};

export const Flushed: Story = {
  args: { label: "Комментарий", variant: "flushed", placeholder: "Flushed…" },
};

export const AutoWidth: Story = {
  args: {
    label: "Комментарий",
    fullWidth: false,
    cols: 30,
    placeholder: "Ширина по cols…",
  },
};
