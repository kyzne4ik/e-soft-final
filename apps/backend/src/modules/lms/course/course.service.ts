import {
  CourseResponse,
  CreateCoursePayload,
  UpdateCoursePayload,
} from "@repo/schemas";
import { PaginationResponse } from "@types";
import { isPgError, PG } from "@repo/database";
import { ConflictError } from "@error/conflict.error";
import { CourseRepository } from "./course.repository";
import { NotFoundError } from "@error/not-found.error";
import { courseMap, coursesMap } from "./course.mapper";
import { ICourseService, CourseFilters } from "./course.types";

export class CourseService implements ICourseService {
  constructor(private courseRepo: CourseRepository) {}

  async getCourses(
    filters?: CourseFilters,
  ): Promise<PaginationResponse<CourseResponse>> {
    const courses = await this.courseRepo.findAll(filters);

    return {
      ...courses,
      data: coursesMap(courses.data),
    };
  }

  async getCourse(id: number): Promise<CourseResponse> {
    const course = await this.courseRepo.findById(id);

    if (!course) throw new NotFoundError("Курс не найден");

    return courseMap(course);
  }

  async createCourse(data: CreateCoursePayload): Promise<CourseResponse> {
    const course = await this.courseRepo.create(data);

    return courseMap(course);
  }

  async updateCourse(
    id: number,
    data: UpdateCoursePayload,
  ): Promise<CourseResponse> {
    const course = await this.courseRepo.update(id, data);

    if (!course) throw new NotFoundError("Курс не найден");

    return courseMap(course);
  }

  async deleteCourse(id: number): Promise<boolean> {
    try {
      return await this.courseRepo.delete(id);
    } catch (e) {
      if (isPgError(e, PG.FK))
        throw new ConflictError(
          "Нельзя удалить курс, пока есть связанные потоки",
        );
      throw e;
    }
  }
}
