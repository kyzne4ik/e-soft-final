import type { Meta, StoryObj } from "@storybook/react-vite";
import { NotificationBanner } from "./NotificationBanner";

const meta = {
  title: "Molecules/NotificationBanner",
  component: NotificationBanner,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: "Ваше ДЗ «Замыкания и контекст» зачтено — 78 баллов",
    time: "2 часа назад",
    icon: "circle-check",
    isRead: false,
  },
} satisfies Meta<typeof NotificationBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unread: Story = {};

export const Read: Story = {
  args: {
    title: "Ментор отправил ДЗ «Промисы» на доработку",
    time: "вчера",
    icon: "history",
    isRead: true,
  },
};

export const Clickable: Story = {
  args: {
    onClick: () => {},
  },
};

export const LongMessage: Story = {
  args: {
    title:
      "Ментор оставил развёрнутый комментарий к вашему ДЗ «Промисы и async/await»: обратите внимание на обработку ошибок в цепочках промисов, отмену запросов через AbortController, а также на то, что параллельные операции лучше запускать через Promise.all вместо последовательного await — так вы значительно ускорите загрузку данных на странице.",
    time: "10 минут назад",
    icon: "message-square",
    isRead: false,
    onClick: () => {},
  },
};

export const WithoutTime: Story = {
  args: {
    title: "Опубликована запись лекции «Промисы и event loop»",
    time: undefined,
    icon: "calendar",
    isRead: true,
  },
};

export const Feed: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <NotificationBanner
        icon="circle-check"
        title="Ваше ДЗ «Замыкания и контекст» зачтено — 78 баллов"
        time="2 часа назад"
        isRead={false}
        onClick={() => {}}
      />
      <NotificationBanner
        icon="alarm-clock"
        title="Дедлайн ДЗ «Промисы и async/await» через 2 дня"
        time="5 часов назад"
        isRead={false}
        onClick={() => {}}
      />
      <NotificationBanner
        icon="calendar-clock"
        title="Через 30 минут начнётся семинар по разбору ДЗ"
        time="сегодня, 15:30"
        isRead={false}
        onClick={() => {}}
      />
      <NotificationBanner
        icon="history"
        title="Ментор отправил ДЗ «Промисы» на доработку"
        time="вчера"
        isRead
      />
      <NotificationBanner
        icon="calendar"
        title="Опубликована запись лекции «Промисы и event loop»"
        time="вчера"
        isRead
      />
    </div>
  ),
};
