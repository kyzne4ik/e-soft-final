import { type Job, Worker } from "bullmq";
import {
  LessonDelivery,
  NotificationDelivery,
  TelegramDispatcher,
  telegramService,
} from "@telegram";
import { db } from "@repo/database";
import { bullConnection } from "@bull/connection";
import { QUEUE_NAMES, TelegramJob, telegramJobSchema } from "@repo/schemas";
import { LessonRepository } from "@modules/schedule/lesson/lesson.repository";
import { NotificationRepository } from "@modules/notification/notification.repository";
import { UserTelegramRepository } from "@modules/profile/user-telegram/user-telegram.repository";
import { StreamTelegramRepository } from "@modules/lms/stream/stream-telegram/stream-telegram.repository";

const telegramDispatcher = new TelegramDispatcher(
  new NotificationDelivery(
    new UserTelegramRepository(db),
    new NotificationRepository(db),
    telegramService,
  ),
  new LessonDelivery(
    new LessonRepository(db),
    new StreamTelegramRepository(db),
    telegramService,
  ),
);

export const createTelegramWorker = (): Worker => {
  const worker = new Worker(
    QUEUE_NAMES.telegram,
    async (job: Job<TelegramJob>) => {
      const data = telegramJobSchema.parse(job.data);
      await telegramDispatcher.dispatch(data);
    },
    { connection: bullConnection, limiter: { max: 25, duration: 1000 } },
  );

  return worker;
};
