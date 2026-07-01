import { enqueueTelegram } from "@bull";
import { removeTelegramJob } from "@bull/queues/telegram.queue";
import { ILessonScheduler, SchedulableLesson } from "./lesson.types";

const announceJobId = (id: number): string => `lesson-announce-${id}`;
const reminderJobId = (id: number): string => `lesson-reminder-${id}`;

export class LessonScheduler implements ILessonScheduler {
  private readonly ANNOUNCE_MS: number = 24 * 60 * 60 * 1000;
  private readonly REMINDER_MS: number = 15 * 60 * 1000;

  constructor() {}

  async scheduleLesson(lesson: SchedulableLesson): Promise<void> {
    const now = Date.now();
    const start = lesson.startTime.getTime();

    const announceDelay = start - now - this.ANNOUNCE_MS;
    if (!lesson.announceSentAt && start > now)
      await enqueueTelegram(
        {
          kind: "lesson-announce",
          lessonId: lesson.id,
        },
        {
          delay: Math.max(0, announceDelay),
          jobId: announceJobId(lesson.id),
        },
      );

    const reminderDelay = start - now - this.REMINDER_MS;
    if (!lesson.reminderSentAt && start > now)
      await enqueueTelegram(
        {
          kind: "lesson-reminder",
          lessonId: lesson.id,
        },
        {
          delay: Math.max(0, reminderDelay),
          jobId: reminderJobId(lesson.id),
        },
      );
  }

  async rescheduleLesson(lesson: SchedulableLesson): Promise<void> {
    await this.cancelLesson(lesson);
    await this.scheduleLesson(lesson);
  }

  async cancelLesson(lesson: SchedulableLesson): Promise<void> {
    await Promise.all([
      removeTelegramJob(announceJobId(lesson.id)),
      removeTelegramJob(reminderJobId(lesson.id)),
    ]);
  }
}
