import z from "zod";
import { paginationSchema } from "./common.schema";

export const streamStatusSchema = z.enum([
  "ENROLLING",
  "IN_PROGRESS",
  "FINISHED",
]);

export type StreamStatus = z.infer<typeof streamStatusSchema>;

export const streamSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  courseId: z.number().int(),
  status: streamStatusSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type StreamDto = z.infer<typeof streamSchema>;

export const streamResponseSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  courseId: z.number().int(),
  status: streamStatusSchema,
});

export type StreamResponse = z.infer<typeof streamResponseSchema>;

export const createStreamRepositoryPayloadSchema = z.object({
  name: z.string().min(1),
  courseId: z.number().int().positive(),
});

export type CreateStreamRepositoryPayload = z.infer<
  typeof createStreamRepositoryPayloadSchema
>;

export const updateStreamRepositoryPayloadSchema = z
  .object({
    name: z.string().min(1),
    courseId: z.number().int().positive(),
    status: streamStatusSchema,
  })
  .partial();

export type UpdateStreamRepositoryPayload = z.infer<
  typeof updateStreamRepositoryPayloadSchema
>;

export const finishStreamAndGraduateStudentsRepositoryResponseSchema = z.object(
  {
    stream: streamSchema,
    graduatedCount: z.number(),
  },
);

export type FinishStreamAndGraduateStudentsRepositoryResponse = z.infer<
  typeof finishStreamAndGraduateStudentsRepositoryResponseSchema
>;

export const finishStreamAndGraduateStudentsResponseSchema = z.object({
  stream: streamResponseSchema,
  graduatedCount: z.number(),
});

export type FinishStreamAndGraduateStudentsResponse = z.infer<
  typeof finishStreamAndGraduateStudentsResponseSchema
>;

export const revertStreamFinishRepositoryResponseSchema = z.object({
  stream: streamSchema,
  graduatedCount: z.number(),
});

export type RevertStreamFinishRepositoryResponse = z.infer<
  typeof revertStreamFinishRepositoryResponseSchema
>;

export const revertStreamFinishResponseSchema = z.object({
  stream: streamResponseSchema,
  graduatedCount: z.number(),
});

export type RevertStreamFinishResponse = z.infer<
  typeof revertStreamFinishResponseSchema
>;

export const createStreamPayloadSchema = z.object({
  name: z.string().min(1),
  courseId: z.number().int().positive(),
});

export type CreateStreamPayload = z.infer<typeof createStreamPayloadSchema>;

export const updateStreamPayloadSchema = z
  .object({
    name: z.string().min(1),
    courseId: z.number().int().positive(),
    status: streamStatusSchema,
  })
  .partial();

export type UpdateStreamPayload = z.infer<typeof updateStreamPayloadSchema>;

export const streamQuerySchema = z
  .object({
    courseId: z.number().int(),
  })
  .merge(paginationSchema)
  .partial();

export type StreamQuery = z.infer<typeof streamQuerySchema>;

export const openIntakePayloadSchema = z.object({
  streamId: z.number().int().positive(),
  expiresIn: z.number().int().positive(),
});
export type OpenIntakePayload = z.infer<typeof openIntakePayloadSchema>;

export const openIntakeResponseSchema = z.object({
  token: z.string(),
});
export type OpenIntakeResponse = z.infer<typeof openIntakeResponseSchema>;
