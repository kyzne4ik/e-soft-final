import type {
  LeadDto,
  LeadQuery,
  LeadStatus,
  LeadResponse,
  LeadStatusResponse,
  CreateManualLeadPayload,
  UpsertLeadRepositoryPayload,
} from "@repo/schemas";
import type { PaginationResponse } from "@types";
import { FastifyReply, FastifyRequest } from "fastify";

export interface ILeadRepository {
  findAll: (filters?: LeadQuery) => Promise<PaginationResponse<LeadDto>>;
  findById: (id: number) => Promise<LeadDto | null>;
  findAcceptedByEmail: (email: string) => Promise<LeadDto | null>;
  create: (data: CreateManualLeadPayload) => Promise<LeadDto>;
  upsertByEmail: (data: UpsertLeadRepositoryPayload) => Promise<LeadDto>;
  updateStatus: (
    id: number,
    status: LeadStatus,
    managerId: number,
  ) => Promise<LeadDto | null>;
  updateStatusSystem: (id: number, status: LeadStatus) => Promise<void>;
  linkConvertedUser: (email: string, userId: number) => Promise<void>;
}

export interface ILeadService {
  getLeads: (filters?: LeadQuery) => Promise<PaginationResponse<LeadResponse>>;
  getLead: (id: number) => Promise<LeadResponse>;
  createLead: (data: CreateManualLeadPayload) => Promise<LeadResponse>;
  updateLeadStatus: (
    id: number,
    status: LeadStatus,
    managerId: number,
  ) => Promise<LeadStatusResponse>;
}

export interface ILeadController {
  getAll: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  getById: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  create: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  updateStatus: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
}
