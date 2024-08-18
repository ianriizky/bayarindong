import { InternalServerError } from "./InternalServerError";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404
 */
export class NotFoundError extends InternalServerError {
  constructor(public message: string = "Not Found") {
    super(message);

    this.status = 404;
  }
}
