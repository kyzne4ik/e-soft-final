import { Children, useState } from "react";
import { type ReactNode } from "react";
import { Button } from "../../atoms/button";
import { Icon } from "../../atoms/icon";
import { Segment } from "../../molecules/segment";
import { Sheet } from "../sheet";
import css from "./NotificationsPanel.module.css";

export type NotificationsTab = "all" | "unread";
export type NotificationsAlign = "right" | "left";

export interface NotificationsPanelProps {
  isOpen?: boolean;
  onClose: () => void;
  tab?: NotificationsTab;
  onTabChange?: (tab: NotificationsTab) => void;
  children?: ReactNode;
  emptyState?: ReactNode;
  unreadCount?: number;
  onMarkAllRead?: () => void;
  isMarkingAll?: boolean;
}

export function NotificationsPanel({
  isOpen = false,
  onClose,
  tab,
  onTabChange,
  children,
  emptyState,
  unreadCount = 0,
  onMarkAllRead,
  isMarkingAll = false,
}: NotificationsPanelProps) {
  const [internalTab, setInternalTab] = useState<NotificationsTab>("all");
  const activeTab = tab ?? internalTab;

  const selectTab = (next: NotificationsTab) => {
    setInternalTab(next);
    onTabChange?.(next);
  };

  const hasItems = Children.count(children) > 0;

  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <Sheet.Header onClose={onClose}>
        <span className={css.ui_np__title}>Уведомления</span>
        <Segment
          selectedKey={activeTab}
          onSelectionChange={(k) => selectTab(k as NotificationsTab)}
        >
          <Segment.Item id="all">Все</Segment.Item>
          <Segment.Item id="unread">Непрочитанные</Segment.Item>
        </Segment>
      </Sheet.Header>

      <Sheet.Body className={css.ui_np__list}>
        {hasItems
          ? children
          : (emptyState ?? (
              <div className={css.ui_np__empty}>
                <Icon name="bell-off" size={40} />
                <span>Пока нет уведомлений</span>
              </div>
            ))}
      </Sheet.Body>

      {onMarkAllRead ? (
        <Sheet.Footer>
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            onClick={onMarkAllRead}
            isPending={isMarkingAll}
            isDisabled={unreadCount === 0}
          >
            Отметить всё прочитанным
          </Button>
        </Sheet.Footer>
      ) : null}
    </Sheet>
  );
}
