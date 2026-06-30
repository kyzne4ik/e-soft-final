import { Queue } from "bullmq";
import { QUEUE_NAMES } from "@repo/schemas";
import { SendMailOptions } from "nodemailer";
import { bullConnection } from "@bull/connection";

export const emailQueue = new Queue(QUEUE_NAMES.email, {
  connection: bullConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      jitter: 0.5,
      delay: 1000,
    },
  },
});

export const enqueueEmail = async (options: SendMailOptions): Promise<void> => {
  emailQueue.add(QUEUE_NAMES.email, options);
};
