import css from "./MentorReviewBoard.module.css";
import { Kanban } from "@repo/ui/organisms/kanban";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandler } from "@/shared/ui/error-handler";
import { useReviewBoard } from "../model/useReviewBoard";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { OpenSubmissionKanbanCard } from "@/features/open-submission";
import { MentorReviewBoardSkeleton } from "./MentorReviewBoardSkeleton";

export interface MentorReviewBoardProps {
  streamId: number;
}

export function MentorReviewBoard(props: MentorReviewBoardProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallbackRender={ErrorHandler}>
          <BaseMentorReviewBoard {...props} />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

function BaseMentorReviewBoard({ streamId }: MentorReviewBoardProps) {
  const { board, isLoading, version, dataUpdatedAt, handleMove } =
    useReviewBoard(streamId);

  if (isLoading) return <MentorReviewBoardSkeleton />;

  return (
    <div className={`${css.board} ${css.fadeIn}`}>
      <Kanban
        key={`${streamId}:${version}:${dataUpdatedAt}`}
        board={board}
        onMove={handleMove}
      >
        {({ col }) => (
          <Kanban.Column key={col.id} column={col}>
            <Kanban.CardList
              cards={col.cards}
              columnId={col.id}
              emptyText="Нет сдач"
            >
              {({ card }) => (
                <OpenSubmissionKanbanCard
                  key={card.id}
                  card={card}
                  columnId={col.id}
                />
              )}
            </Kanban.CardList>
          </Kanban.Column>
        )}
      </Kanban>
    </div>
  );
}
