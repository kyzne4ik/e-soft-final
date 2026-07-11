import { ConfirmModal } from "./ConfirmModal";
import { fn } from "storybook/test";
import { Button } from "../../atoms/button";
import { useDisclosure } from "../../hooks/use-disclosure";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Organisms/ConfirmModal",
  component: ConfirmModal,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "inline-radio", options: ["default", "danger"] },
    isPending: { control: "boolean" },
  },
  args: {
    title: "Удаление курса",
    description:
      "Вы уверены, что хотите удалить курс «React Advanced»? Это действие необратимо.",
    confirmLabel: "Удалить",
    cancelLabel: "Отмена",
    tone: "danger",
    isPending: false,
    isOpen: false,
    onConfirm: fn(),
    onClose: fn(),
  },
  render: function Render(args) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <div style={{ padding: 24 }}>
        <Button onClick={onOpen}>Открыть подтверждение</Button>
        <ConfirmModal
          {...args}
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={onClose}
        />
      </div>
    );
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Danger: Story = {};

export const Default: Story = {
  args: {
    title: "Запуск потока",
    description:
      "Запустить поток? Он перейдёт в статус «Идёт», после этого набор закрывается.",
    confirmLabel: "Запустить",
    tone: "default",
  },
};

export const Pending: Story = {
  args: { isPending: true },
};
