import z from "zod";

export const userTelegramSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  tgId: z.string().nullable(),
  tgUsername: z.string().nullable(),
  linkedAt: z.coerce.date().nullable(),
});

export type UserTelegramDto = z.infer<typeof userTelegramSchema>;

export const createUserTelegramSchema = z.object({
  tgId: z.string().nullable(),
  tgUsername: z.string().nullable(),
});

export type CreateUserTelegramPayload = z.infer<
  typeof createUserTelegramSchema
>;

export const updateUserTelegramPayloadSchema =
  createUserTelegramSchema.partial();

export type UpdateUserTelegramPayload = z.infer<
  typeof updateUserTelegramPayloadSchema
>;

export const userTelegramResponseSchema = z.object({
  tgId: z.string().nullable(),
  tgUsername: z.string().nullable(),
});

export type UserTelegramResponse = z.infer<typeof userTelegramResponseSchema>;

export const bindTelegramPayloadSchema = z.object({
  tgId: z.string().min(1).max(64),
  tgUsername: z.string().min(1).max(64),
});

export type BindTelegramPayload = z.infer<typeof bindTelegramPayloadSchema>;
