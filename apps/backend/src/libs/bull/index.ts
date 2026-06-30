import { Worker } from "bullmq";
import { createEmailWorker } from "./workers/email.worker";
import { createTelegramWorker } from "./workers/telegram.worker";
import { emailQueue, enqueueEmail } from "./queues/email.queue";
import { telegramQueue, enqueueTelegram } from "./queues/telegram.queue";

export class BullWorkers {
  private static instance: BullWorkers;
  private workers: Worker[] = [];

  private constructor() {}

  static getInstance(): BullWorkers {
    if (!BullWorkers.instance) {
      BullWorkers.instance = new BullWorkers();
    }
    return BullWorkers.instance;
  }

  startWorkers(): void {
    this.workers = [createEmailWorker(), createTelegramWorker()];
  }

  async stopWorkers(): Promise<void> {
    await Promise.all(this.workers.map((w) => w.close()));
    await Promise.all([emailQueue.close(), telegramQueue.close()]);
  }
}

export const bullWorkers = BullWorkers.getInstance();

export { enqueueEmail, enqueueTelegram };
