import type {
  HTMLAttributes,
  KeyboardEvent,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from "react";
import { classNames } from "../../libs/classNames";
import { Icon } from "../../atoms/icon";
import css from "./Table.module.css";

export type TableAlign = "left" | "center" | "right";

const ALIGN_CLASS: Record<TableAlign, string | undefined> = {
  left: undefined,
  center: css.ui_table__center,
  right: css.ui_table__right,
};

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode;
  maxHeight?: number | string;
}

export function Table({ className, children, maxHeight, ...rest }: TableProps) {
  return (
    <div
      className={css.ui_table__wrap}
      style={maxHeight != null ? { maxHeight, overflowY: "auto" } : undefined}
    >
      <table className={classNames(css.ui_table, {}, [className])} {...rest}>
        {children}
      </table>
    </div>
  );
}

export interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  sticky?: boolean;
}

Table.Head = function TableHead({
  sticky = false,
  className,
  children,
  ...rest
}: TableHeadProps) {
  return (
    <thead
      className={classNames(
        css.ui_table__head,
        { [css.ui_table__head__sticky]: sticky },
        [className],
      )}
      {...rest}
    >
      {children}
    </thead>
  );
};

Table.Body = function TableBody({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={classNames(css.ui_table__body, {}, [className])}
      {...rest}
    >
      {children}
    </tbody>
  );
};

export interface TableRowProps extends Omit<
  HTMLAttributes<HTMLTableRowElement>,
  "onClick"
> {
  onClick?: () => void;
}

Table.Row = function TableRow({
  className,
  children,
  onClick,
  onKeyDown,
  ...rest
}: TableRowProps) {
  const clickable = Boolean(onClick);

  const handleKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
    onKeyDown?.(event);
    if (clickable && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <tr
      className={classNames(
        css.ui_table__row,
        { [css.ui_table__row__clickable]: clickable },
        [className],
      )}
      onClick={onClick}
      onKeyDown={clickable ? handleKeyDown : onKeyDown}
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? "button" : undefined}
      {...rest}
    >
      {children}
    </tr>
  );
};

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign;
}

Table.HeaderCell = function TableHeaderCell({
  align = "left",
  className,
  children,
  ...rest
}: TableHeaderCellProps) {
  return (
    <th
      className={classNames(css.ui_table__th, {}, [
        ALIGN_CLASS[align],
        className,
      ])}
      {...rest}
    >
      {children}
    </th>
  );
};

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign;
}

Table.Cell = function TableCell({
  align = "left",
  className,
  children,
  ...rest
}: TableCellProps) {
  return (
    <td
      className={classNames(css.ui_table__cell, {}, [
        ALIGN_CLASS[align],
        className,
      ])}
      {...rest}
    >
      {children}
    </td>
  );
};

export interface TableEmptyProps {
  colSpan: number;
  children?: ReactNode;
  icon?: string;
  message?: ReactNode;
}

Table.Empty = function TableEmpty({
  colSpan,
  children,
  icon = "inbox",
  message = "Нет данных",
}: TableEmptyProps) {
  return (
    <tr>
      <td colSpan={colSpan} className={css.ui_table__empty__cell}>
        {children ?? (
          <div className={css.ui_table__empty}>
            {icon ? <Icon name={icon} size={36} /> : null}
            <span>{message}</span>
          </div>
        )}
      </td>
    </tr>
  );
};
