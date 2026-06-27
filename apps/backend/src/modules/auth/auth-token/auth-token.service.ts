import {
  AuthTokenIssuePayload,
  AuthTokenResponse,
  AuthTokenVerifyResponse,
} from "@repo/schemas";
import { Hash } from "@utils";
import { JWT } from "@fastify/jwt";
import { AppConfig } from "@config";
import { AuthTokenStore } from "./auth-token.store";
import { IAuthTokenService } from "./auth-token.types";
import { authTokenMap } from "./auth-token.mapper";

export class AuthTokenService implements IAuthTokenService {
  constructor(
    private store: AuthTokenStore,
    public jwt: JWT,
  ) {}

  async verifyRefresh(
    refreshToken: string,
  ): Promise<AuthTokenVerifyResponse | null> {
    return await this.store.get(refreshToken);
  }

  async issue(data: AuthTokenIssuePayload): Promise<AuthTokenResponse> {
    const accessToken = this.jwt.sign(data, {
      expiresIn: AppConfig.BACKEND_JWT_EXPIRES_IN,
    });
    const refreshToken = Hash.generateToken(48);

    await this.store.set(
      refreshToken,
      data,
      AppConfig.BACKEND_JWT_REFRESH_EXPIRES_IN,
    );

    return authTokenMap({ accessToken, refreshToken });
  }

  async revoke(refreshToken: string): Promise<void> {
    await this.store.del(refreshToken);
  }
}
