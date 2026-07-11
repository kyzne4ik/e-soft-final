import z from "zod";

export const courseSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type CourseDto = z.infer<typeof courseSchema>;

export const courseResponseSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string().nullable(),
});

export type CourseResponse = z.infer<typeof courseResponseSchema>;

export const createCoursePayloadSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable().optional(),
});

export type CreateCoursePayload = z.infer<typeof createCoursePayloadSchema>;

export type CreateCourseRepositoryPayload = z.infer<
  typeof createCoursePayloadSchema
>;

export const updateCoursePayloadSchema = createCoursePayloadSchema.partial();

export type UpdateCourseRepositoryPayload = z.infer<
  typeof updateCoursePayloadSchema
>;

export type UpdateCoursePayload = z.infer<typeof updateCoursePayloadSchema>;
