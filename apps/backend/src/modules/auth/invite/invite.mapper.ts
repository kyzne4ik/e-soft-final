import { InviteResponse } from "@repo/schemas";
import { buildInviteLink } from "@utils";

export const inviteMap = (
  token: string,
  expiresInSeconds: number,
): InviteResponse => ({
  token,
  inviteLink: buildInviteLink(token),
  expiresInSeconds,
});
