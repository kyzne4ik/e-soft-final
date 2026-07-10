import z from "zod";
import { paginationSchema } from "./common.schema";
import { inviteResponseSchema } from "./auth.schema";

export const leadStatusSchema = z.enum([
  "NEW",
  "IN_REVIEW",
  "ACCEPTED",
  "REJECTED",
  "IGNORED",
]);

export type LeadStatus = z.infer<typeof leadStatusSchema>;

export const leadSchema = z.object({
  id: z.number().int(),
  convertedUserId: z.number().int().nullable(),
  managerId: z.number().int().nullable(),
  targetStreamId: z.number().int(),
  firstName: z.string(),
  lastName: z.string(),
  patronymic: z.string().nullable(),
  email: z.string().email(),
  phone: z.string().nullable(),
  telegram: z.string().nullable(),
  experience: z.string().nullable(),
  testResult: z.string().nullable(),
  status: leadStatusSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type LeadDto = z.infer<typeof leadSchema>;

export const createLeadPayloadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  patronymic: z.string().nullable().optional(),
  email: z.string().email(),
  phone: z.string().min(1).nullable().optional(),
  telegram: z.string().min(1).nullable().optional(),
  experience: z.string().nullable().optional(),
  testResult: z.string().url().nullable().optional(),
});

export type CreateLeadPayload = z.infer<typeof createLeadPayloadSchema>;

export const createManualLeadPayloadSchema = createLeadPayloadSchema.extend({
  targetStreamId: z.number().int().positive(),
});

export type CreateManualLeadPayload = z.infer<
  typeof createManualLeadPayloadSchema
>;

export const updateLeadStatusPayloadSchema = z.object({
  status: leadStatusSchema,
});

export type UpdateLeadStatusPayload = z.infer<
  typeof updateLeadStatusPayloadSchema
>;

export const leadQuerySchema = z
  .object({
    status: leadStatusSchema,
    managerId: z.coerce.number().int().positive(),
    targetStreamId: z.coerce.number().int().positive(),
  })
  .merge(paginationSchema)
  .partial();

export type LeadQuery = z.infer<typeof leadQuerySchema>;

export const leadResponseSchema = leadSchema;

export type LeadResponse = z.infer<typeof leadResponseSchema>;

export const leadStatusResponseSchema = z.object({
  lead: leadResponseSchema,
  invite: inviteResponseSchema.nullable(),
});

export type LeadStatusResponse = z.infer<typeof leadStatusResponseSchema>;

export const upsertLeadRepositoryPayloadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  patronymic: z.string().nullable().optional(),
  email: z.string().email(),
  phone: z.string().min(1).nullable().optional(),
  telegram: z.string().min(1).nullable().optional(),
  experience: z.string().nullable().optional(),
  testResult: z.string().url().nullable().optional(),
  targetStreamId: z.number().int().positive(),
});

export type UpsertLeadRepositoryPayload = z.infer<
  typeof upsertLeadRepositoryPayloadSchema
>;
