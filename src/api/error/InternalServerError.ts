/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500
 */
export class InternalServerError extends Error {
  public status;

  constructor(public message: string = "Internal Server Error") {
    super(message);

    this.status = 500;
  }
}
