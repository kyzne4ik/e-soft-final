import { UserDto, UserResponse } from "@repo/schemas";

export const userMap = (u: UserDto): UserResponse => ({
  id: u.id,
  firstName: u.firstName,
  lastName: u.lastName,
  patronymic: u.patronymic,
  email: u.email,
  role: u.role,
  isActivated: u.isActivated,
  createdAt: u.createdAt,
  updatedAt: u.updatedAt,
});

export const usersMap = (users: UserDto[]): UserResponse[] =>
  users.map(userMap);
