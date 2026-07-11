import z from "zod";
import { paginationSchema, roleSchema } from "./common.schema";

export const userPublicSchema = z.object({
  id: z.number().int(),
  firstName: z.string(),
  lastName: z.string(),
  patronymic: z.string().nullable(),
  email: z.string().email(),
  role: roleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type UserPublicDto = z.infer<typeof userPublicSchema>;

export const userSchema = z.object({
  id: z.number().int(),
  firstName: z.string(),
  lastName: z.string(),
  patronymic: z.string().nullable(),
  email: z.string().email(),
  passwordHash: z.string(),
  role: roleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type UserDto = z.infer<typeof userSchema>;

export const createUserPayloadSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  patronymic: z.string().nullable(),
  email: z.string().email(),
  password: z.string().min(8),
  role: roleSchema,
});

export type CreateUserPayload = z.infer<typeof createUserPayloadSchema>;

export const updateUserPayloadSchema = createUserPayloadSchema
  .omit({ password: true })
  .partial();

export type UpdateUserPayload = z.infer<typeof updateUserPayloadSchema>;

export const changePasswordPayloadSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});

export type ChangePasswordPayload = z.infer<typeof changePasswordPayloadSchema>;

export const updateProfilePayloadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  patronymic: z.string().nullable().optional(),
  email: z.string().email(),
});

export type UpdateProfilePayload = z.infer<typeof updateProfilePayloadSchema>;

export const userResponseSchema = z.object({
  id: z.number().int(),
  firstName: z.string(),
  lastName: z.string(),
  patronymic: z.string().nullable(),
  email: z.string().email(),
  role: roleSchema,
  profileId: z.number().int().nullable(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;

export const userQuerySchema = z
  .object({
    role: roleSchema.optional(),
  })
  .merge(paginationSchema.partial());

export type UserQuery = z.infer<typeof userQuerySchema>;

export const generateLinkSchema = z.object({
  token: z.string(),
  link: z.string(),
});

export type GenerateLinkResponse = z.infer<typeof generateLinkSchema>;
