import { Queue } from "bullmq";
import { QUEUE_NAMES, TelegramJob } from "@repo/schemas";
import { bullConnection } from "@bull/connection";

export const telegramQueue = new Queue(QUEUE_NAMES.telegram, {
  connection: bullConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      jitter: 0.5,
      delay: 2000,
    },
    removeOnComplete: 1000,
  },
});

export const enqueueTelegram = async (
  job: TelegramJob,
  opts: {
    delay?: number;
    jobId?: string;
  } = {},
): Promise<void> => {
  await telegramQueue.add(QUEUE_NAMES.telegram, job, opts);
};

export const removeTelegramJob = async (jobId: string): Promise<void> => {
  const job = await telegramQueue.getJob(jobId);
  if (job) await job.remove();
};
