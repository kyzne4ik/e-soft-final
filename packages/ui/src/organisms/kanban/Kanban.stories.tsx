import type { Meta, StoryObj } from "@storybook/react-vite";
import { Kanban } from "./Kanban";
import type { KanbanBoard } from "./model/types";

const meta = {
  title: "Organisms/Kanban",
  component: Kanban,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  args: { children: null },
} satisfies Meta<typeof Kanban>;

export default meta;
type Story = StoryObj<typeof meta>;

const dev = { name: "Иван Разработчик", initials: "ИР", color: "#1f2937" };
const designer = { name: "Анна Дизайнер", initials: "АД", color: "#7c3aed" };
const qa = { name: "Олег Тестировщик", initials: "ОТ", color: "#0ea5e9" };

const board: KanbanBoard = {
  columns: [
    {
      id: "TODO",
      title: "Todo",
      tone: "blue",
      cards: [
        {
          id: "c1",
          title: "Calendar Blocks",
          priority: "high",
          size: "M",
          assignees: [dev],
          project: "Pro Native (Alpha)",
          tags: ["Mobile", "Block"],
        },
        {
          id: "c2",
          title: "Pro badge on the Expo Go app",
          priority: "high",
          size: "M",
          assignees: [dev],
          project: "Pro Native (Alpha)",
          date: "Mar 5, 2026",
          tags: ["Launch", "New Component"],
        },
        {
          id: "c3",
          title: "FeedCarousel",
          priority: "medium",
          size: "M",
          assignees: [dev],
          project: "Pro Native (Alpha)",
          tags: ["Mobile", "New Component"],
        },
        {
          id: "c4",
          title: "FlipCard",
          priority: "medium",
          size: "M",
          assignees: [designer],
          project: "Pro Native (Alpha)",
          tags: ["Mobile", "New Component"],
        },
        {
          id: "c5",
          title: "NumberPad",
          priority: "medium",
          size: "M",
          assignees: [dev],
          project: "Pro Native (Alpha)",
          tags: ["Mobile", "New Component"],
        },
      ],
    },
    {
      id: "IN_PROGRESS",
      title: "In Progress",
      tone: "amber",
      cards: [
        {
          id: "c6",
          title: "MorphButton",
          priority: "high",
          size: "L",
          assignees: [dev],
          project: "Pro Native (Alpha)",
          date: "Mar 29, 2026",
          tags: ["Mobile", "New Component"],
        },
        {
          id: "c7",
          title: "Create Password",
          priority: "low",
          size: "S",
          assignees: [designer],
          project: "Pro Native (Alpha)",
          tags: ["Mobile", "Block"],
        },
        {
          id: "c8",
          title: "OTP Verification",
          priority: "low",
          size: "S",
          assignees: [designer, qa],
          project: "Pro Native (Alpha)",
          tags: ["Mobile", "Block"],
        },
        {
          id: "c9",
          title: "Login / Sign up",
          priority: "low",
          size: "S",
          assignees: [designer],
          project: "Pro Native (Alpha)",
          tags: ["Mobile", "Block"],
        },
      ],
    },
    {
      id: "TO_DOCUMENT",
      title: "To Document",
      tone: "red",
      cards: [
        {
          id: "c10",
          title: "ProgressButton",
          priority: "high",
          size: "L",
          assignees: [dev],
          project: "Pro Native (Alpha)",
          tags: ["Mobile", "New Component"],
        },
        {
          id: "c11",
          title: "SlideButton",
          priority: "high",
          size: "L",
          assignees: [dev],
          project: "Pro Native (Alpha)",
          tags: ["Mobile", "New Component"],
        },
        {
          id: "c12",
          title: "NumberField",
          priority: "high",
          size: "M",
          assignees: [qa],
          project: "Pro Native (Alpha)",
          tags: ["Mobile", "New Component"],
        },
        {
          id: "c13",
          title: "RadioButtonGroup",
          priority: "high",
          size: "L",
          assignees: [dev],
          project: "Pro Native (Alpha)",
          tags: ["Mobile", "New Component"],
        },
        {
          id: "c14",
          title: "Calendar",
          priority: "high",
          size: "XL",
          assignees: [dev],
          project: "Pro Native (Alpha)",
          tags: ["Launch", "New Component"],
        },
      ],
    },
  ],
};

const renderBoard = (data: KanbanBoard, withAddTask = true) => (
  <div style={{ height: "100vh", padding: 24, boxSizing: "border-box" }}>
    <Kanban board={data}>
      {({ col }) => (
        <Kanban.Column key={col.id} column={col}>
          <Kanban.CardList cards={col.cards} columnId={col.id}>
            {({ card }) => (
              <Kanban.Card key={card.id} card={card} columnId={col.id} />
            )}
          </Kanban.CardList>
          {withAddTask && <Kanban.AddTask />}
        </Kanban.Column>
      )}
    </Kanban>
  </div>
);

export const Default: Story = {
  render: () => renderBoard(board),
};

export const WithoutAddTask: Story = {
  render: () => renderBoard(board, false),
};

const emptyBoard: KanbanBoard = {
  columns: board.columns.map((col) => ({ ...col, cards: [] })),
};

export const Empty: Story = {
  render: () => renderBoard(emptyBoard),
};
