import z from "zod";
import { paginationSchema, roleSchema } from "./common.schema";

export const studentStatusSchema = z.enum(["ACTIVE", "GRADUATED", "EXPELLED"]);

export type StudentStatus = z.infer<typeof studentStatusSchema>;

export const streamStudentSchema = z.object({
  streamId: z.number().int(),
  studentId: z.number().int(),
  mentorId: z.number().int().nullable(),
  status: studentStatusSchema,
  joinedAt: z.coerce.date().nullable(),
});

export type StreamStudentDto = z.infer<typeof streamStudentSchema>;

export const streamStudentWithUserSchema = streamStudentSchema.merge(
  z.object({
    userId: z.number().int().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    patronymic: z.string().nullable(),
    email: z.string().email().nullable(),
    role: roleSchema.nullable(),
  }),
);

export type StreamStudentWithUserDto = z.infer<
  typeof streamStudentWithUserSchema
>;

export const streamStudentQuerySchema = z
  .object({
    mentorId: z.number().int(),
  })
  .merge(paginationSchema)
  .partial();

export type StreamStudentQuery = z.infer<typeof streamStudentQuerySchema>;

export const streamStudentParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
  studentId: z.coerce.number().int().positive(),
});

export type StreamStudentParams = z.infer<typeof streamStudentParamsSchema>;

export const streamStudentWithUserResponseSchema = streamStudentSchema.merge(
  z.object({
    userId: z.number().int().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    patronymic: z.string().nullable(),
    email: z.string().email().nullable(),
    role: roleSchema.nullable(),
  }),
);

export type StreamStudentWithUserResponse = z.infer<
  typeof streamStudentWithUserResponseSchema
>;

export const addStreamStudentPayloadSchema = z.object({
  studentId: z.number().int().positive(),
  mentorId: z.number().int().positive(),
});

export type AddStreamStudentPayload = z.infer<
  typeof addStreamStudentPayloadSchema
>;

export const changeStreamStudentMentorPayloadSchema = z.object({
  mentorId: z.number().int().positive(),
});

export type ChangeStreamStudentMentorPayload = z.infer<
  typeof changeStreamStudentMentorPayloadSchema
>;

export const updateStreamStudentStatusPayloadSchema = z.object({
  status: studentStatusSchema,
});

export type UpdateStreamStudentStatusPayload = z.infer<
  typeof updateStreamStudentStatusPayloadSchema
>;
