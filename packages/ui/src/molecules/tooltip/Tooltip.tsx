import type { ReactNode } from "react";
import { classNames } from "../../libs/classNames";
import css from "./Tooltip.module.css";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  children: ReactNode;
  text: ReactNode;
  position?: TooltipPosition;
}

export function Tooltip({ children, text, position = "top" }: TooltipProps) {
  return (
    <span
      className={classNames(css.ui_tooltip, {}, [
        css[`ui_tooltip__${position}`],
      ])}
    >
      {children}
      <span className={css.ui_tooltip__bubble} role="tooltip">
        {text}
      </span>
    </span>
  );
}
