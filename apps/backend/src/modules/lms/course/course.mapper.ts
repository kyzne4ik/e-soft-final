import { CourseDto, CourseResponse } from "@repo/schemas";

export const courseMap = (c: CourseDto): CourseResponse => ({
  id: c.id,
  name: c.name,
  description: c.description,
});

export const coursesMap = (courses: CourseDto[]): CourseResponse[] =>
  courses.map(courseMap);
