import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select, type SelectOption } from "./Select";

const OPTIONS: SelectOption[] = [
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "Python", value: "py" },
  { label: "Go", value: "go" },
  { label: "Rust (скоро)", value: "rs", disabled: true },
];

const meta = {
  title: "Atoms/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    state: { control: "inline-radio", options: ["default", "error"] },
  },
  render: function Render(args) {
    const [value, setValue] = useState(
      typeof args.value === "string" ? args.value : "",
    );
    return (
      <div style={{ width: 280 }}>
        <Select
          {...args}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    );
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Язык",
    placeholder: "Выберите язык",
    options: OPTIONS,
  },
};

export const WithError: Story = {
  args: {
    label: "Язык",
    placeholder: "Выберите язык",
    options: OPTIONS,
    state: "error",
    errorMessage: "Нужно выбрать значение",
  },
};

export const Disabled: Story = {
  args: {
    label: "Язык",
    placeholder: "Выберите язык",
    options: OPTIONS,
    disabled: true,
  },
};

export const WithChildren: Story = {
  args: { label: "Группа" },
  render: function Render(args) {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: 280 }}>
        <Select
          {...args}
          placeholder="Выберите группу"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        >
          <optgroup label="Frontend">
            <option value="fe-1">FE-2024-1</option>
            <option value="fe-2">FE-2024-2</option>
          </optgroup>
          <optgroup label="Backend">
            <option value="be-1">BE-2024-1</option>
          </optgroup>
        </Select>
      </div>
    );
  },
};
