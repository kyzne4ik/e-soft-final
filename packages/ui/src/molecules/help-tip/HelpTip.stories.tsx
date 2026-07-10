import type { Meta, StoryObj } from "@storybook/react-vite";
import { HelpTip } from "./HelpTip";

const meta = {
  title: "Molecules/HelpTip",
  component: HelpTip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof HelpTip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Как получить ID чата",
    steps: [
      {
        text: (
          <>Добавьте бота в ваш Telegram-канал или группу как администратора</>
        ),
      },
      {
        text: (
          <>
            Перейдите в нужный топик и отправьте команду <code>/topic_id</code>
          </>
        ),
      },
      {
        text: (
          <>
            Бот вернёт <code>chat_id</code> и <code>thread_id</code> —
            скопируйте их сюда
          </>
        ),
      },
    ],
  },
};

export const RightPosition: Story = {
  args: {
    position: "right",
    title: "Подсказка справа",
    steps: [
      { text: "Первый шаг инструкции" },
      { text: "Второй шаг инструкции" },
    ],
  },
};

export const NoTitle: Story = {
  args: {
    steps: [
      { text: "Просто подсказка без заголовка" },
      {
        text: (
          <>
            Используйте <code>/topic_id</code> в нужном топике
          </>
        ),
      },
    ],
  },
};
