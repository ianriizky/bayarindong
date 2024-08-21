import { InternalServerError } from "elysia";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
 */
export class BadRequestError extends InternalServerError {
  constructor(public message: string = "Bad Request") {
    super(message);

    this.status = 400;
  }
}
