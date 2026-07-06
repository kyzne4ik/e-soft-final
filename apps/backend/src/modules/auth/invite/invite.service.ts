import { IInviteService } from "./invite.types";
import {
  CreateInvitePayload,
  GetDelInviteResponse,
  InviteResponse,
} from "@repo/schemas";
import { Hash } from "@utils";
import { InviteTokenStore } from "./invite-token.store";
import { inviteMap } from "./invite.mapper";

export class InviteService implements IInviteService {
  constructor(private store: InviteTokenStore) {}

  async create(data: CreateInvitePayload): Promise<InviteResponse> {
    const token = Hash.generateToken();

    this.store.set(Hash.hashToken(token), data);

    return inviteMap(token, data.ttlSeconds);
  }

  async destroy(token: string): Promise<GetDelInviteResponse | null> {
    const raw = await this.store.getAndDelete(Hash.hashToken(token));

    if (!raw) return null;

    return raw;
  }
}
