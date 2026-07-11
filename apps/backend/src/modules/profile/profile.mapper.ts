import {
  UserTelegramDto,
  UserTelegramResponse,
  GenerateLinkResponse,
} from "@repo/schemas";
import { buildTelegramLink } from "@utils";

export const profileMap = (
  ut: UserTelegramDto | null,
): UserTelegramResponse => ({
  tgId: ut?.tgId ?? null,
  tgUsername: ut?.tgUsername ?? null,
});

export const generateLinkMap = (token: string): GenerateLinkResponse => ({
  token,
  link: buildTelegramLink(token),
});
