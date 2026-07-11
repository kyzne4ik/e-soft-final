import { useState, type Key, type ReactNode, type CSSProperties } from "react";
import { createStrictContext, useStrictContext } from "../../libs/react/react";
import { classNames } from "../../libs/classNames";
import css from "./Segment.module.css";

export type SegmentVariant = "default" | "ghost";
export type SegmentSize = "sm" | "md" | "lg";

interface SegmentCtx {
  selected: Key | null;
  select: (key: Key) => void;
  isDisabled: boolean;
  size: SegmentSize;
  variant: SegmentVariant;
}

const SegmentContext = createStrictContext<SegmentCtx>();

function useSegmentCtx() {
  return useStrictContext(SegmentContext);
}

export interface SegmentProps {
  variant?: SegmentVariant;
  size?: SegmentSize;
  selectedKey?: Key | null;
  defaultSelectedKey?: Key;
  onSelectionChange?: (key: Key) => void;
  isDisabled?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function Root({
  variant = "default",
  size = "md",
  selectedKey,
  defaultSelectedKey,
  onSelectionChange,
  isDisabled = false,
  children,
  className,
  style,
}: SegmentProps) {
  const [internal, setInternal] = useState<Key | null>(
    defaultSelectedKey ?? null,
  );
  const selected = selectedKey !== undefined ? selectedKey : internal;

  function select(key: Key) {
    if (selectedKey === undefined) setInternal(key);
    onSelectionChange?.(key);
  }

  return (
    <SegmentContext.Provider
      value={{ selected, select, isDisabled, size, variant }}
    >
      <div
        role="radiogroup"
        className={classNames(css.root, {}, [
          css[`root__${variant}`],
          className,
        ])}
        style={style}
      >
        {children}
      </div>
    </SegmentContext.Provider>
  );
}

export interface SegmentItemProps {
  id: Key;
  children:
    | ReactNode
    | ((renderProps: {
        isSelected: boolean;
        isDisabled: boolean;
      }) => ReactNode);
  isDisabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

function Item({
  id,
  children,
  isDisabled: itemDisabled,
  className,
  style,
}: SegmentItemProps) {
  const { selected, select, isDisabled: groupDisabled, size } = useSegmentCtx();
  const isSelected = selected === id;
  const isDisabled = groupDisabled || Boolean(itemDisabled);

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      disabled={isDisabled}
      data-size={size}
      className={classNames(css.item, { [css.item__selected]: isSelected }, [
        className,
      ])}
      style={style}
      onClick={() => select(id)}
    >
      {typeof children === "function"
        ? children({ isSelected, isDisabled })
        : children}
    </button>
  );
}

export const Segment = Object.assign(Root, { Item });
