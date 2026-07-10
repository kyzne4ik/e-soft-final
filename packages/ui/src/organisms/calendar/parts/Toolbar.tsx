import type { ReactNode } from "react";
import { classNames } from "../../../libs/classNames";
import css from "../Calendar.module.css";

export interface ToolbarProps {
  children: ReactNode;
  className?: string;
}

export function Toolbar({ children, className }: ToolbarProps) {
  return (
    <div className={classNames(css.cal__toolbar, {}, [className])}>
      {children}
    </div>
  );
}
