import Redis from "ioredis";
import { Hash } from "@utils";
import { IUserTelegramStore } from "./user-telegram.types";

export class UserTelegramStore implements IUserTelegramStore {
  private readonly TELEGRAM_LINK_PREFIX = "tg_link:";
  private readonly TOKEN_TTL = 60 * 15;

  constructor(private store: Redis) {}

  async generateLinkToken(userId: number): Promise<string> {
    const token = Hash.generateToken();
    const hashedToken = Hash.hashToken(token);
    const key = `${this.TELEGRAM_LINK_PREFIX}${hashedToken}`;

    await this.store.set(key, userId, "EX", this.TOKEN_TTL);

    return token;
  }

  async resolveToken(token: string): Promise<string | null> {
    const hashedToken = Hash.hashToken(token);
    const key = `${this.TELEGRAM_LINK_PREFIX}${hashedToken}`;

    return await this.store.getdel(key);
  }
}
