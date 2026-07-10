import type { Meta, StoryObj } from "@storybook/react-vite";
import { ReviewHistory } from "./ReviewHistory";
import { StatusBadge } from "../../molecules/status-badge";

const meta = {
  title: "Organisms/ReviewHistory",
  component: ReviewHistory,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: { children: null },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReviewHistory>;

export default meta;
type Story = StoryObj<typeof meta>;

const score = (value: string) => (
  <span
    style={{
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)",
    }}
  >
    {value}
  </span>
);

export const Default: Story = {
  render: () => (
    <ReviewHistory>
      <ReviewHistory.Item
        author={{ name: "Артём Соколов", initials: "АС", color: "#f97316" }}
        time="12 июн, 18:40"
        active
      >
        <ReviewHistory.Meta>
          <StatusBadge status="CHANGES_REQUESTED" />
          {score("62 / 100")}
        </ReviewHistory.Meta>
        <ReviewHistory.Message>
          Хорошее начало! Обработка ошибок в Promise.all пока теряет отклонённые
          промисы — давай добавим catch и покроем кейс таймаута.
        </ReviewHistory.Message>
      </ReviewHistory.Item>

      <ReviewHistory.Item
        author={{ name: "Михаил Орлов", initials: "МО", color: "#3b82f6" }}
        time="10 июн, 21:05"
      >
        Сдал(а) работу на проверку
      </ReviewHistory.Item>
    </ReviewHistory>
  ),
};

export const Accepted: Story = {
  render: () => (
    <ReviewHistory>
      <ReviewHistory.Item
        author={{ name: "Артём Соколов", initials: "АС", color: "#f97316" }}
        time="14 июн, 10:12"
        active
      >
        <ReviewHistory.Meta>
          <StatusBadge status="ACCEPTED" />
          {score("94 / 100")}
        </ReviewHistory.Meta>
        <ReviewHistory.Message>
          Отлично, все замечания закрыты. Зачтено.
        </ReviewHistory.Message>
      </ReviewHistory.Item>

      <ReviewHistory.Item
        author={{ name: "Михаил Орлов", initials: "МО", color: "#3b82f6" }}
        time="13 июн, 22:40"
      >
        Отправил(а) работу на повторную проверку
      </ReviewHistory.Item>

      <ReviewHistory.Item
        author={{ name: "Артём Соколов", initials: "АС", color: "#f97316" }}
        time="12 июн, 18:40"
      >
        <ReviewHistory.Meta>
          <StatusBadge status="CHANGES_REQUESTED" />
          {score("62 / 100")}
        </ReviewHistory.Meta>
        <ReviewHistory.Message>Тут пусто.</ReviewHistory.Message>
      </ReviewHistory.Item>

      <ReviewHistory.Item
        author={{ name: "Михаил Орлов", initials: "МО", color: "#3b82f6" }}
        time="13 июн, 22:40"
      >
        Отправил(а) работу на повторную проверку
      </ReviewHistory.Item>

      <ReviewHistory.Item
        author={{ name: "Артём Соколов", initials: "АС", color: "#f97316" }}
        time="12 июн, 18:40"
      >
        <ReviewHistory.Meta>
          <StatusBadge status="CHANGES_REQUESTED" />
          {score("62 / 100")}
        </ReviewHistory.Meta>
        <ReviewHistory.Message>
          Обработка ошибок в Promise.all теряет отклонённые промисы — добавь
          catch.
        </ReviewHistory.Message>
      </ReviewHistory.Item>
    </ReviewHistory>
  ),
};
