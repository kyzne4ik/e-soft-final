import { createStrictContext, useStrictContext } from "../../../libs/react";
import { KanbanBoard, KanbanCard } from "../model/types";

export type KanbanContextValue = {
  board: KanbanBoard;
  moveCard: (
    cardId: string,
    fromColumnId: string,
    toColumnId: string,
    toIndex: number,
  ) => void;
  addCard: (columnId: string, payload: KanbanCard) => void;
  removeCard: (columnId: string, cardId: string) => void;
};

export const kanbanContext = createStrictContext<KanbanContextValue>();

export const useKanban = () => {
  const ctx = useStrictContext(kanbanContext);
  return ctx;
};
