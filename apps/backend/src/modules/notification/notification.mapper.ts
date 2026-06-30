import { NotificationDto, NotificationResponse } from "@repo/schemas";

export const notificationMap = (n: NotificationDto): NotificationResponse => ({
  id: n.id,
  message: n.message,
  isSilent: n.isSilent,
  sendAt: n.sendAt,
  status: n.status,
  isRead: n.isRead,
});

export const notificationsMap = (
  ns: NotificationDto[],
): NotificationResponse[] => ns.map(notificationMap);
