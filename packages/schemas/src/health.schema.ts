import { z } from "zod";

export const healthResponseSchema = z.object({
  status: z.enum(["ok", "degraded"]),
  uptime: z.number().int().nonnegative(),
  timestamps: z.string().datetime(),
  environment: z.string(),
  services: z.object({
    redis: z.enum(["up", "down"]),
    database: z.enum(["up", "down"]),
  }),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
