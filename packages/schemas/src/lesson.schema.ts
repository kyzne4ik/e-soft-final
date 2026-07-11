import z from "zod";
import { paginationSchema } from "./common.schema";

export const lessonSchema = z.object({
  id: z.number().int(),
  streamId: z.number().int(),
  title: z.string(),
  type: z.string().nullable(),
  host: z.string().nullable(),
  description: z.string().nullable(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  meetingLink: z.string().nullable(),
  recordLink: z.string().nullable(),
  announceSentAt: z.coerce.date().nullable(),
  reminderSentAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type LessonDto = z.infer<typeof lessonSchema>;

export const createLessonPayloadSchema = z.object({
  streamId: z.number().int(),
  title: z.string(),
  type: z.string().nullable(),
  host: z.string().nullable(),
  description: z.string().nullable(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  meetingLink: z.string().nullable(),
  recordLink: z.string().nullable(),
});

export type CreateLessonRepositoryPayload = z.infer<
  typeof createLessonPayloadSchema
>;

export const overlappingLessonPayloadSchema = z.object({
  streamId: z.number().int(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
});

export type OverlappingLessonRepositoryPayload = z.infer<
  typeof overlappingLessonPayloadSchema
>;

export const updateLessonPayloadSchema = createLessonPayloadSchema.partial();

export type UpdateLessonRepositoryPayload = z.infer<
  typeof updateLessonPayloadSchema
>;

export type CreateLessonPayload = z.infer<typeof createLessonPayloadSchema>;

export type UpdateLessonPayload = z.infer<typeof updateLessonPayloadSchema>;

export const lessonResponseSchema = z.object({
  id: z.number().int(),
  streamId: z.number().int(),
  title: z.string(),
  type: z.string().nullable(),
  host: z.string().nullable(),
  description: z.string().nullable(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  meetingLink: z.string().nullable(),
  recordLink: z.string().nullable(),
  announceSentAt: z.coerce.date().nullable(),
  reminderSentAt: z.coerce.date().nullable(),
});

export type LessonsResponse = z.infer<typeof lessonResponseSchema>;

export const lessonQuerySchema = z
  .object({
    streamId: z.coerce.number().int().optional(),
  })
  .merge(paginationSchema);

export type LessonQuery = z.infer<typeof lessonQuerySchema>;
