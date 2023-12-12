import HTTPStatus from "http-status";

// Class for a successful response
export class APISuccess<T> {
  constructor(
    public data: T,
    public status: number = HTTPStatus.OK,
    public statusText: string = HTTPStatus["200"]
  ) {}

  jsonify(): { result: string; status: number; statusText: string; data: T } {
    return {
      result: "success",
      status: this.status,
      statusText: this.statusText,
      data: this.data,
    };
  }
}

// Class for error response
export class APIError extends Error {
  constructor(
    public error: Error,
    public status: number = HTTPStatus.BAD_REQUEST,
    public statusText: string = HTTPStatus["400"]
  ) {
    super(error.message);
    this.name = "APIError";
    this.message = error.message;
  }

  jsonify(): {
    result: string;
    name: string;
    status: number;
    statusText: string;
    error: string;
  } {
    return {
      result: "error",
      name: this.name,
      status: this.status,
      statusText: this.statusText,
      error: this.message,
    };
  }
}

export class BadRequestError extends APIError {
  constructor(error: Error) {
    super(error, HTTPStatus.BAD_REQUEST);
  }
}

export class NotFoundError extends APIError {
  constructor(error: Error) {
    super(error, HTTPStatus.NOT_FOUND);
  }
}
