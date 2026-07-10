import {
  AuthTokenResponse,
  AuthTokenIssuePayload,
  AuthTokenVerifyResponse,
} from "@repo/schemas";
import { JWT } from "@fastify/jwt";
import { AppConfig } from "@config";
import { authTokenMap } from "./auth-token.mapper";
import { IAuthTokenService } from "./auth-token.types";

export class AuthTokenService implements IAuthTokenService {
  constructor(public jwt: JWT) {}

  async verifyRefresh(
    refreshToken: string,
  ): Promise<AuthTokenVerifyResponse | null> {
    return await this.jwt.verify(refreshToken, {
      key: AppConfig.BACKEND_JWT_SECRET,
    });
  }

  async issue(data: AuthTokenIssuePayload): Promise<AuthTokenResponse> {
    const accessToken = this.jwt.sign(data, {
      expiresIn: AppConfig.BACKEND_JWT_EXPIRES_IN,
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: AppConfig.BACKEND_JWT_REFRESH_EXPIRES_IN,
    });

    return authTokenMap({ accessToken, refreshToken });
  }
}
