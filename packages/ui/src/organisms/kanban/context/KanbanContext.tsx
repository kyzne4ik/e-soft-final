import { createStrictContext, useStrictContext } from "../../../libs/react";
import type { KanbanBoard, KanbanCard } from "../model/types";

export type KanbanDragState = {
  cardId: string | null;
  fromColumnId: string | null;
  overColumnId: string | null;
  overIndex: number | null;
  cardHeight: number | null;
};

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

  dragState: KanbanDragState;
  beginDrag: (cardId: string, fromColumnId: string, cardHeight: number) => void;
  setDropTarget: (columnId: string, index: number) => void;
  endDrag: () => void;
  getDragState: () => KanbanDragState;
};

export const kanbanContext = createStrictContext<KanbanContextValue>();

export const useKanban = () => {
  const ctx = useStrictContext(kanbanContext);
  return ctx;
};
