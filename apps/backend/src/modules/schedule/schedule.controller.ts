import {
  idParamSchema,
  lessonQuerySchema,
  createLessonPayloadSchema,
  updateLessonPayloadSchema,
} from "@repo/schemas";
import { ResponseToolKit } from "@utils/response";
import { ScheduleService } from "./schedule.service";
import { IScheduleController } from "./schedule.types";
import { FastifyRequest, FastifyReply } from "fastify";

export class ScheduleController implements IScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  getAll = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const query = lessonQuerySchema.parse(req.query);
    const result = await this.scheduleService.getSchedule(query);

    return rep.send(ResponseToolKit.paginated(result));
  };

  getById = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const result = await this.scheduleService.getLesson(id);

    return rep.send(ResponseToolKit.success(result));
  };

  create = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const body = createLessonPayloadSchema.parse(req.body);
    const result = await this.scheduleService.createLesson(body);

    return rep.send(ResponseToolKit.success(result, "Занятие создано", 201));
  };

  update = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const body = updateLessonPayloadSchema.parse(req.body);
    const result = await this.scheduleService.updateLesson(id, body);

    return rep.send(ResponseToolKit.success(result, "Занятие обновлено"));
  };

  delete = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    await this.scheduleService.deleteLesson(id);

    return rep.send(ResponseToolKit.success(null, "Занятие удалено"));
  };
}
