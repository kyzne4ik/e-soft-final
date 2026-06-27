import { Worker } from "bullmq";
import { createEmailWorker } from "./workers/email.worker";
import { emailQueue, enqueueEmail } from "./queues/email.queue";

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
    this.workers = [createEmailWorker()];
  }

  async stopWorkers(): Promise<void> {
    await Promise.all(this.workers.map((w) => w.close()));
    await Promise.all([emailQueue.close()]);
  }
}

export const bullWorkers = BullWorkers.getInstance();

export { enqueueEmail };
