import { Modal } from "./Modal";
import { fn } from "storybook/test";
import { Button } from "../../atoms/button";
import { useDisclosure } from "../../hooks/use-disclosure";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Organisms/Modal",
  component: Modal,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "default", "wide"] },
  },
  args: {
    title: "Подтвердите действие",
    onClose: fn(),
    children: "Содержимое модального окна.",
  },
  render: function Render(args) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <div style={{ padding: 24 }}>
        <Button onClick={onOpen}>Открыть модалку</Button>
        <Modal {...args} isOpen={isOpen} onClose={onClose}>
          <Modal.Body>
            <p>
              Закройте окно клавишей Escape, кликом по оверлею или кнопкой ×.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={onClose}>
              Отмена
            </Button>
            <Button onClick={onClose}>Сохранить</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "Подтвердите действие",
    sub: "Это нельзя отменить",
  },
};

export const Small: Story = {
  args: { isOpen: true, title: "Небольшое окно", size: "sm" },
};

export const Wide: Story = {
  args: { isOpen: true, title: "Широкое окно", size: "wide" },
};
