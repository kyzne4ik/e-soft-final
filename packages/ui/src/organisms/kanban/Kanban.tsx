import { KanbanProvider } from "./context";
import { useKanban } from "./context/KanbanContext";
import { Avatar } from "../../atoms/avatar";
import { Icon } from "../../atoms/icon";
import {
  Fragment,
  type CSSProperties,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import type {
  KanbanBoard,
  KanbanCard,
  KanbanColumn,
  KanbanPriority,
  KanbanTone,
} from "./model/types";
import { useCardDrag, useColumnDrop, CARD_MARKER } from "./hooks/use-drag";
import { classNames } from "../../libs/classNames";
import css from "./Kanban.module.css";

type KanbanChildren =
  (({ col }: { col: KanbanColumn }) => ReactNode) | ReactNode;

const TONE_ACCENT: Record<KanbanTone, string> = {
  blue: "var(--color-secondary)",
  amber: "var(--color-warning)",
  red: "var(--color-error)",
  green: "var(--color-tertiary)",
  violet: "#8b5cf6",
};

const PRIORITY_ACCENT: Record<KanbanPriority, string> = {
  high: "var(--color-error)",
  medium: "var(--color-primary)",
  low: "var(--color-tertiary)",
};

const PRIORITY_LABEL: Record<KanbanPriority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

const PRIORITY_CHIP: Record<KanbanPriority, string> = {
  high: css.chip__priority_high,
  medium: css.chip__priority_medium,
  low: css.chip__priority_low,
};

export function Kanban({
  board,
  onMove,
  children,
}: {
  board?: KanbanBoard;
  onMove?: (cardId: string, fromColumnId: string, toColumnId: string) => void;
  children: KanbanChildren;
}) {
  return (
    <KanbanProvider initialBoard={board} onMove={onMove}>
      <KanbanColumns>{children}</KanbanColumns>
    </KanbanProvider>
  );
}

function KanbanColumns({ children }: { children: KanbanChildren }) {
  const { board } = useKanban();

  return (
    <div className={css.kanban}>
      {typeof children === "function"
        ? board.columns.map((col) => children({ col }))
        : children}
    </div>
  );
}

Kanban.Column = function KanbanColumnView({
  column,
  className,
  children,
  ...rest
}: {
  column: KanbanColumn;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">) {
  const dropHandlers = useColumnDrop({ columnId: column.id });

  return (
    <div
      className={classNames(css.column, {}, [className])}
      style={
        {
          "--kanban-accent": TONE_ACCENT[column.tone ?? "blue"],
        } as CSSProperties
      }
      {...dropHandlers}
      {...rest}
    >
      <div className={css.column__header}>
        <span className={css.pill}>
          <span className={css.dot} />
          {column.title}
        </span>
        <span className={css.count}>{column.cards.length}</span>
      </div>
      <div className={css.body}>{children}</div>
    </div>
  );
};

Kanban.CardList = function KanbanCardList({
  cards,
  columnId,
  className,
  emptyText = "No tasks.",
  children,
  ...rest
}: {
  cards?: KanbanCard[];
  columnId?: string;
  emptyText?: ReactNode;
  children: (({ card }: { card: KanbanCard }) => ReactNode) | ReactNode;
} & Omit<HTMLAttributes<HTMLUListElement>, "children">) {
  const { dragState } = useKanban();
  const isFn = typeof children === "function";
  const isEmpty = isFn && !cards?.length;

  const dropIndex =
    columnId != null &&
    dragState.cardId != null &&
    dragState.overColumnId === columnId
      ? dragState.overIndex
      : null;

  const placeholder = (
    <li
      aria-hidden
      className={css.placeholder}
      style={
        dragState.cardHeight != null
          ? { height: dragState.cardHeight }
          : undefined
      }
    />
  );

  return (
    <ul className={classNames(css.card_list, {}, [className])} {...rest}>
      {isEmpty ? (
        dropIndex != null ? (
          placeholder
        ) : (
          <li className={css.empty}>{emptyText}</li>
        )
      ) : isFn ? (
        <>
          {cards?.map((card, index) => (
            <Fragment key={card.id}>
              {dropIndex === index && placeholder}
              {children({ card })}
            </Fragment>
          ))}
          {dropIndex === cards?.length && placeholder}
        </>
      ) : (
        children
      )}
    </ul>
  );
};

Kanban.Card = function KanbanCardView({
  card,
  columnId,
  className,
  children,
  ...rest
}: { card: KanbanCard; columnId: string } & HTMLAttributes<HTMLLIElement>) {
  const { handlers, isDragging } = useCardDrag({ cardId: card.id, columnId });

  const accent = card.priority
    ? PRIORITY_ACCENT[card.priority]
    : "var(--kanban-accent)";

  return (
    <li
      {...{ [CARD_MARKER]: "" }}
      className={classNames(css.card, { [css.card__dragging]: isDragging }, [
        className,
      ])}
      style={{ "--card-accent": accent } as CSSProperties}
      {...handlers}
      {...rest}
    >
      {children ?? (
        <>
          <span className={css.card__title}>
            <span className={css.dot} />
            {card.title}
          </span>

          {(card.priority || card.size || card.assignees?.length) && (
            <div className={css.meta}>
              {card.priority && (
                <span
                  className={classNames(css.chip, {}, [
                    PRIORITY_CHIP[card.priority],
                  ])}
                >
                  {PRIORITY_LABEL[card.priority]}
                </span>
              )}
              {card.size && (
                <span className={classNames(css.chip, {}, [css.chip__size])}>
                  {card.size}
                </span>
              )}
              {card.assignees?.length ? (
                <span className={css.assignees}>
                  {card.assignees.map((person) => (
                    <Avatar key={person.name} person={person} size={22} ring />
                  ))}
                </span>
              ) : null}
            </div>
          )}

          {(card.project || card.date) && (
            <div className={css.info_row}>
              {card.project && (
                <span className={css.project}>
                  <Icon name="zap" size={13} />
                  {card.project}
                </span>
              )}
              {card.date && (
                <span className={css.date}>
                  <Icon name="calendar" size={13} />
                  {card.date}
                </span>
              )}
            </div>
          )}

          {card.tags?.length ? (
            <div className={css.tags}>
              {card.tags.map((tag) => (
                <span key={tag} className={css.tag}>
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </>
      )}
    </li>
  );
};

Kanban.AddTask = function KanbanAddTask({
  className,
  children = "New task",
  ...rest
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={classNames(css.add_task, {}, [className])}
      {...rest}
    >
      <Icon name="plus" size={18} />
      {children}
    </button>
  );
};
