import type { ReactNode, HTMLAttributes, DetailedHTMLProps } from "react";
import { type Mods, classNames } from "../../libs/classNames";
import css from "./Flex.module.css";

export type FlexJustify = "end" | "start" | "center" | "between";
export type FlexAlign = "end" | "start" | "center";
export type FlexDirection = "row" | "column";
export type FlexGap = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

const justifyClasses: Record<FlexJustify, string> = {
  end: css.justify_end,
  start: css.justify_start,
  center: css.justify_center,
  between: css.justify_between,
};

const alignClasses: Record<FlexAlign, string> = {
  end: css.align_end,
  start: css.align_start,
  center: css.align_center,
};

const directionClasses: Record<FlexDirection, string> = {
  row: css.direction_row,
  column: css.direction_column,
};

const gapClasses: Record<FlexGap, string> = {
  1: css.gap1,
  2: css.gap2,
  3: css.gap3,
  4: css.gap4,
  5: css.gap5,
  6: css.gap6,
  7: css.gap7,
  8: css.gap8,
};

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface FlexProps extends DivProps {
  gap?: FlexGap;
  max?: boolean;
  align?: FlexAlign;
  className?: string;
  flexFull?: boolean;
  children: ReactNode;
  justify?: FlexJustify;
  direction?: FlexDirection;
}

export const Flex = (props: FlexProps) => {
  const {
    gap,
    max,
    children,
    flexFull,
    className,
    align = "center",
    justify = "start",
    direction = "row",
    ...leftProps
  } = props;

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
  ];

  const mods: Mods = {
    [css.max]: max,
    [css.flexFull]: flexFull,
  };

  return (
    <div className={classNames(css.wrapper, mods, classes)} {...leftProps}>
      {children}
    </div>
  );
};
