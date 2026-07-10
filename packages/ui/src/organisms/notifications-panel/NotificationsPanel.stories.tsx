import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";
import {
  NotificationsPanel,
  type NotificationsTab,
} from "./NotificationsPanel";
import { NotificationBell } from "../../molecules/notification-bell";
import { NotificationBanner } from "../../molecules/notification-banner";

const meta = {
  title: "Organisms/NotificationsPanel",
  component: NotificationsPanel,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: { onClose: () => {} },
} satisfies Meta<typeof NotificationsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

interface Notif {
  id: string;
  title: string;
  time: string;
  isRead: boolean;
}

const INITIAL: Notif[] = [
  {
    id: "1",
    title: "Ваше ДЗ «Замыкания и контекст» зачтено — 78 баллов",
    time: "2 часа назад",
    isRead: false,
  },
  {
    id: "2",
    title: "Дедлайн ДЗ «Промисы и async/await» через 2 дня",
    time: "5 часов назад",
    isRead: false,
  },
  {
    id: "3",
    title: "Через 30 минут начнётся семинар по разбору ДЗ",
    time: "сегодня, 15:30",
    isRead: false,
  },
  {
    id: "4",
    title: "Ментор отправил ДЗ «Промисы» на доработку",
    time: "вчера",
    isRead: true,
  },
  {
    id: "5",
    title: "Опубликована запись лекции «Промисы и event loop»",
    time: "вчера",
    isRead: true,
  },
  {
    id: "6",
    title: "Опубликована запись лекции «Промисы и event loop»",
    time: "вчера",
    isRead: true,
  },
  {
    id: "7",
    title: "Опубликована запись лекции «Промисы и event loop»",
    time: "вчера",
    isRead: true,
  },
  {
    id: "8",
    title: "Опубликована запись лекции «Промисы и event loop»",
    time: "вчера",
    isRead: true,
  },
  {
    id: "9",
    title: "Опубликована запись лекции «Промисы и event loop»",
    time: "вчера",
    isRead: true,
  },
];

function Demo() {
  const [isOpen, setIsOpen] = useState(true);
  const [tab, setTab] = useState<NotificationsTab>("all");
  const [items, setItems] = useState(INITIAL);

  const unread = items.filter((n) => !n.isRead).length;
  const visible = useMemo(
    () => (tab === "unread" ? items.filter((n) => !n.isRead) : items),
    [items, tab],
  );

  const markOne = (id: string) =>
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );

  return (
    <div style={{ padding: 24, display: "flex", justifyContent: "flex-end" }}>
      <div style={{ position: "relative" }}>
        <NotificationBell
          count={unread}
          active={isOpen}
          onClick={() => setIsOpen((o) => !o)}
        />
        <NotificationsPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          tab={tab}
          onTabChange={setTab}
          unreadCount={unread}
          onMarkAllRead={() =>
            setItems((prev) => prev.map((n) => ({ ...n, isRead: true })))
          }
        >
          {visible.map((n) => (
            <NotificationBanner
              key={n.id}
              title={n.title}
              time={n.time}
              isRead={n.isRead}
              onClick={() => markOne(n.id)}
            />
          ))}
        </NotificationsPanel>
      </div>
    </div>
  );
}

export const Default: Story = { render: () => <Demo /> };

export const Empty: Story = {
  render: () => {
    const EmptyDemo = () => {
      const [isOpen, setIsOpen] = useState(true);
      return (
        <div
          style={{ padding: 24, display: "flex", justifyContent: "flex-end" }}
        >
          <div style={{ position: "relative" }}>
            <NotificationBell
              count={0}
              active={isOpen}
              onClick={() => setIsOpen((o) => !o)}
            />
            <NotificationsPanel
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      );
    };
    return <EmptyDemo />;
  },
};
