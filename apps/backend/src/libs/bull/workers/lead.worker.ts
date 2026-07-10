import { type Job, Worker } from "bullmq";
import { db } from "@repo/database";
import { bullConnection } from "@bull/connection";
import { QUEUE_NAMES, LeadJob, leadJobSchema } from "@repo/schemas";
import { LeadRepository } from "@modules/crm/lead.repository";

const leadRepo = new LeadRepository(db);

export const createLeadWorker = (): Worker => {
  const worker = new Worker(
    QUEUE_NAMES.lead,
    async (job: Job<LeadJob>) => {
      const data = leadJobSchema.parse(job.data);

      if (data.kind === "lead-ignore") {
        const lead = await leadRepo.findById(data.leadId);

        if (
          !lead ||
          lead.convertedUserId !== null ||
          lead.status !== "ACCEPTED"
        )
          return;

        await leadRepo.updateStatusSystem(data.leadId, "IGNORED");
      }
    },
    { connection: bullConnection },
  );

  return worker;
};
