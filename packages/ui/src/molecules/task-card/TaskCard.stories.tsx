import type { Meta, StoryObj } from "@storybook/react-vite";
import { TaskCard } from "./TaskCard";

const meta = {
  title: "Molecules/TaskCard",
  component: TaskCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 340 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: "Промисы и async/await",
    description:
      "Реализуйте загрузчик данных: параллельные запросы через Promise.all, обработка ошибок и…",
    status: "CHANGES_REQUESTED",
    deadline: "14 июн",
  },
} satisfies Meta<typeof TaskCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChangesRequested: Story = {};

export const New: Story = {
  args: {
    title: (
      <>
        REST API <b>на</b> Express
      </>
    ),
    description:
      "Спроектируйте REST API: CRUD-ресурс, валидация тела запроса, middleware логирования, обработка…",
    status: "NEW",
    deadline: "16 июн",
  },
};

export const Accepted: Story = {
  args: {
    title: "Замыкания и контекст",
    description: "Серия задач на замыкания, каррирование и привязку контекста.",
    status: "ACCEPTED",
    iconTone: "success",
    deadline: "11 июн",
  },
};

export const Clickable: Story = {
  args: { onClick: () => {} },
};
