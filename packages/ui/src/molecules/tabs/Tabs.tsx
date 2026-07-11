import { useState, type ReactNode, type CSSProperties } from "react";
import { createStrictContext, useStrictContext } from "../../libs/react/react";
import { classNames } from "../../libs/classNames";
import { Icon } from "../../atoms/icon";
import css from "./Tabs.module.css";

interface TabsCtx {
  active: string;
  setActive: (value: string) => void;
}

const TabsContext = createStrictContext<TabsCtx>();

function useTabsCtx() {
  return useStrictContext(TabsContext);
}

export interface TabsProps {
  defaultValue: string;
  value?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function Root({
  defaultValue,
  value,
  onChange,
  children,
  className,
  style,
}: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const active = value ?? internal;

  function setActive(next: string) {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  }

  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={className} style={style}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function List({ children, className, style }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={classNames(css.list, {}, [className])}
      style={style}
    >
      {children}
    </div>
  );
}

export interface TabsTabProps {
  value: string;
  children: ReactNode;
  icon?: string;
  className?: string;
  style?: CSSProperties;
}

function Tab({ value, children, icon, className, style }: TabsTabProps) {
  const { active, setActive } = useTabsCtx();
  const isActive = active === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={classNames(css.tab, { [css.tab__active]: isActive }, [
        className,
      ])}
      style={style}
      onClick={() => setActive(value)}
    >
      {icon ? <Icon name={icon} size={15} /> : null}
      {children}
    </button>
  );
}

export interface TabsPanelProps {
  value: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function Panel({ value, children, className, style }: TabsPanelProps) {
  const { active } = useTabsCtx();
  if (active !== value) return null;
  return (
    <div role="tabpanel" className={className} style={style}>
      {children}
    </div>
  );
}

export const Tabs = Object.assign(Root, { List, Tab, Panel });
