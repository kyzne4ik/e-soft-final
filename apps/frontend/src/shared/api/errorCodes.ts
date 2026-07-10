export const ErrorCodes = {
  NOT_FOUND: 404,
  FORBIDDEN: 403,
} as const;

export const ErrorMessages = {
  [ErrorCodes.FORBIDDEN]: "Доступ запрещен",
  [ErrorCodes.NOT_FOUND]: "Ресурс не найден",
} as const;
