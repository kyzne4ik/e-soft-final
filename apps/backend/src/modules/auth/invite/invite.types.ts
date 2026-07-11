import {
  CreateInvitePayload,
  GetDelInviteResponse,
  InviteDto,
  InviteResponse,
  InviteStorePayload,
  InviteStoreResponse,
} from "@repo/schemas";

export interface IInviteTokenStore {
  set: (hashedToken: string, data: InviteStorePayload) => Promise<InviteDto>;
  getAndDelete: (hashedToken: string) => Promise<InviteStoreResponse | null>;
}

export interface IInviteService {
  create: (data: CreateInvitePayload) => Promise<InviteResponse>;
  destroy: (token: string) => Promise<GetDelInviteResponse | null>;
}
