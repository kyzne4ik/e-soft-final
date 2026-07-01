import { TelegramJob } from "@repo/schemas";
import { LessonDelivery } from "./lesson.delivery";
import { NotificationDelivery } from "./notification.delivery";

export class TelegramDispatcher {
  constructor(
    private notificationDelivery: NotificationDelivery,
    private lessonDeliver: LessonDelivery,
  ) {}

  dispatch(job: TelegramJob) {
    switch (job.kind) {
      case "user-dm":
        return this.notificationDelivery.deliverDm(job.notificationId);
      case "lesson-announce":
        return this.lessonDeliver.deliverAnnounce(job.lessonId);
      case "lesson-reminder":
        return this.lessonDeliver.deliverReminder(job.lessonId);
      case "lesson-reschedule":
        return this.lessonDeliver.deliverReschedule(job.lessonId);
      case "lesson-cancel":
        return this.lessonDeliver.deliverCancel(job);
    }
  }
}
