import { useKanban } from "../../context/KanbanContext";

type CardParams = {
  cardId: string;
  columnId: string;
};

type ColumnParams = {
  columnId: string;
};

type CardDragHandlers = {
  draggable: true;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
};

type ColumnDropHandlers = {
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
};

export const CARD_MARKER = "data-kanban-card";

export function useCardDrag({ cardId, columnId }: CardParams): {
  handlers: CardDragHandlers;
  isDragging: boolean;
} {
  const { dragState, beginDrag, endDrag } = useKanban();

  const handlers: CardDragHandlers = {
    draggable: true,

    onDragStart(e) {
      e.dataTransfer.setData("cardId", cardId);
      e.dataTransfer.setData("fromColumnId", columnId);
      e.dataTransfer.effectAllowed = "move";
      const height = e.currentTarget.getBoundingClientRect().height;
      beginDrag(cardId, columnId, height);
    },

    onDragEnd() {
      endDrag();
    },
  };

  return { handlers, isDragging: dragState.cardId === cardId };
}

export function useColumnDrop({ columnId }: ColumnParams): ColumnDropHandlers {
  const { moveCard, setDropTarget, endDrag, getDragState } = useKanban();

  const resolveIndex = (column: Element, pointerY: number): number => {
    const cards = Array.from(
      column.querySelectorAll<HTMLElement>(`[${CARD_MARKER}]`),
    );

    for (let i = 0; i < cards.length; i++) {
      const rect = cards[i].getBoundingClientRect();
      if (pointerY < rect.top + rect.height / 2) return i;
    }

    return cards.length;
  };

  return {
    onDragOver(e) {
      if (!getDragState().cardId) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDropTarget(columnId, resolveIndex(e.currentTarget, e.clientY));
    },

    onDrop(e) {
      e.preventDefault();
      const cardId = e.dataTransfer.getData("cardId");
      const fromColumnId = e.dataTransfer.getData("fromColumnId");
      if (!cardId) {
        endDrag();
        return;
      }

      const ds = getDragState();
      const toIndex =
        ds.overColumnId === columnId && ds.overIndex != null
          ? ds.overIndex
          : resolveIndex(e.currentTarget, e.clientY);

      moveCard(cardId, fromColumnId, columnId, toIndex);
      endDrag();
    },
  };
}
