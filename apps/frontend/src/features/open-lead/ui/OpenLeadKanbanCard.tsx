import type { LeadResponse } from "@repo/schemas";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { Kanban, type KanbanCard } from "@repo/ui/organisms/kanban";
import { Icon } from "@repo/ui/atoms/icon";
import { Avatar } from "@repo/ui/atoms/avatar";
import { LeadDetailsModal } from "./LeadDetailsModal";
import css from "./OpenLeadKanbanCard.module.css";

const AVATAR_COLORS = [
  "#3b82f6",
  "#ec4899",
  "#f97316",
  "#8b5cf6",
  "#22c55e",
  "#6366f1",
  "#14b8a6",
  "#ef4444",
];

export interface OpenLeadKanbanCardProps {
  card: KanbanCard;
  columnId: string;
  lead: LeadResponse;
  streamName?: string;
}

export function OpenLeadKanbanCard({
  card,
  columnId,
  lead,
  streamName,
}: OpenLeadKanbanCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const name = `${lead.firstName} ${lead.lastName}`;
  const initials =
    `${lead.firstName[0] ?? ""}${lead.lastName[0] ?? ""}`.toUpperCase();

  return (
    <>
      <Kanban.Card
        card={card}
        columnId={columnId}
        className={css.clickable}
        onClick={onOpen}
      >
        <div className={css.head}>
          <Avatar
            person={{
              name,
              initials,
              color: AVATAR_COLORS[lead.id % AVATAR_COLORS.length],
            }}
            size={36}
          />
          <div className={css.head_text}>
            <span className={css.name}>{name}</span>
            {streamName && <span className={css.source}>{streamName}</span>}
          </div>
        </div>

        {(lead.telegram || lead.phone) && (
          <div className={css.contacts}>
            {lead.telegram && (
              <span className={css.contact}>
                <Icon name="send" size={14} />
                {lead.telegram}
              </span>
            )}
            {lead.phone && (
              <span className={css.contact}>
                <Icon name="phone" size={14} />
                {lead.phone}
              </span>
            )}
          </div>
        )}
      </Kanban.Card>

      <LeadDetailsModal leadId={lead.id} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
