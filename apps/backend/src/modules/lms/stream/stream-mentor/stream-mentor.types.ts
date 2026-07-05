import {
  StreamMentorQuery,
  StreamMentorWithUserDto,
  StreamMentorWithUserResponse,
} from "@repo/schemas";
import { PaginationResponse } from "@types";
import { FastifyReply, FastifyRequest } from "fastify";

export interface IStreamMentorRepository {
  findMentors: (
    streamId: number,
    filters?: StreamMentorQuery,
  ) => Promise<PaginationResponse<StreamMentorWithUserDto>>;
  addMentor: (
    streamId: number,
    mentorId: number,
  ) => Promise<StreamMentorWithUserDto | null>;
  deleteMentor: (streamId: number, mentorId: number) => Promise<boolean>;
}

export interface IStreamMentorService {
  getMentors: (
    streamId: number,
    filters?: StreamMentorQuery,
  ) => Promise<PaginationResponse<StreamMentorWithUserResponse>>;
  addMentor: (
    streamId: number,
    mentorId: number,
  ) => Promise<StreamMentorWithUserResponse>;
  deleteMentor: (streamId: number, mentorId: number) => Promise<boolean>;
}

export interface IStreamMentorController {
  getMentors: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  addMentor: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  deleteMentor: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
}
