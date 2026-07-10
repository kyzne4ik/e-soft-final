import type { NotificationResponse } from "@repo/schemas";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { formatRelativeTime } from "../model/formatRelativeTime";
import { useMarkNotificationRead } from "../model/useMarkNotificationRead";
import { NotificationBanner } from "@repo/ui/molecules/notification-banner";

export interface NotificationItemProps {
  notification: NotificationResponse;
  icon?: string;
}

export function NotificationItem({
  notification,
  icon,
}: NotificationItemProps) {
  const { getToast } = useToast();

  const { markRead, isPending } = useMarkNotificationRead({
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message ||
          "Не удалось отметить уведомление прочитанным",
      });
    },
  });

  const handleClick = () => {
    if (notification.isRead || isPending) return;
    markRead(notification.id);
  };

  return (
    <NotificationBanner
      icon={icon}
      title={notification.message}
      time={formatRelativeTime(notification.sendAt)}
      isRead={notification.isRead}
      onClick={notification.isRead ? undefined : handleClick}
    />
  );
}
