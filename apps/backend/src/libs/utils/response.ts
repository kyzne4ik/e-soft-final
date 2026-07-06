import type { PaginationResponse } from "@types";

export class ResponseToolKit {
  static success<T>(
    data: T | null,
    message: string = "Success",
    statusCode: number = 200,
  ) {
    return {
      status: statusCode,
      success: true,
      message,
      data,
    };
  }

  static paginated<T>(
    result: PaginationResponse<T>,
    message: string = "Success",
    statusCode: number = 200,
  ) {
    return {
      status: statusCode,
      success: true,
      message,
      data: result.data,
      meta: result.meta,
    };
  }

  static error(message: string, statusCode: number = 400) {
    return {
      status: statusCode,
      success: false,
      message,
    };
  }

  static notFound(message: string = "Resource not found") {
    return this.error(message, 404);
  }

  static unauthorized(message: string = "Unauthorized") {
    return this.error(message, 401);
  }

  static response<T>(
    success: boolean,
    data: T | null,
    message: string = "Success",
    statusCode: number = 200,
  ) {
    return {
      status: statusCode,
      success,
      message,
      data,
    };
  }

  static validationError(
    errors: { [key: string]: string }[],
    message: string = "Validation error",
    statusCode: number = 422,
  ) {
    return {
      status: statusCode,
      success: false,
      message,
      errors,
    };
  }
}
