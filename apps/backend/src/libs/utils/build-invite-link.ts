import { AppConfig } from "@config/app.config";

export const buildInviteLink = (token: string): string =>
  `${AppConfig.VITE_URL}/activate?token=${encodeURIComponent(token)}`;
