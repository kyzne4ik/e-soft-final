import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Icon } from "@repo/ui/atoms/icon";
import { notificationsFeedQuery } from "@/entities/notifications/queries";
import { NotificationItem } from "../mark-notification-read";
import type { NotificationsTab } from "@repo/ui/organisms/notifications-panel";
import { OpenNotificationsListSkeleton } from "./OpenNotificationsListSkeleton";
import css from "./OpenNotificationsList.module.css";

function OpenNotificationsListError() {
  return (
    <div className={css.on_list__error}>
      <Icon name="circle-alert" size={32} />
      <span>Не удалось загрузить уведомления</span>
    </div>
  );
}

interface OpenNotificationsListInnerProps {
  tab: NotificationsTab;
}

function OpenNotificationsListInner({ tab }: OpenNotificationsListInnerProps) {
  const query = tab === "unread" ? { isRead: false } : undefined;

  const { data, isLoading } = useQuery(notificationsFeedQuery(query));

  const notifications = data?.data;

  if (isLoading) {
    return <OpenNotificationsListSkeleton />;
  }

  if (!notifications || notifications.length === 0) {
    return (
      <div className={css.on_list__empty}>
        <Icon name="bell-off" size={40} />
        <span>Пока нет уведомлений</span>
      </div>
    );
  }

  return (
    <div className={css.on_list}>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}

export interface OpenNotificationsListProps {
  tab?: NotificationsTab;
}

export function OpenNotificationsList({
  tab = "all",
}: OpenNotificationsListProps) {
  return (
    <ErrorBoundary fallback={<OpenNotificationsListError />}>
      <OpenNotificationsListInner tab={tab} />
    </ErrorBoundary>
  );
}
