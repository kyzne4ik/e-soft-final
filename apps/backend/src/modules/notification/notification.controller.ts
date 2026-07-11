import {
  createNotificationPayloadSchema,
  idParamSchema,
  notificationQuerySchema,
} from "@repo/schemas";
import { FastifyRequest, FastifyReply } from "fastify";
import { ResponseToolKit, getCurrentUser } from "@utils";
import { NotificationService } from "./notification.service";
import { INotificationController } from "./notification.types";

export class NotificationController implements INotificationController {
  constructor(private notificationService: NotificationService) {}

  getFeed = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { user } = getCurrentUser(req);
    const query = notificationQuerySchema.parse(req.query);
    const result = await this.notificationService.getFeed({
      userId: user.id,
      isRead: query.isRead,
      page: query.page,
      limit: query.limit,
    });

    return rep.send(ResponseToolKit.paginated(result));
  };

  create = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const body = createNotificationPayloadSchema.parse(req.body);
    const result = await this.notificationService.create(body);

    return rep
      .status(201)
      .send(ResponseToolKit.success(result, "Уведомление создано", 201));
  };

  getUnreadCount = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { user } = getCurrentUser(req);
    const result = await this.notificationService.getUnreadCount(user.id);

    return rep.send(ResponseToolKit.success(result));
  };

  markAllRead = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { user } = getCurrentUser(req);
    const result = await this.notificationService.markAllRead(user.id);

    return rep.send(
      ResponseToolKit.success(result, "Все уведомления прочитаны"),
    );
  };

  markRead = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { user } = getCurrentUser(req);
    const { id } = idParamSchema.parse(req.params);
    const result = await this.notificationService.markRead(id, user.id);

    return rep.send(ResponseToolKit.success(result, "Уведомлениe прочитано"));
  };
}
