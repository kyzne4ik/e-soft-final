import {
  StreamStudentWithUserDto,
  StreamStudentWithUserResponse,
} from "@repo/schemas";

export const streamStudentMap = (
  s: StreamStudentWithUserDto,
): StreamStudentWithUserResponse => ({
  streamId: s.streamId,
  studentId: s.studentId,
  mentorId: s.mentorId,
  status: s.status,
  joinedAt: s.joinedAt,
  userId: s.userId,
  firstName: s.firstName,
  lastName: s.lastName,
  patronymic: s.patronymic,
  email: s.email,
  role: s.role,
});

export const streamStudentsMap = (
  students: StreamStudentWithUserDto[],
): StreamStudentWithUserResponse[] => students.map(streamStudentMap);
