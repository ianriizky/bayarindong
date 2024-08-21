import { InternalServerError } from "elysia";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
 */
export class UnauthorizedError extends InternalServerError {
  constructor(public message: string = "Unauthorized") {
    super(message);

    this.status = 401;
  }
}
