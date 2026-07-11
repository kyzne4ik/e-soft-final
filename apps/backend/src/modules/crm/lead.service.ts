import {
  LeadQuery,
  LeadStatus,
  LeadResponse,
  LeadStatusResponse,
  CreateManualLeadPayload,
} from "@repo/schemas";
import { enqueueEmail } from "@bull";
import { scheduleLeadIgnore } from "@bull/queues/lead.queue";
import { PaginationResponse } from "@types";
import { ILeadService } from "./lead.types";
import { INVITE_TTL_SECONDS } from "./const";
import { leadMap, leadsMap } from "./lead.mapper";
import { LeadRepository } from "./lead.repository";
import { NotFoundError } from "@error/not-found.error";
import { InviteService } from "@modules/auth/invite/invite.service";
import { activateOptions } from "@mail/templates/auth/acitvate/activate-options";
import { rejectionOptions } from "@mail/templates/auth/rejection/rejection-options";
import { StreamService } from "@modules/lms/stream/stream.service";
import { UserRepository } from "@modules/user/user.repository";
import { enrollmentExistUserOptions } from "@mail/templates/auth/enrollment-exist-user/enrollment-exist-user-options";
import { buildConfirmEnrollLink } from "@utils/build-links";
import { StreamStudentService } from "@modules/lms/stream/stream-student/stream-student.service";

export class LeadService implements ILeadService {
  constructor(
    private leadRepo: LeadRepository,
    private inviteService: InviteService,
    private streamService: StreamService,
    private userRepo: UserRepository,
    private streamStudentService: StreamStudentService,
  ) {}

  async getLeads(
    filters?: LeadQuery,
  ): Promise<PaginationResponse<LeadResponse>> {
    const leads = await this.leadRepo.findAll(filters);

    return {
      ...leads,
      data: leadsMap(leads.data),
    };
  }

  async getLead(id: number): Promise<LeadResponse> {
    const lead = await this.leadRepo.findById(id);

    if (!lead) throw new NotFoundError("Заявка не найдена");

    return leadMap(lead);
  }

  async createLead(data: CreateManualLeadPayload): Promise<LeadResponse> {
    const lead = await this.leadRepo.create(data);

    return leadMap(lead);
  }

  async updateLeadStatus(
    id: number,
    status: LeadStatus,
    managerId: number,
  ): Promise<LeadStatusResponse> {
    const lead = await this.leadRepo.updateStatus(id, status, managerId);

    if (!lead) throw new NotFoundError("Заявка не найдена");

    const stream = await this.streamService.getStream(lead.targetStreamId);
    if (!stream) throw new NotFoundError("Целевой поток заявки не найден");

    if (status === "ACCEPTED") {
      const existingUser = await this.userRepo.findByEmail(lead.email);

      if (existingUser) {
        const invite = await this.inviteService.create({
          email: lead.email,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          patronymic: existingUser.patronymic ?? null,
          role: "STUDENT",
          targetStreamId: lead.targetStreamId,
          ttlSeconds: INVITE_TTL_SECONDS,
        });

        const confirmLink = buildConfirmEnrollLink(invite.token);

        await enqueueEmail(
          enrollmentExistUserOptions(
            lead.email,
            confirmLink,
            stream.name,
            existingUser.firstName,
          ),
        );

        await scheduleLeadIgnore(lead.id);

        return { lead: leadMap(lead), invite };
      }

      const invite = await this.inviteService.create({
        email: lead.email,
        firstName: lead.firstName,
        lastName: lead.lastName,
        patronymic: lead.patronymic,
        role: "STUDENT",
        targetStreamId: lead.targetStreamId,
        ttlSeconds: INVITE_TTL_SECONDS,
      });

      await enqueueEmail(
        activateOptions(lead.email, invite.inviteLink, stream.name),
      );

      await scheduleLeadIgnore(lead.id);

      return { lead: leadMap(lead), invite };
    }

    if (status === "REJECTED") {
      await enqueueEmail(rejectionOptions(lead.email, lead.firstName));
    }

    return { lead: leadMap(lead), invite: null };
  }
}
