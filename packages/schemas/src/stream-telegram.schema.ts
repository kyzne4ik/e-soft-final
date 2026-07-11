import z from "zod";

export const streamTelegramSchema = z.object({
  id: z.number().int(),
  streamId: z.number().int(),
  chatId: z.string().nullable(),
  announceThreadId: z.number().int().nullable(),
  linkedAt: z.coerce.date().nullable(),
});

export type StreamTelegramDto = z.infer<typeof streamTelegramSchema>;

export const bindStreamTelegramPayloadSchema = z.object({
  chatId: z.string().nullable(),
  announceThreadId: z.number().int().nullable(),
});

export type BindStreamTelegramPayload = z.infer<
  typeof bindStreamTelegramPayloadSchema
>;

export const streamTelegramResponseSchema = z.object({
  id: z.number().int(),
  streamId: z.number().int(),
  chatId: z.string().nullable(),
  announceThreadId: z.number().int().nullable(),
});

export type StreamTelegramResponse = z.infer<
  typeof streamTelegramResponseSchema
>;
