import { type CSSProperties, type ReactNode } from "react";
import css from "./SplitView.module.css";

export interface SplitViewRootProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface SplitViewSidebarProps {
  children: ReactNode;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
}

export interface SplitViewWorkspaceProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function Root({ children, className, style }: SplitViewRootProps) {
  const cls = [css.root, className].filter(Boolean).join(" ");
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
}

function Sidebar({
  children,
  width = 240,
  className,
  style,
}: SplitViewSidebarProps) {
  const cls = [css.sidebar, className].filter(Boolean).join(" ");
  const w = typeof width === "number" ? `${width}px` : width;
  return (
    <aside className={cls} style={{ width: w, ...style }}>
      {children}
    </aside>
  );
}

function Workspace({ children, className, style }: SplitViewWorkspaceProps) {
  const cls = [css.workspace, className].filter(Boolean).join(" ");
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
}

export const SplitView = Object.assign(Root, { Sidebar, Workspace });
