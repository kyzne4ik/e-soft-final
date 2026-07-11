import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProfileMenu } from "./ProfileMenu";

const meta = {
  title: "Molecules/ProfileMenu",
  component: ProfileMenu,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ display: "flex", justifyContent: "flex-end", width: 360 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    person: {
      name: "Игорь Лебедев",
      initials: "ИЛ",
      color: "var(--color-secondary)",
    },
    children: (
      <>
        <ProfileMenu.Item icon="user" onClick={() => {}}>
          Профиль
        </ProfileMenu.Item>
        <ProfileMenu.Item icon="log-out" danger onClick={() => {}}>
          Выйти
        </ProfileMenu.Item>
      </>
    ),
  },
} satisfies Meta<typeof ProfileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
