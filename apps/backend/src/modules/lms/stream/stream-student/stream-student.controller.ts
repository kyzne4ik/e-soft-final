import {
  idParamSchema,
  addStreamStudentPayloadSchema,
  changeStreamStudentMentorPayloadSchema,
  updateStreamStudentStatusPayloadSchema,
  streamStudentQuerySchema,
  streamStudentParamsSchema,
} from "@repo/schemas";
import { ResponseToolKit } from "@utils/response";
import { FastifyRequest, FastifyReply } from "fastify";
import { StreamStudentService } from "./stream-student.service";
import { IStreamStudentController } from "./stream-student.types";

export class StreamStudentController implements IStreamStudentController {
  constructor(private streamStudentService: StreamStudentService) {}

  getStudents = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const query = streamStudentQuerySchema.parse(req.query);
    const result = await this.streamStudentService.getStudents(id, query);

    return rep.send(ResponseToolKit.paginated(result));
  };

  addStudent = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const { studentId, mentorId } = addStreamStudentPayloadSchema.parse(
      req.body,
    );
    const result = await this.streamStudentService.addStudent(
      id,
      studentId,
      mentorId,
    );

    return rep
      .status(201)
      .send(ResponseToolKit.success(result, "Студент добавлен в поток", 201));
  };

  changeMentor = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id, studentId } = streamStudentParamsSchema.parse(req.params);
    const { mentorId } = changeStreamStudentMentorPayloadSchema.parse(req.body);
    const result = await this.streamStudentService.changeMentor(
      id,
      studentId,
      mentorId,
    );

    return rep.send(ResponseToolKit.success(result, "Ментор студента изменён"));
  };

  updateStatus = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id, studentId } = streamStudentParamsSchema.parse(req.params);
    const { status } = updateStreamStudentStatusPayloadSchema.parse(req.body);
    const result = await this.streamStudentService.updateStatus(
      id,
      studentId,
      status,
    );

    return rep.send(
      ResponseToolKit.success(result, "Статус студента обновлён"),
    );
  };

  deleteStudent = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id, studentId } = streamStudentParamsSchema.parse(req.params);
    await this.streamStudentService.deleteStudent(id, studentId);

    return rep.send(ResponseToolKit.success(null, "Студент удалён из потока"));
  };
}
