import type { ReactNode } from "react";

import { Icon } from "../../atoms/icon";
import { Text } from "../../atoms/text";

import css from "./EmptyState.module.css";

export interface EmptyStateProps {
  icon?: string;
  title: ReactNode;
  text?: ReactNode;
  action?: ReactNode;
}

export function EmptyState({
  icon = "inbox",
  title,
  text,
  action,
}: EmptyStateProps) {
  return (
    <div className={css.ui_empty}>
      <div className={css.ui_empty__icon}>
        <Icon name={icon} size={34} />
      </div>
      <Text.H2>{title}</Text.H2>
      {text ? <Text.P2 className={css.ui_empty__text}>{text}</Text.P2> : null}
      {action}
    </div>
  );
}
