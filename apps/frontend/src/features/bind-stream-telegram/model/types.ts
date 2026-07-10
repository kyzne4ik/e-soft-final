import { z } from "zod";

export const bindStreamTelegramSchema = z.object({
  chatId: z.string().min(1, "Укажите ID чата/канала"),
  announceThreadId: z.string(),
});

export type BindStreamTelegramFormData = z.infer<
  typeof bindStreamTelegramSchema
>;
