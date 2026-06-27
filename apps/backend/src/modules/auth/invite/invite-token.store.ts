import Redis from "ioredis";
import { IInviteTokenStore } from "./invite.types";
import {
  InviteDto,
  InviteStorePayload,
  InviteStoreResponse,
} from "@repo/schemas";

export class InviteTokenStore implements IInviteTokenStore {
  private readonly INVITE_PREFIX = "invite:";

  constructor(private redis: Redis) {}

  async set(hashedToken: string, data: InviteStorePayload): Promise<InviteDto> {
    const { ttlSeconds, ...restData } = data;

    await this.redis.set(
      this.INVITE_PREFIX + hashedToken,
      JSON.stringify(restData),
      "EX",
      ttlSeconds,
    );

    return { token: hashedToken };
  }

  async getAndDelete(hashedToken: string): Promise<InviteStoreResponse | null> {
    const raw = await this.redis.getdel(this.INVITE_PREFIX + hashedToken);

    if (!raw) return null;

    return JSON.parse(raw) as InviteStoreResponse;
  }
}
