import z from "zod";
import { paginationSchema } from "./common.schema";

export const lessonSchema = z.object({
  id: z.number().int(),
  streamId: z.number().int(),
  title: z.string(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  meetingLink: z.string().nullable(),
  recordLink: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type LessonDto = z.infer<typeof lessonSchema>;

const lessonPayloadBase = z.object({
  streamId: z.number().int().positive(),
  title: z.string().min(1),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  meetingLink: z.string().url().nullable().optional(),
  recordLink: z.string().url().nullable().optional(),
});

const endAfterStart = {
  message: "Время окончания должно быть позже времени начала",
  path: ["endTime"],
};

export const createLessonPayloadSchema = lessonPayloadBase.refine(
  (data) => data.endTime > data.startTime,
  endAfterStart,
);

export type CreateLessonPayload = z.infer<typeof createLessonPayloadSchema>;

export const updateLessonPayloadSchema = lessonPayloadBase
  .partial()
  .refine(
    (data) => !data.startTime || !data.endTime || data.endTime > data.startTime,
    endAfterStart,
  );

export type UpdateLessonPayload = z.infer<typeof updateLessonPayloadSchema>;

export const lessonResponseSchema = z.object({
  id: z.number().int(),
  streamId: z.number().int(),
  title: z.string(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  meetingLink: z.string().nullable(),
  recordLink: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type LessonResponse = z.infer<typeof lessonResponseSchema>;

export const lessonQuerySchema = z
  .object({
    streamId: z.coerce.number().int().positive().optional(),
  })
  .merge(paginationSchema.partial());

export type LessonQuery = z.infer<typeof lessonQuerySchema>;
