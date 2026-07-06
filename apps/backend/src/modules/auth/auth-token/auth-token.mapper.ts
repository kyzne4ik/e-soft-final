import { AuthTokenDto, AuthTokenResponse } from "@repo/schemas";

export const authTokenMap = (data: AuthTokenDto): AuthTokenResponse => ({
  accessToken: data.accessToken,
  refreshToken: data.refreshToken,
});
