export type KanbanTone = "blue" | "amber" | "red" | "green" | "violet";

export type KanbanPriority = "high" | "medium" | "low";

export type KanbanSize = "S" | "M" | "L" | "XL";

export type KanbanAssignee = {
  name: string;
  initials: string;
  color?: string;
};

export type KanbanCard = {
  id: string;
  title: string;
  priority?: KanbanPriority;
  size?: KanbanSize;
  assignees?: KanbanAssignee[];
  project?: string;
  date?: string;
  tags?: string[];
  meta?: unknown;
};

export type KanbanColumn = {
  id: string;
  title: string;
  tone?: KanbanTone;
  cards: KanbanCard[];
};

export type KanbanBoard = {
  columns: KanbanColumn[];
};
