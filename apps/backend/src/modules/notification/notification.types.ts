import {
  CreateNotificationPayload,
  NotificationDto,
  NotificationResponse,
  NotificationStatus,
  UnreadCountResponse,
} from "@repo/schemas";
import type { PaginationResponse } from "@types";
import { FastifyReply, FastifyRequest } from "fastify";

export type NotifyFilters = {
  userId: number;
  isRead?: boolean | undefined;
  page?: number | undefined;
  limit?: number | undefined;
};

export interface INotificationRepository {
  findByUser: (
    filters: NotifyFilters,
  ) => Promise<PaginationResponse<NotificationDto>>;
  create: (data: CreateNotificationPayload) => Promise<NotificationDto>;
  findById: (id: number) => Promise<NotificationDto | null>;
  setStatus: (id: number, status: NotificationStatus) => Promise<void>;
  countUnread: (userId: number) => Promise<number>;
  markRead: (id: number, userId: number) => Promise<NotificationDto | null>;
  markAllRead: (userId: number) => Promise<number>;
}

export interface INotificationService {
  getFeed: (
    filters: NotifyFilters,
  ) => Promise<PaginationResponse<NotificationResponse>>;
  create: (data: CreateNotificationPayload) => Promise<NotificationResponse>;
  getUnreadCount: (userId: number) => Promise<UnreadCountResponse>;
  markRead: (id: number, userId: number) => Promise<NotificationResponse>;
  markAllRead: (userId: number) => Promise<number>;
}

export interface INotificationController {
  getFeed: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  create: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  getUnreadCount: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  markRead: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  markAllRead: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
}
