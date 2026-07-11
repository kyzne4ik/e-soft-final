import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";

import { Toast } from "./Toast";

const meta = {
  title: "Molecules/Toast",
  component: Toast,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["info", "success", "warning", "error"],
    },
  },
  args: { type: "info", title: "Уведомление", message: "Изменения сохранены" },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Success: Story = {
  args: { type: "success", title: "Готово", message: "Зачёт принят" },
};

export const Warning: Story = {
  args: { type: "warning", title: "Внимание", message: "Скоро дедлайн" },
};

export const ErrorToast: Story = {
  args: {
    type: "error",
    title: "Ошибка",
    message: "Не удалось сохранить изменения",
  },
};

export const MessageOnly: Story = {
  args: { type: "info", title: undefined, message: "Доступно обновление" },
};

export const Closable: Story = {
  args: {
    type: "success",
    title: "Сохранено",
    message: "Нажмите крестик, чтобы закрыть",
    closable: true,
    onClose: fn(),
  },
};

export const Stack: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <Toast type="success" title="Зачёт принят" message="Работа проверена" />
      <Toast type="info" message="Назначен новый ментор" />
      <Toast type="warning" title="Дедлайн" message="Осталось 2 часа" />
      <Toast type="error" title="Ошибка" message="Дедлайн пропущен" closable />
    </div>
  ),
};
