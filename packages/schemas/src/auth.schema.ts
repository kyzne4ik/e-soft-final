import z from "zod";
import { roleSchema } from "./common.schema";

const ONE_DAY: number = 60 * 60 * 24; // 86400
const SEVEN_DAYS: number = ONE_DAY * 7; // 604800

export const inviteSchema = z.object({
  token: z.string(),
});

export type InviteDto = z.infer<typeof inviteSchema>;

export const inviteStorePayloadSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  patronymic: z.string().nullable().optional(),
  role: roleSchema,
  targetStreamId: z.number().int().positive().nullable().optional(),
  ttlSeconds: z.number().int().positive().max(SEVEN_DAYS).default(ONE_DAY),
});

export type InviteStorePayload = z.infer<typeof inviteStorePayloadSchema>;

export type InviteStoreResponse = z.infer<typeof inviteStorePayloadSchema>;

export const inviteResponseSchema = inviteSchema.extend({
  inviteLink: z.string().url(),
  expiresInSeconds: z.number().int().positive(),
});

export type InviteResponse = z.infer<typeof inviteResponseSchema>;

export type CreateInvitePayload = z.infer<typeof inviteStorePayloadSchema>;

export type GetDelInviteResponse = z.infer<typeof inviteStorePayloadSchema>;

export const authTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type AuthTokenDto = z.infer<typeof authTokenSchema>;

export const authTokenStorePayloadSchema = z.object({
  id: z.number().int(),
  role: roleSchema,
  profileId: z.number().int().nullable(),
});

export type AuthTokenStorePayload = z.infer<typeof authTokenStorePayloadSchema>;

export type AuthTokenStoreResponse = z.infer<
  typeof authTokenStorePayloadSchema
>;

export const authTokenResponseSchema = authTokenSchema;

export type AuthTokenResponse = z.infer<typeof authTokenResponseSchema>;

export type AuthTokenVerifyResponse = z.infer<
  typeof authTokenStorePayloadSchema
>;

export type AuthTokenIssuePayload = z.infer<typeof authTokenStorePayloadSchema>;

export const loginPayloadSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginPayload = z.infer<typeof loginPayloadSchema>;

export const logoutPayloadSchema = z.object({
  refreshToken: z.string().min(1),
});

export type LogoutPayload = z.infer<typeof logoutPayloadSchema>;

export type RefreshTokenPayload = z.infer<typeof logoutPayloadSchema>;

export const activatePayloadSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  patronymic: z.string().nullable().optional(),
});

export type ActivatePayload = z.infer<typeof activatePayloadSchema>;
