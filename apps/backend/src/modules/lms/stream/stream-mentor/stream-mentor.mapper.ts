import {
  StreamMentorWithUserDto,
  StreamMentorWithUserResponse,
} from "@repo/schemas";

export const streamMentorMap = (
  m: StreamMentorWithUserDto,
): StreamMentorWithUserResponse => ({
  streamId: m.streamId,
  mentorId: m.mentorId,
  joinedAt: m.joinedAt,
  userId: m.userId,
  firstName: m.firstName,
  lastName: m.lastName,
  patronymic: m.patronymic,
  email: m.email,
  role: m.role,
});

export const streamMentorsMap = (
  ms: StreamMentorWithUserDto[],
): StreamMentorWithUserResponse[] => ms.map(streamMentorMap);
