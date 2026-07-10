import {
  AuthTokenResponse,
  AuthTokenStorePayload,
  AuthTokenVerifyResponse,
} from "@repo/schemas";

export interface IAuthTokenService {
  verifyRefresh: (
    refreshToken: string,
  ) => Promise<AuthTokenVerifyResponse | null>;
  issue: (data: AuthTokenStorePayload) => Promise<AuthTokenResponse>;
}
