import {
  AuthTokenResponse,
  AuthTokenStorePayload,
  AuthTokenStoreResponse,
  AuthTokenVerifyResponse,
} from "@repo/schemas";

export interface IAuthTokenStore {
  get: (refreshToken: string) => Promise<AuthTokenStoreResponse | null>;
  set: (
    refreshToken: string,
    data: AuthTokenStorePayload,
    ttlSeconds: number,
  ) => Promise<void>;
  del: (refreshToken: string) => Promise<number>;
}

export interface IAuthTokenService {
  verifyRefresh: (
    refreshToken: string,
  ) => Promise<AuthTokenVerifyResponse | null>;
  issue: (data: AuthTokenStorePayload) => Promise<AuthTokenResponse>;
  revoke: (refreshToken: string) => Promise<void>;
}
