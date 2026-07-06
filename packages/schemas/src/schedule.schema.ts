import z from "zod";
import { paginationSchema } from "./common.schema";

export const scheduleQuerySchema = z
  .object({
    streamId: z.coerce.number().int().positive().optional(),
    mentorId: z.coerce.number().int().positive().optional(),
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
  })
  .merge(paginationSchema.partial());

export type ScheduleQuery = z.infer<typeof scheduleQuerySchema>;
