import Redis from "ioredis";
import { IAuthTokenStore } from "./auth-token.types";
import { AuthTokenStorePayload, AuthTokenStoreResponse } from "@repo/schemas";

export class AuthTokenStore implements IAuthTokenStore {
  private readonly REFRESH_PREFIX = "auth:refresh:";

  constructor(private redis: Redis) {}

  async get(token: string): Promise<AuthTokenStoreResponse | null> {
    const raw = await this.redis.get(this.REFRESH_PREFIX + token);

    if (!raw) return null;

    return JSON.parse(raw) as AuthTokenStoreResponse;
  }

  async set(
    token: string,
    data: AuthTokenStorePayload,
    ttlSeconds: number,
  ): Promise<void> {
    await this.redis.set(
      this.REFRESH_PREFIX + token,
      JSON.stringify(data),
      "EX",
      ttlSeconds,
    );
  }

  async del(refreshToken: string): Promise<number> {
    return await this.redis.del(this.REFRESH_PREFIX + refreshToken);
  }
}
