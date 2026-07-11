import { mailService } from "@mail";
import { type Job, Worker } from "bullmq";
import { QUEUE_NAMES } from "@repo/schemas";
import { SendMailOptions } from "nodemailer";
import { bullConnection } from "@bull/connection";

export const createEmailWorker = (): Worker => {
  const worker = new Worker(
    QUEUE_NAMES.email,
    async (job: Job<SendMailOptions>) => {
      await mailService.sendMail(job.data);
    },
    { connection: bullConnection },
  );

  return worker;
};
