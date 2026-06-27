import z from "zod";
import { paginationSchema, roleSchema } from "./common.schema";

export const userPublicSchema = z.object({
  id: z.number().int(),
  firstName: z.string(),
  lastName: z.string(),
  patronymic: z.string().nullable(),
  email: z.string().email(),
  role: roleSchema,
  isActivated: z.boolean(),
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
  isActivated: z.boolean(),
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

export const userResponseSchema = z.object({
  id: z.number().int(),
  firstName: z.string(),
  lastName: z.string(),
  patronymic: z.string().nullable(),
  email: z.string().email(),
  role: roleSchema,
  isActivated: z.boolean(),
  profileId: z.number().int().nullable(),
  // createdAt: z.coerce.date(),
  // updatedAt: z.coerce.date(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;

export const userQuerySchema = z
  .object({
    role: roleSchema.optional(),
    isActivated: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .optional(),
  })
  .merge(paginationSchema.partial());

export type UserQuery = z.infer<typeof userQuerySchema>;
