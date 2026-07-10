import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { NavBar } from "./NavBar";
import { NavBarItem } from "./NavBarItem";

const meta = {
  title: "Organisms/NavBar",
  component: NavBar,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: { items: [], renderItem: () => null },
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

interface NavLink {
  icon: string;
  label: string;
}

const ADMIN_LINKS: NavLink[] = [
  { icon: "layout-grid", label: "Обзор" },
  { icon: "git-branch", label: "Review-Board" },
  { icon: "layers", label: "Группы" },
  { icon: "book-open", label: "Задания" },
  { icon: "calendar", label: "Расписание" },
  { icon: "users", label: "Пользователи" },
  { icon: "user", label: "Профиль" },
];

function Demo() {
  const [activeIndex, setActiveIndex] = useState(2);

  return (
    <div style={{ height: 520 }}>
      <NavBar
        items={ADMIN_LINKS}
        activeIndex={activeIndex}
        logo={
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: "var(--color-gray-900)",
            }}
          />
        }
        renderItem={(item, { index, isActive }) => (
          <NavBarItem
            icon={item.icon}
            tooltip={item.label}
            active={isActive}
            onClick={() => setActiveIndex(index)}
          />
        )}
        footer={
          <>
            <NavBarItem icon="settings" tooltip="Настройки" />
            <NavBarItem icon="sun" tooltip="Тема" />
          </>
        }
      />
    </div>
  );
}

export const AdminRail: Story = {
  render: () => <Demo />,
};
