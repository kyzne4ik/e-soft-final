import { Queue } from "bullmq";
import { QUEUE_NAMES, LeadJob } from "@repo/schemas";
import { bullConnection } from "@bull/connection";

export const leadQueue = new Queue(QUEUE_NAMES.lead, {
  connection: bullConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: 1000,
  },
});

const IGNORE_DELAY_MS = 24 * 60 * 60 * 1000;

const ignoreJobId = (leadId: number) => `lead-ignore-${leadId}`;

export const scheduleLeadIgnore = async (leadId: number): Promise<void> => {
  await leadQueue.add(
    QUEUE_NAMES.lead,
    { kind: "lead-ignore", leadId } satisfies LeadJob,
    {
      delay: IGNORE_DELAY_MS,
      jobId: ignoreJobId(leadId),
    },
  );
};

export const cancelLeadIgnore = async (leadId: number): Promise<void> => {
  const job = await leadQueue.getJob(ignoreJobId(leadId));
  if (job) await job.remove();
};
