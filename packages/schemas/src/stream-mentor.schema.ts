import z from "zod";
import { paginationSchema, roleSchema } from "./common.schema";

export const streamMentorSchema = z.object({
  streamId: z.number().int(),
  mentorId: z.number().int(),
  joinedAt: z.coerce.date().nullable(),
});

export type StreamMentorDto = z.infer<typeof streamMentorSchema>;

export const streamMentorWithUserSchema = streamMentorSchema.merge(
  z.object({
    userId: z.number().int().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    patronymic: z.string().nullable(),
    email: z.string().email().nullable(),
    role: roleSchema.nullable(),
  }),
);

export type StreamMentorWithUserDto = z.infer<
  typeof streamMentorWithUserSchema
>;

export const streamMentorWithUserResponseSchema = streamMentorSchema.merge(
  z.object({
    userId: z.number().int().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    patronymic: z.string().nullable(),
    email: z.string().email().nullable(),
    role: roleSchema.nullable(),
  }),
);

export type StreamMentorWithUserResponse = z.infer<
  typeof streamMentorWithUserResponseSchema
>;

export const streamMentorQuerySchema = paginationSchema.partial();

export type StreamMentorQuery = z.infer<typeof streamMentorQuerySchema>;

export const addStreamMentorPayloadSchema = z.object({
  mentorId: z.number().int().positive(),
});

export type AddStreamMentorPayload = z.infer<
  typeof addStreamMentorPayloadSchema
>;

export const streamMentorParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
  mentorId: z.coerce.number().int().positive(),
});

export type StreamMentorParams = z.infer<typeof streamMentorParamsSchema>;
