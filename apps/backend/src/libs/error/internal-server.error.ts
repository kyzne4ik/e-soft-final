import { HttpError } from "./http.error";

export class InternalServerError extends HttpError {
  constructor(message: string = "Internal Server") {
    super(500, message, "INTERNAL_SERVER_ERROR");
  }
}
