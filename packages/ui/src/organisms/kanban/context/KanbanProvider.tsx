import { ReactNode, Reducer, useReducer } from "react";
import { kanbanContext } from "./KanbanContext";
import { KanbanBoard, KanbanCard } from "../model/types";

type Actions =
  | {
      type: "MOVE_CARD";
      cardId: string;
      fromColumnId: string;
      toColumnId: string;
      toIndex: number;
    }
  | { type: "ADD_CARD"; columnId: string; payload: KanbanCard }
  | { type: "REMOVE_CARD"; columnId: string; cardId: string };

const reducer: Reducer<KanbanBoard, Actions> = (state, action) => {
  switch (action.type) {
    case "ADD_CARD": {
      const columnIndex = state.columns.findIndex(
        (col) => col.id === action.columnId,
      );
      if (columnIndex === -1) return state;
      const updatedColumn = {
        ...state.columns[columnIndex],
        cards: [...state.columns[columnIndex].cards, action.payload],
      };
      const newColumns = [...state.columns];
      newColumns[columnIndex] = updatedColumn;
      return { ...state, columns: newColumns };
    }

    case "MOVE_CARD": {
      const fromIndex = state.columns.findIndex(
        (col) => col.id === action.fromColumnId,
      );
      const toIndex = state.columns.findIndex(
        (col) => col.id === action.toColumnId,
      );
      if (fromIndex === -1 || toIndex === -1) return state;

      const fromCol = state.columns[fromIndex];

      const cardIndex = fromCol.cards.findIndex((c) => c.id === action.cardId);
      if (cardIndex === -1) return state;

      const movedCard = fromCol.cards[cardIndex];

      // Перемещение внутри одной колонки: убираем и вставляем в одном массиве,
      // иначе ветка fromIndex затрёт вставку в ту же колонку.
      if (fromIndex === toIndex) {
        const cards = [...fromCol.cards];
        cards.splice(cardIndex, 1);
        const insertIndex =
          action.toIndex > cardIndex ? action.toIndex - 1 : action.toIndex;
        cards.splice(insertIndex, 0, movedCard);

        const newColumns = [...state.columns];
        newColumns[fromIndex] = { ...fromCol, cards };
        return { ...state, columns: newColumns };
      }

      const toCol = state.columns[toIndex];
      const newFromCards = fromCol.cards.filter((_, idx) => idx !== cardIndex);
      const newToCards = [...toCol.cards];
      newToCards.splice(action.toIndex, 0, movedCard);

      const newColumns = state.columns.map((col, idx) => {
        if (idx === fromIndex) return { ...fromCol, cards: newFromCards };
        if (idx === toIndex) return { ...toCol, cards: newToCards };
        return col;
      });
      return { ...state, columns: newColumns };
    }

    case "REMOVE_CARD": {
      const columnIndex = state.columns.findIndex(
        (col) => col.id === action.columnId,
      );
      if (columnIndex === -1) return state;
      const newCards = state.columns[columnIndex].cards.filter(
        (c) => c.id !== action.cardId,
      );
      const newColumns = [...state.columns];
      newColumns[columnIndex] = {
        ...state.columns[columnIndex],
        cards: newCards,
      };
      return { ...state, columns: newColumns };
    }

    default:
      return state;
  }
};

type KanbanProviderProps = {
  children: ReactNode;
  initialBoard?: KanbanBoard;
  onMove?: (cardId: string, fromColumnId: string, toColumnId: string) => void;
};

export function KanbanProvider({
  children,
  initialBoard,
  onMove,
}: KanbanProviderProps) {
  const [state, dispatch] = useReducer(
    reducer,
    initialBoard ?? { columns: [] },
  );

  const moveCard = (
    cardId: string,
    fromColumnId: string,
    toColumnId: string,
    toIndex: number,
  ) => {
    onMove?.(cardId, fromColumnId, toColumnId);
    dispatch({ type: "MOVE_CARD", cardId, fromColumnId, toColumnId, toIndex });
  };

  const addCard = (columnId: string, payload: KanbanCard) =>
    dispatch({ type: "ADD_CARD", columnId, payload });

  const removeCard = (columnId: string, cardId: string) =>
    dispatch({ type: "REMOVE_CARD", columnId, cardId });

  return (
    <kanbanContext.Provider
      value={{ board: state, moveCard, addCard, removeCard }}
    >
      {children}
    </kanbanContext.Provider>
  );
}
