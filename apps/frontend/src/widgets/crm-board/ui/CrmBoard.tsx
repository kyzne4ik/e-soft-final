import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import type { LeadQuery } from "@repo/schemas";
import { Kanban } from "@repo/ui/organisms/kanban";
import { OpenLeadKanbanCard } from "@/features/open-lead";
import { ErrorHandler } from "@/shared/ui/error-handler";
import { useCrmBoard } from "../model/useCrmBoard";
import { CrmBoardSkeleton } from "./CrmBoardSkeleton";
import css from "./CrmBoard.module.css";

export interface CrmBoardProps {
  query?: LeadQuery;
}

export function CrmBoard(props: CrmBoardProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={ErrorHandler}>
          <BaseCrmBoard {...props} />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

function BaseCrmBoard({ query }: CrmBoardProps) {
  const { board, leadById, streamNames, isLoading, version, handleMove } =
    useCrmBoard(query);

  if (isLoading) return <CrmBoardSkeleton />;

  return (
    <div className={`${css.board} ${css.fadeIn}`}>
      <Kanban
        key={`${JSON.stringify(query ?? {})}:${version}`}
        board={board}
        onMove={handleMove}
      >
        {({ col }) => (
          <Kanban.Column key={col.id} column={col}>
            <Kanban.CardList
              cards={col.cards}
              columnId={col.id}
              emptyText="Нет заявок"
            >
              {({ card }) => {
                const lead = leadById.get(Number(card.id));
                if (!lead) return null;
                return (
                  <OpenLeadKanbanCard
                    key={card.id}
                    card={card}
                    columnId={col.id}
                    lead={lead}
                    streamName={streamNames.get(lead.targetStreamId)}
                  />
                );
              }}
            </Kanban.CardList>
          </Kanban.Column>
        )}
      </Kanban>
    </div>
  );
}
