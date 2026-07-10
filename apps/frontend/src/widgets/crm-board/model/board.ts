import type {
  KanbanBoard,
  KanbanCard,
  KanbanTone,
} from "@repo/ui/organisms/kanban";
import type { LeadResponse, LeadStatus } from "@repo/schemas";

interface StatusColumnConfig {
  id: LeadStatus;
  title: string;
  tone: KanbanTone;
}

export const STATUS_COLUMNS: readonly StatusColumnConfig[] = [
  { id: "NEW", title: "Новые", tone: "blue" },
  { id: "IN_REVIEW", title: "На рассмотрении", tone: "amber" },
  { id: "ACCEPTED", title: "Приняты", tone: "green" },
  { id: "REJECTED", title: "Отклонены", tone: "red" },
  { id: "IGNORED", title: "Без ответа", tone: "violet" },
];

const leadToCard = (lead: LeadResponse): KanbanCard => ({
  id: String(lead.id),
  title: `${lead.firstName} ${lead.lastName}`,
});

export const buildBoard = (leads: LeadResponse[]): KanbanBoard => ({
  columns: STATUS_COLUMNS.map((column) => ({
    ...column,
    cards: leads.filter((lead) => lead.status === column.id).map(leadToCard),
  })),
});
