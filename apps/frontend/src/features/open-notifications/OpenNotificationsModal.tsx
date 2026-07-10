import { useState } from "react";
import { Sheet } from "@repo/ui/organisms/sheet";
import { Segment } from "@repo/ui/molecules/segment";
import css from "./OpenNotificationsModal.module.css";
import { OpenNotificationsList } from "./ui/OpenNotificationsList";
import { MarkAllNotificationsReadButton } from "./mark-all-notifications-read";
import type { NotificationsTab } from "@repo/ui/organisms/notifications-panel";

export interface OpenNotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OpenNotificationsModal({
  isOpen,
  onClose,
}: OpenNotificationsModalProps) {
  const [tab, setTab] = useState<NotificationsTab>("all");

  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <Sheet.Header onClose={onClose}>
        <span className={css.on_modal__title}>Уведомления</span>
        <Segment
          selectedKey={tab}
          onSelectionChange={(k) => setTab(k as NotificationsTab)}
        >
          <Segment.Item id="all">Все</Segment.Item>
          <Segment.Item id="unread">Непрочитанные</Segment.Item>
        </Segment>
      </Sheet.Header>
      <Sheet.Body className={css.on_modal__body}>
        <OpenNotificationsList tab={tab} />
      </Sheet.Body>
      <Sheet.Footer className={css.on_modal__footer}>
        <MarkAllNotificationsReadButton />
      </Sheet.Footer>
    </Sheet>
  );
}
