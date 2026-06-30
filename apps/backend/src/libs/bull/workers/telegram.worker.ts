import { db } from "@repo/database";
import { GrammyError } from "grammy";
import { telegramService } from "@telegram";
import { bullConnection } from "@bull/connection";
import { type Job, UnrecoverableError, Worker } from "bullmq";
import { QUEUE_NAMES, TelegramJob, telegramJobSchema } from "@repo/schemas";
import { NotificationRepository } from "@modules/notification/notification.repository";
import { UserTelegramRepository } from "@modules/profile/user-telegram/user-telegram.repository";

const notificationRepo = new NotificationRepository(db);
const userTelegramRepo = new UserTelegramRepository(db);

const isTerminal = (e: unknown): boolean =>
  e instanceof GrammyError && (e.error_code === 400 || e.error_code === 403);

const handleUserDm = async (notificationId: number): Promise<void> => {
  const n = await notificationRepo.findById(notificationId);
  if (!n) return;
  if (n.status === "SENT") return;

  const link = await userTelegramRepo.findByUserId(n.userId);
  if (!link?.tgId) return;

  try {
    await telegramService.sendToUser(link.tgId, n.message);
    await notificationRepo.setStatus(notificationId, "SENT");
  } catch (e) {
    if (isTerminal(e)) {
      await notificationRepo.setStatus(notificationId, "FAILED");
      throw new UnrecoverableError(
        e instanceof GrammyError ? e.description : "terminal telegram error",
      );
    }
    throw e;
  }
};

export const createTelegramWorker = (): Worker => {
  const worker = new Worker(
    QUEUE_NAMES.telegram,
    async (job: Job<TelegramJob>) => {
      const data = telegramJobSchema.parse(job.data);

      switch (data.kind) {
        case "user-dm":
          return handleUserDm(data.notificationId);
        case "lesson-announce":
          // TODO: доставка анонсов лекций в топик группы.
          return;
        case "lesson-reminder":
          // TODO: доставка анонсов лекций в топик группы.
          return;
      }
    },
    { connection: bullConnection, limiter: { max: 25, duration: 1000 } },
  );

  return worker;
};
