import {
  idParamSchema,
  paginationSchema,
  createCoursePayloadSchema,
  updateCoursePayloadSchema,
} from "@repo/schemas";
import { ResponseToolKit } from "@utils/response";
import { CourseService } from "./course.service";
import { ICourseController } from "./course.types";
import { FastifyRequest, FastifyReply } from "fastify";

export class CourseController implements ICourseController {
  constructor(private courseService: CourseService) {}

  getAll = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const query = paginationSchema.parse(req.query);
    const result = await this.courseService.getCourses(query);

    return rep.send(ResponseToolKit.paginated(result));
  };

  getById = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const result = await this.courseService.getCourse(id);

    return rep.send(ResponseToolKit.success(result));
  };

  create = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const body = createCoursePayloadSchema.parse(req.body);
    const result = await this.courseService.createCourse(body);

    return rep
      .status(201)
      .send(ResponseToolKit.success(result, "Курс создан", 201));
  };

  update = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const body = updateCoursePayloadSchema.parse(req.body);
    const result = await this.courseService.updateCourse(id, body);

    return rep.send(ResponseToolKit.success(result, "Курс обновлён"));
  };

  delete = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    await this.courseService.deleteCourse(id);

    return rep.send(ResponseToolKit.success(null, "Курс удалён"));
  };
}
