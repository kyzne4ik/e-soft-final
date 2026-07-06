import {
  idParamSchema,
  leadQuerySchema,
  createManualLeadPayloadSchema,
  updateLeadStatusPayloadSchema,
} from "@repo/schemas";
import { ForbiddenError } from "@error";
import { FastifyRequest, FastifyReply } from "fastify";
import { ResponseToolKit, getCurrentUser } from "@utils";
import { LeadService } from "./lead.service";
import { ILeadController } from "./lead.types";

export class LeadController implements ILeadController {
  constructor(private leadService: LeadService) {}

  getAll = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const query = leadQuerySchema.parse(req.query);
    const result = await this.leadService.getLeads(query);

    return rep.send(ResponseToolKit.paginated(result));
  };

  getById = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const result = await this.leadService.getLead(id);

    return rep.send(ResponseToolKit.success(result));
  };

  create = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const body = createManualLeadPayloadSchema.parse(req.body);
    const result = await this.leadService.createLead(body);

    return rep
      .status(201)
      .send(ResponseToolKit.success(result, "Заявка отправлена", 201));
  };

  updateStatus = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { user } = getCurrentUser(req);
    if (user.profileId == null)
      throw new ForbiddenError("Профиль менеджера не найден");

    const { id } = idParamSchema.parse(req.params);
    const { status } = updateLeadStatusPayloadSchema.parse(req.body);

    const result = await this.leadService.updateLeadStatus(
      id,
      status,
      user.profileId,
    );

    return rep.send(ResponseToolKit.success(result, "Статус заявки обновлён"));
  };
}
