import { TelegramConfig } from "@config";
import { AppConfig } from "@config/app.config";

export const buildInviteLink = (token: string): string =>
  `${AppConfig.VITE_URL}/activate?token=${encodeURIComponent(token)}`;

export const buildConfirmEnrollLink = (token: string): string =>
  `${AppConfig.VITE_URL}/confirm-enrollment?token=${encodeURIComponent(token)}`;

export const buildTelegramLink = (token: string): string =>
  `https://t.me/${TelegramConfig.TELEGRAM_BOT_USERNAME}?start=${encodeURIComponent(token)}`;

export const buildMentorSubmissionLink = (submissionId: number): string =>
  `${AppConfig.VITE_URL}/review?submissionId=${submissionId}`;

export const buildStudentTaskLink = (taskId: number): string =>
  `${AppConfig.VITE_URL}/tasks?taskId=${taskId}`;
