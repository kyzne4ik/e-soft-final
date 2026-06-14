import { useKanban } from "../../context/KanbanContext";

type UseDragCardParams = {
  cardId: string;
  columnId: string;
};

type UseDragColumnParams = {
  columnId: string;
};

type DragHandlers = {
  draggable: true;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
};

type DropHandlers = {
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
};

type UseDragReturn = {
  dragHandlers: DragHandlers;
  dropHandlers: DropHandlers;
};

export function useDrag(
  card: UseDragCardParams,
  column: UseDragColumnParams,
): UseDragReturn {
  const { moveCard, board } = useKanban();

  const dragHandlers: DragHandlers = {
    draggable: true,

    onDragStart(e) {
      e.dataTransfer.setData("cardId", card.cardId);
      e.dataTransfer.setData("fromColumnId", card.columnId);
      e.dataTransfer.effectAllowed = "move";
    },

    onDragEnd(e) {
      e.dataTransfer.clearData();
    },
  };

  const dropHandlers: DropHandlers = {
    onDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    },

    onDragLeave() {},

    onDrop(e) {
      e.preventDefault();
      const cardId = e.dataTransfer.getData("cardId");
      const fromColumnId = e.dataTransfer.getData("fromColumnId");

      if (!cardId) return;

      const toCol = board.columns.find((c) => c.id === column.columnId);
      const toIndex = toCol ? toCol.cards.length : 0;

      moveCard(cardId, fromColumnId, column.columnId, toIndex);
    },
  };

  return { dragHandlers, dropHandlers };
}
