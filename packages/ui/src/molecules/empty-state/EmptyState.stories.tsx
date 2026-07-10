import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../atoms/button";
import { Icon } from "../../atoms/icon";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Molecules/EmptyState",
  component: EmptyState,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    icon: "inbox",
    title: "Здесь пока пусто",
    text: "Новые заявки появятся в этом списке, как только поступят.",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    icon: "book-open",
    title: "Нет активных курсов",
    text: "Начните обучение — выберите первый курс из каталога.",
    action: (
      <Button>
        <Icon name="plus" size={18} />
        Выбрать курс
      </Button>
    ),
  },
};
