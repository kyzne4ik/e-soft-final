import { UserTelegramDto, UserTelegramResponse } from "@repo/schemas";

export const profileMap = (
  ut: UserTelegramDto | null,
): UserTelegramResponse => ({
  tgId: ut?.tgId ?? null,
  tgUsername: ut?.tgUsername ?? null,
});
